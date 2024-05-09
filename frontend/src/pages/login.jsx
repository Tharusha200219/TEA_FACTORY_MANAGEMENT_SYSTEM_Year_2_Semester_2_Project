import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the server to validate the credentials
      const response = await axios.post('http://localhost:5555/employees/login', { employeeEmail: email, password });

      // If the request is successful, store the role and redirect the user
      localStorage.setItem('role', response.data.role);

      // Check if the email matches the specific email address for redirection
      if (email === 'tharusha@gmail.com') {
        // Redirect to P_home page
        window.location.href = '/P_home';
      } else if (email === 'imasha@gmail.com') {
        // Redirect to P_home page
        window.location.href = '/E_home';
      }else if (email === 'ravindu@gmail.com') {
        // Redirect to P_home page
        window.location.href = '/V_home';
      }else if (email === 'nadeen@gmail.com') {
        // Redirect to P_home page
        window.location.href = '/O_home';
      }else if (email === 'dilmi@gmail.com') {
        // Redirect to P_home page
        window.location.href = '/M_home';
      }else if (email === 'kavindu@gmail.com') {
        // Redirect to P_home page
        window.location.href = '/S_home';
      }else if (email === 'susiru@gmail.com') {
        // Redirect to P_home page
        window.location.href = '/Py_home';
      }else if (email === 'yuvindu@gmail.com') {
        // Redirect to P_home page
        window.location.href = '/I_home';
      }
       else {
        // Redirect to homepage or other pages based on role
        // For simplicity, let's assume a generic redirect to homepage
        window.location.href = '/HomePage';
      }
    } catch (error) {
      // If there's an error, display an error message
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

// CSS styles
const styles = `
  .login-container {
    background-image: url('./public/images/ew.jpg'); /* Replace with your background image path */
    background-size: cover;
    background-position: center;
    width: 100%; /* Adjust width as needed */
    height: 100vh;
  }

  .input-field {
    appearance: none;
    rounded-none;
    relative;
    block;
    w-full;
    px-3;
    py-2;
    border;
    border-gray-300;
    placeholder-gray-500;
    text-gray-900;
    rounded-md;
    focus:outline-none;
    focus:ring-blue-500;
    focus:border-blue-500;
    focus:z-10;
    sm:text-sm;
  }

  .submit-button {
    group;
    relative;
    w-full;
    flex;
    justify-center;
    py-3; /* Increase the padding */
    px-6; /* Increase the padding */
    border;
    border-transparent;
    text-sm;
    font-medium;
    rounded-md;
    text-white;
    bg-blue-600;
    hover:bg-blue-700;
    focus:outline-none;
    focus:ring-2;
    focus:ring-offset-2;
    focus:ring-blue-500;
  }
`;

// Inject the styles into the document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
