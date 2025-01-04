import  { useState } from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from "firebase/auth"; 
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const navigate = useNavigate();
  
  


  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password shoud be at least 6 characters");
      return;
  }


  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

  if (!passwordRegex.test(password)) {
      toast.error('At least one upper character, lower character');
      return;
  }
  
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update user profile with displayName and photoURL
      await updateProfile(user, {
        displayName: name,
        photoURL: photoUrl,
      });
  
      toast.success("Registered successfully!");
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="register-container p-4 max-w-lg mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-4 text-center"> Registration</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="text"
          placeholder="Photo URL"
          className="w-full p-2 border rounded"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                focus:ring-green-200 dark:focus:ring-green-800  rounded-lg text-sm px-5 py-2.5 w-full font-bold">Register</button>
        <p>
        Already have an account? <Link to="/login" className='text-red-700'>Login</Link>
      </p>
        
      </form>
    </div>
  );
};

export default Register;