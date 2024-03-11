import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../database/Firebase';
import { database } from '../database/Firebase';
import '../styles/Auth.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const mapFirebaseErrorToCustomMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid email/password';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long';
      default:
        return 'An error occurred';
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
      })
      .catch((error) => {
        setError(mapFirebaseErrorToCustomMessage(error.code));
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(database, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
      })
      .catch((error) => {
        setError(mapFirebaseErrorToCustomMessage(error.code));
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h2>Login / Sign Up</h2>
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
        {error && <div className="error">{error}</div>}
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignUp}>Sign Up</button>
        <Link to="/">Go back to main page</Link>
      </div>
    </div>
  );
}

export default Auth;
