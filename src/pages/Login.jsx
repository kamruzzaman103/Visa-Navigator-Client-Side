import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import emailIcone from '../assets/image/email.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      navigate('/');
    } catch (error) {
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="login-container p-4 max-w-lg mx-auto mt-24">
      <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                focus:ring-green-200 dark:focus:ring-green-800  rounded-lg text-sm px-5 py-2.5 w-full font-bold">Login</button>
      </form>
      <div className="mt-4">
        <button 
          onClick={handleGoogleLogin} 
          className="w-full bg-gray-100 text-black p-2 rounded mb-2 flex items-center justify-center font-bold"
        > 
          <img src={emailIcone} alt="" className='size-6 mr-2'/>
          <span>Login with Google</span>
        </button>
        <p className="text-center my-2">
          <Link to={`/forgot-password?email=${encodeURIComponent(email)}`} className="text-blue-600">
            Forgot Password?
          </Link>
        </p>
        <p>
          Don't have an account? <Link to="/register" className='text-green-600'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;