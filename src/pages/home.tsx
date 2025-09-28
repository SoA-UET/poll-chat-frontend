import { Link } from 'react-router';

export default function HomePage() {
    return <>
    <h1>{"Home Page"}</h1>
    <div>
        <p>{"Welcome to the Vite + React 18 + TypeScript template!"}</p>
        <p>{"It features React Router (BrowserRouter)."}</p>
        
        <div style={{ marginTop: '20px' }}>
            <Link 
                to="/chat" 
                style={{ 
                    marginRight: '15px', 
                    color: '#6f42c1', 
                    textDecoration: 'none',
                    padding: '10px 20px',
                    border: '1px solid #6f42c1',
                    borderRadius: '4px',
                    display: 'inline-block'
                }}
            >
                Chat
            </Link>
            <Link 
                to="/login" 
                style={{ 
                    marginRight: '15px', 
                    color: '#007bff', 
                    textDecoration: 'none',
                    padding: '10px 20px',
                    border: '1px solid #007bff',
                    borderRadius: '4px',
                    display: 'inline-block'
                }}
            >
                Login
            </Link>
            <Link 
                to="/register" 
                style={{ 
                    color: '#28a745', 
                    textDecoration: 'none',
                    padding: '10px 20px',
                    border: '1px solid #28a745',
                    borderRadius: '4px',
                    display: 'inline-block'
                }}
            >
                Register
            </Link>
        </div>
    </div>
    </>
}
