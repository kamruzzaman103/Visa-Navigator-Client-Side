import { useState, useEffect } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const emailFromQuery = searchParams.get('email');
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [searchParams]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      navigate('/login');
    } catch (error) {
      toast.error("Error resetting password: " + error.message);
    }
  };

  return (
    <div className="forgot-password-container p-4 max-w-lg mx-auto mt-40">
      <h1 className="text-3xl font-bold mb-4 text-center">Forgot Password</h1>
      <form onSubmit={handleResetPassword} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                focus:ring-green-200 dark:focus:ring-green-800  rounded-lg text-sm px-5 py-2.5 w-full font-bold">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;