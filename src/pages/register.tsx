import { useState } from 'react';
import { Link } from 'react-router';

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  retypePassword: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    retypePassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.retypePassword) {
      newErrors.retypePassword = 'Please retype your password';
    } else if (formData.password !== formData.retypePassword) {
      newErrors.retypePassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Add your registration logic here
      console.log('Register form submitted:', formData);
      
      // Placeholder callback - replace with your actual registration logic
      await handleRegister(formData);
      
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder callback function for registration
  const handleRegister = async (registerData: RegisterFormData) => {
    // TODO: Implement your registration logic here
    // Example: call your API, handle user creation, redirect user, etc.
    console.log('Placeholder: Register function called with:', registerData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Example of what you might do:
    // const response = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     fullName: registerData.fullName,
    //     email: registerData.email,
    //     password: registerData.password,
    //   }),
    // });
    // 
    // if (response.ok) {
    //   const userData = await response.json();
    //   // Auto-login user, redirect to dashboard, show success message, etc.
    // } else {
    //   const errorData = await response.json();
    //   throw new Error(errorData.message || 'Registration failed');
    // }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Register</h1>
      <form onSubmit={handleRegisterSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="fullName" style={{ display: 'block', marginBottom: '5px' }}>
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${errors.fullName ? '#dc3545' : '#ccc'}`,
              borderRadius: '4px',
              fontSize: '16px',
            }}
          />
          {errors.fullName && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>
              {errors.fullName}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${errors.email ? '#dc3545' : '#ccc'}`,
              borderRadius: '4px',
              fontSize: '16px',
            }}
          />
          {errors.email && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>
              {errors.email}
            </span>
          )}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${errors.password ? '#dc3545' : '#ccc'}`,
              borderRadius: '4px',
              fontSize: '16px',
            }}
          />
          {errors.password && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>
              {errors.password}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="retypePassword" style={{ display: 'block', marginBottom: '5px' }}>
            Retype Password:
          </label>
          <input
            type="password"
            id="retypePassword"
            name="retypePassword"
            value={formData.retypePassword}
            onChange={handleInputChange}
            placeholder="Retype your password"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${errors.retypePassword ? '#dc3545' : '#ccc'}`,
              borderRadius: '4px',
              fontSize: '16px',
            }}
          />
          {errors.retypePassword && (
            <span style={{ color: '#dc3545', fontSize: '14px' }}>
              {errors.retypePassword}
            </span>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>
          Already have an account?{' '}
          <Link 
            to="/login" 
            style={{ color: '#007bff', textDecoration: 'none' }}
          >
            Login here
          </Link>
        </p>
        <Link 
          to="/" 
          style={{ color: '#007bff', textDecoration: 'none' }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}