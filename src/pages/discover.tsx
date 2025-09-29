import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthOnly } from '../components/auth_only';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GroupsService } from '../api';

// Types
interface Group {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  isPublic: boolean;
  isJoined: boolean;
  lastActivity?: string;
  createdBy?: string;
  tags?: string[];
}

export default function DiscoverPage() {
  return <AuthOnly>
    <RealDiscoverPage />
  </AuthOnly>;
}

function RealDiscoverPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: groups, isLoading, refetch: refetchGroups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => GroupsService.groupsControllerFindByNameContains({
      name: searchTerm,
      membershipOnly: false,
    }),
    initialData: [] as Group[],
  });

  // const { mutate: joinGroup } = useMutation({
  //   mutationFn: (groupId: string) => GroupsService.groupsControllerJoinGroup({ groupId }),
  //   onSuccess: (groupUserRelationships) => {
  //     const groupId = groupUserRelationships[0]?.group_id;
  //     if (!groupId) {
  //       throw new Error('No group ID returned from join group mutation??');
  //     }
  //     alert('Joined group successfully!');
  //     navigate(`/chat/${groupId}`);
  //   }
  // });

  const { mutate: createGroup } = useMutation({
    mutationFn: (groupName: string) => GroupsService.groupsControllerCreate({
      requestBody: {
        name: groupName,
      },
    }),

    onSuccess: (group) => {
      alert(`Group '${group.name}' created successfully!`);
      navigate(`/chat/${group.id}`);
    },
  });



  // Filter groups based on search term
  useEffect(() => {
    refetchGroups();
  }, [searchTerm]);


  const handleCreateGroupClick = () => {
    const groupName = window.prompt('Enter group name:');
    if (groupName) {
      createGroup(groupName);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px', color: '#333' }}>
          Discover Groups
        </h1>
        <p style={{ color: '#6c757d', fontSize: '16px' }}>
          Find and join groups that match your interests
        </p>
      </div>

      {/* Search and Create Button */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <input
          type="text"
          placeholder="Tìm nhóm theo tên"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '2px solid #e9ecef',
            borderRadius: '25px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#007bff';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e9ecef';
          }}
        />
        <button
          onClick={handleCreateGroupClick}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#28a745',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(40,167,69,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(40,167,69,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(40,167,69,0.3)';
          }}
        >
          +
        </button>
      </div>

      {/* Navigation Links */}
      <div style={{ marginBottom: '20px' }}>
        <Link 
          to="/" 
          style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            marginRight: '15px'
          }}
        >
          ← Back to Home
        </Link>
        <Link 
          to="/chat" 
          style={{ 
            color: '#007bff', 
            textDecoration: 'none'
          }}
        >
          Go to Chat
        </Link>
      </div>

      {/* Groups List */}
      {isLoading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '18px', color: '#6c757d' }}>
            Loading groups...
          </div>
        </div>
      ) : groups.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '18px', color: '#6c757d' }}>
            {searchTerm ? 'No groups found matching your search' : 'No groups available'}
          </div>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {groups.map(group => (
            <div
              key={group.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                // border: group.isJoined ? '2px solid #28a745' : '2px solid transparent',
                border: '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              {/* Group Header */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '20px', 
                    color: '#333',
                    flex: 1
                  }}>
                    {group.name}
                  </h3>
                  {/* {group.isJoined && (
                    <span style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      marginLeft: '10px'
                    }}>
                      Joined
                    </span>
                  )} */}
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px',
                  marginTop: '8px'
                }}>
                  {/* <span style={{ color: '#6c757d', fontSize: '14px' }}>
                    {group.memberCount} members
                  </span>
                  <span style={{ 
                    color: group.isPublic ? '#28a745' : '#ffc107',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {group.isPublic ? 'Public' : 'Private'}
                  </span> */}
                </div>
              </div>

              {/* Group Description */}
              {/* {group.description && (
                <p style={{ 
                  color: '#6c757d', 
                  fontSize: '14px', 
                  lineHeight: '1.5',
                  marginBottom: '15px'
                }}>
                  {group.description}
                </p>
              )} */}

              {/* Tags */}
              {/* {group.tags && group.tags.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                  {group.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#e9ecef',
                        color: '#6c757d',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        marginRight: '6px',
                        marginBottom: '4px',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )} */}

              {/* Group Footer */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '15px',
                borderTop: '1px solid #e9ecef'
              }}>
                {/* <div style={{ fontSize: '12px', color: '#6c757d' }}>
                  {group.lastActivity && `Active ${group.lastActivity}`}
                </div> */}
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link
                    to={`/chat/${group.id}`}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0056b3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#007bff';
                    }}
                  >
                    View
                  </Link>
                  
                  {/* {group.isJoined ? (
                    <button
                      onClick={() => handleLeaveGroup(group.id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#c82333';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc3545';
                      }}
                    >
                      Leave
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#218838';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#28a745';
                      }}
                    >
                      Join
                    </button>
                  )} */}

                  {/* <button
                      onClick={() => handleJoinGroup(group.id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#218838';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#28a745';
                      }}
                    >
                      Join
                    </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}