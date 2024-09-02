import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let tempErrors = { email: '', password: '' };

    if (!email) {
      tempErrors.email = 'This value is required.';
      isValid = false;
    } else if (!validateEmail(email)) {
      tempErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!password) {
      tempErrors.password = 'This value is required.';
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
        navigate("/add-graph")
    }
  };

  return (
    <div className=" w-[40vw] mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full mt-1 p-2 border rounded ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full mt-1 p-2 border rounded ${
              errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <a
          href="#"
          className="block text-blue-600 hover:underline mb-4"
        >
          Forgot Password
        </a>
        <button
          type="submit"
          className="w-full p-2 bg-blue-900 text-white rounded hover:bg-blue-800"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
