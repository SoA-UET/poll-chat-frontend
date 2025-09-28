import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router';

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

export default function ChatPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      handleLoadMessages(groupId);
    }
  }, [groupId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Filter groups based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredGroups(groups);
    } else {
      handleSearchGroups(searchTerm);
    }
  }, [searchTerm, groups]);

  // Placeholder callback functions
  const handleSendMessage = async (messageContent: string, targetGroupId: string) => {
    // TODO: Implement your send message logic here
    console.log('Placeholder: Send message called with:', { messageContent, targetGroupId });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Example implementation:
    // const response = await fetch('/api/messages', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     groupId: targetGroupId,
    //     content: messageContent,
    //   }),
    // });
    // 
    // if (response.ok) {
    //   const newMessage = await response.json();
    //   handleOnNewMessageArrival(newMessage);
    // }

    // For demo purposes, add a mock message
    const mockMessage: Message = {
      id: Date.now().toString(),
      groupId: targetGroupId,
      content: messageContent,
      senderId: 'current-user',
      senderName: 'You',
      timestamp: new Date(),
      isCurrentUser: true,
    };
    handleOnNewMessageArrival(mockMessage);
  };

  const handleOnNewMessageArrival = (newMessage: Message) => {
    // TODO: Implement your new message handling logic here
    console.log('Placeholder: New message arrived:', newMessage);
    
    // Example implementation:
    setMessages(prev => [...prev, newMessage]);
    
    // You might also want to:
    // - Play notification sound
    // - Update group's last message
    // - Show desktop notification if tab is not active
    // - Update unread count
  };

  const handleGetGroupList = async () => {
    // TODO: Implement your get group list logic here
    console.log('Placeholder: Get group list called');
    
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example implementation:
      // const response = await fetch('/api/groups');
      // if (response.ok) {
      //   const groupsData = await response.json();
      //   setGroups(groupsData);
      // }

      // Mock data for demonstration
      const mockGroups: Group[] = [
        {
          id: '1',
          name: 'General Discussion',
          lastMessage: 'Hello everyone!',
          lastMessageTime: '2 min ago',
          unreadCount: 3,
        },
        {
          id: '2',
          name: 'Project Team',
          lastMessage: 'Meeting at 3 PM',
          lastMessageTime: '1 hour ago',
          unreadCount: 0,
        },
        {
          id: '3',
          name: 'Random Chat',
          lastMessage: 'Check this out!',
          lastMessageTime: '1 day ago',
          unreadCount: 1,
        },
      ];
      setGroups(mockGroups);
      
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchGroups = async (searchQuery: string) => {
    // TODO: Implement your group search logic here
    console.log('Placeholder: Search groups called with:', searchQuery);
    
    // Example implementation:
    // const response = await fetch(`/api/groups/search?q=${encodeURIComponent(searchQuery)}`);
    // if (response.ok) {
    //   const searchResults = await response.json();
    //   setFilteredGroups(searchResults);
    // }

    // Mock search functionality
    const filtered = groups.filter(group =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGroups(filtered);
  };

  const handlePlusButtonClick = () => {
    // TODO: Implement your join/create group logic here
    console.log('Placeholder: Plus button clicked');
    
    // You might want to:
    // - Open a modal to create new group
    // - Open a modal to join existing group by code/link
    // - Navigate to a separate page for group management
    // - Show a dropdown with options
    
    alert('Placeholder: Join/Create group functionality - implement your logic here');
  };

  const handleLoadMessages = async (targetGroupId: string) => {
    // TODO: Implement your load messages logic here
    console.log('Placeholder: Load messages for group:', targetGroupId);
    
    try {
      // Example implementation:
      // const response = await fetch(`/api/groups/${targetGroupId}/messages`);
      // if (response.ok) {
      //   const messagesData = await response.json();
      //   setMessages(messagesData);
      // }

      // Mock messages for demonstration
      const mockMessages: Message[] = [
        {
          id: '1',
          groupId: targetGroupId,
          content: 'Hey everyone! How are you doing?',
          senderId: 'user1',
          senderName: 'Alice Johnson',
          timestamp: new Date(Date.now() - 3600000),
          isCurrentUser: false,
        },
        {
          id: '2',
          groupId: targetGroupId,
          content: 'I\'m doing great! Just finished my project.',
          senderId: 'current-user',
          senderName: 'You',
          timestamp: new Date(Date.now() - 3000000),
          isCurrentUser: true,
        },
        {
          id: '3',
          groupId: targetGroupId,
          content: 'That\'s awesome! Congratulations! 🎉',
          senderId: 'user2',
          senderName: 'Bob Smith',
          timestamp: new Date(Date.now() - 1800000),
          isCurrentUser: false,
        },
      ];
      setMessages(mockMessages);
      
    } catch (error) {
      console.error('Error loading messages:', error);
    }
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
          ) : filteredGroups.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
              {searchTerm ? 'No groups found' : 'No groups yet'}
            </div>
          ) : (
            filteredGroups.map(group => (
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
                      {group.lastMessage && (
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
                      )}
                    </div>
                    <div style={{ marginLeft: '10px', textAlign: 'right' }}>
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
                    </div>
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