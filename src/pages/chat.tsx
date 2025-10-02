import { useMutation, useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { GroupsService, UsersService, type UserDto } from '../api';
import { useAuth } from '../contexts/auth.context';

// Types
interface Group {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface Message {
  id: string;
  groupId: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

const userCacheById = new Map<string, UserDto>();

async function getUserById(userId: string): Promise<UserDto | null> {
  if (userCacheById.has(userId)) {
    return userCacheById.get(userId)!;
  }
  
  try {
    const user = await UsersService.usersControllerFindById({ id: userId });
    userCacheById.set(userId, user);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

async function pollNewMessages(currentUserId: string, groupId: string, createdAtAfter: Date | undefined): Promise<Message[]> {
  const messages = await GroupsService.groupsControllerGetMessagesInGroup({
    groupId,
    createdAtAfter: createdAtAfter ? createdAtAfter.toISOString() : new Date(0).toISOString(),
  });

  return await Promise.all(
    messages.map(async msg => {
      return {
        id: msg.id,
        groupId: msg.groupId,
        content: msg.content,
        senderId: msg.senderId,
        senderName: (await getUserById(msg.senderId))?.fullName || 'Unknown',
        timestamp: new Date(msg.createdAt),
        isCurrentUser: msg.senderId == currentUserId,
      }
    })
  );
};

export default function ChatPage() {
  const navigate = useNavigate();

  const { data: groups, isLoading, refetch: refetchGroups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => GroupsService.groupsControllerFindByNameContains({
      name: searchTerm,
      membershipOnly: false,
    }),
    initialData: [] as Group[],
  });

  const { mutate: joinGroup } = useMutation({
    mutationFn: (groupId: string) => GroupsService.groupsControllerJoinGroup({ groupId }),
    onSuccess: (groupUserRelationships) => {
      const groupId = groupUserRelationships[0]?.group_id;
      if (!groupId) {
        throw new Error('No group ID returned from join group mutation??');
      }
      alert('Joined group successfully!');
      navigate(`/chat/${groupId}`);
    }
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: ({ groupId, content }: { groupId: string, content: string }) => GroupsService.groupsControllerSendMessage({
      groupId,
      requestBody: {
        content,
      }
    }),
  });






  const { user } = useAuth();
  const { groupId } = useParams<{ groupId: string }>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [lastPollTimestamp, setLastPollTimestamp] = useState<Date | null>(null);
  const [lastGroupId, setLastGroupId] = useState<string | null>(null);
  useEffect(() => {
    if (!groupId) return;
    if (!user) return;

    const groupChanged = lastGroupId !== groupId;
    if (groupChanged) {
      setMessages([]);
      setLastGroupId(groupId);
    }

    pollNewMessages(user.id, groupId, messages.length > 0 ? messages[messages.length - 1].timestamp : undefined)
    .then(newMessages => {
      if (newMessages.length > 0) {
        if (groupChanged) {
          setMessages(newMessages);
        } else {
          setMessages(prev => {
            const list = [...prev];
            const existingMessageIds = new Set(list.map(m => m.id));
            newMessages.forEach(m => {
              if (!existingMessageIds.has(m.id)) {
                list.push(m);
              }
            });
            return list;
          });
        }
      }
    })
    .catch(err => {
      console.error('Error polling new messages:', err);
      if (err?.status === 403) {
        confirm("Bạn chưa là thành viên của nhóm này. Bạn có muốn tham gia không?") && joinGroup(groupId);
      } else {
        alert(`Lỗi: ${err?.message || err?.cause || err?.stack || err}`);
      }
    })
    .finally(() => {
      setLastPollTimestamp(new Date());
    });
  }, [messages, lastPollTimestamp, groupId, user]);

  // Filter groups based on search term
  useEffect(() => {
    refetchGroups();
  }, [searchTerm]);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize data on component mount
  useEffect(() => {
    handleGetGroupList();
  }, []);

  // Load messages when group changes
  useEffect(() => {
    if (groupId) {
      (groupId);
    }
  }, [groupId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Placeholder callback functions
  const handleSendMessage = async (messageContent: string, targetGroupId: string) => {
    sendMessage({ groupId: targetGroupId, content: messageContent });
  };

  const handleGetGroupList = async () => {
    // TODO: Implement your get group list logic here
    refetchGroups();
  };

  const handlePlusButtonClick = () => {
    navigate('/discover');
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !groupId) return;

    const messageToSend = newMessage.trim();
    setNewMessage('');
    
    await handleSendMessage(messageToSend, groupId);
  };

  const currentGroup = groups.find(g => g.id === groupId);

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Left Sidebar */}
      <div style={{ 
        width: '300px', 
        backgroundColor: '#f8f9fa', 
        borderRight: '1px solid #dee2e6',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Search and Plus Button */}
        <div style={{ 
          padding: '15px',
          borderBottom: '1px solid #dee2e6',
          backgroundColor: 'white'
        }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '20px',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <button
              onClick={handlePlusButtonClick}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid #007bff',
                backgroundColor: '#007bff',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Groups List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {isLoading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              Loading groups...
            </div>
          ) : groups.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
              {searchTerm ? 'No groups found' : 'No groups yet'}
            </div>
          ) : (
            groups.map(group => (
              <Link
                key={group.id}
                to={`/chat/${group.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    padding: '15px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    backgroundColor: group.id === groupId ? '#e3f2fd' : 'white',
                    borderLeft: group.id === groupId ? '4px solid #007bff' : '4px solid transparent',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (group.id !== groupId) {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (group.id !== groupId) {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        margin: '0 0 5px 0', 
                        fontSize: '16px',
                        fontWeight: group.id === groupId ? 'bold' : 'normal'
                      }}>
                        {group.name}
                      </h4>
                      {/* {group.lastMessage && (
                        <p style={{ 
                          margin: '0', 
                          fontSize: '14px', 
                          color: '#6c757d',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {group.lastMessage}
                        </p>
                      )} */}
                    </div>
                    {/* <div style={{ marginLeft: '10px', textAlign: 'right' }}>
                      {group.lastMessageTime && (
                        <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '5px' }}>
                          {group.lastMessageTime}
                        </div>
                      )}
                      {group.unreadCount && group.unreadCount > 0 && (
                        <div style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          borderRadius: '12px',
                          padding: '2px 6px',
                          fontSize: '12px',
                          minWidth: '20px',
                          textAlign: 'center',
                        }}>
                          {group.unreadCount}
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {!groupId ? (
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#6c757d',
            fontSize: '18px'
          }}>
            Select a group to start chatting
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div style={{ 
              padding: '15px 20px',
              borderBottom: '1px solid #dee2e6',
              backgroundColor: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>
                {currentGroup?.name || `Group ${groupId}`}
              </h3>
            </div>

            {/* Messages Area */}
            <div style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: '20px',
              backgroundColor: '#f8f9fa'
            }}>
              {messages.map(message => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.isCurrentUser ? 'flex-end' : 'flex-start',
                    marginBottom: '15px',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '10px 15px',
                      borderRadius: '18px',
                      backgroundColor: message.isCurrentUser ? '#007bff' : 'white',
                      color: message.isCurrentUser ? 'white' : 'black',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    {!message.isCurrentUser && (
                      <div style={{ 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        marginBottom: '5px',
                        color: '#007bff'
                      }}>
                        {message.senderName}
                      </div>
                    )}
                    <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
                      {message.content}
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      marginTop: '5px',
                      opacity: 0.7,
                      textAlign: message.isCurrentUser ? 'right' : 'left'
                    }}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form 
              onSubmit={handleSubmitMessage}
              style={{ 
                padding: '15px 20px',
                borderTop: '1px solid #dee2e6',
                backgroundColor: 'white'
              }}
            >
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  rows={1}
                  style={{
                    flex: 1,
                    padding: '10px 15px',
                    border: '1px solid #ccc',
                    borderRadius: '25px',
                    fontSize: '14px',
                    resize: 'none',
                    outline: 'none',
                    minHeight: '40px',
                    maxHeight: '100px',
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmitMessage(e as any);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: newMessage.trim() ? '#007bff' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  Send
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}