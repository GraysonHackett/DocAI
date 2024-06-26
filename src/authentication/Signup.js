import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../database/Firebase';
import '../styles/Authentication.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const mapFirebaseErrorToCustomMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long';
      case 'auth/email-already-in-use':
        return 'This email is already in use. Please use a different email or sign in.';
      default:
        return 'An error occurred, try again';
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if(password === confirmPassword){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        navigate('/login'); 
      })
      .catch((error) => {
        setError(mapFirebaseErrorToCustomMessage(error.code));
      });
    }
    else{
      console.error("Passwords do not match"); 
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content-signup">
        <Link to="/" className="close-button">X</Link>
        <h2 className='login-signup'>Sign Up</h2>
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />
        {error && <div className="error">{error}</div>}
        <button onClick={handleSignUp} className='handle-sign-up'>Sign Up</button>
        <Link to="/login">Already have an account? Login <br></br></Link>    
      </div>
    </div>
  );
}

export default Signup;
