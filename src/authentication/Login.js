import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../database/Firebase';
import '../styles/Authentication.css';
import google from '../assets/google.png'; 
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import close from '../assets/close.png'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const mapFirebaseErrorToCustomMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-credential':
        return 'Invalid email/password';
      case 'auth/user-not-found':
        return 'Bad request';
      case 'auth/too-many-requests':
        return 'Too many attempts, try again later'; 
      default:
        return 'An error occurred, try again';
    }
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setError(mapFirebaseErrorToCustomMessage(error.code));
        console.log(error); 
      });
  };

  const handleSignInWithGoogle = () => {
    setEmail(''); // reset email to null to avoid google-sign-in-error
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/');
      })
      .catch((error) => {
        setError('An error occurred while signing in with Google. Please try again.');
        console.log(error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSignIn(); 
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <Link to="/"><img className='close' src={close} alt='loading welcome img'/> </Link>
        <h2 className='login-signup'>Login</h2>
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
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSignInWithGoogle} className="google-sign-in-button">
          <img src={google} alt="Google Logo" /> Continue with Google
        </button>
        <button onClick={handleSignIn} className='handle-sign-in'>Sign In</button>
        {error && <div className="error">{error}</div>}

        <Link to="/signup">Don't have an account? Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
