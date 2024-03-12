import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../database/Firebase';
import '../styles/Auth.css';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const mapFirebaseErrorToCustomMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid email/password';
      default:
        return 'An error occurred, try again';
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        navigate('/'); 
      })
      .catch((error) => {
        setError(mapFirebaseErrorToCustomMessage(error.code));
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <Link to="/" className="close-button">X</Link>
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleSignIn}>Sign In</button>
        <Link to="/signup">Don't have an account? Sign Up</Link>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
