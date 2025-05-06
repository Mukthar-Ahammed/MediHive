import React, { useState } from 'react';
import Sidecomp from '../components/sidecomp';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore';

function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setFormData] = useState({
    username: '',
    password: '',
  });

  const { isLoggingIn, loginAdmin } = useAdminStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Admin login function call
    loginAdmin(data);
  };

  return (
    <div className="flex h-screen bg-white  items-center justify-center">

      <div className="w-full flex items-center justify-center mb-15">
        <form onSubmit={handleSubmit} className="fixed">
          <input
            type="text"
            name="adminUsername"
            value={data.username}
            placeholder="Admin Username"
            className="w-full bg-white border-teal-500 border-3 rounded-md placeholder-xs p-2 mb-4"
            onChange={(e) =>
              setFormData({ ...data, username: e.target.value })
            }
          />

          {/* For password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="adminPassword"
              value={data.password}
              placeholder="Password"
              className="w-70 bg-white border-teal-500 border-3 rounded-md placeholder-xs p-2 mb-4"
              onChange={(e) =>
                setFormData({ ...data, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/3 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-6 w-6 text-gray-500" />
              ) : (
                <Eye className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="btn text-black w-full p-2 font-bold bg-teal-500 rounded-md mt-2"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin ml-30" />
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
