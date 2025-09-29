import { Link } from "react-router";
import { useAuth } from "../contexts/auth.context";

export function AuthOnly({ children }: { children: React.ReactNode }) {
    const { authenticated } = useAuth();

    if (!authenticated) {
        return <div>
            <p>{"You must be logged in to view this content."}</p>

            <Link
                to="/"
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
                Home
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
        </div>;
    }

    return <>{children}</>;
}
