import React, { useEffect } from 'react';
import { useAdminStore } from '../store/useAdminStore';

const Admin = () => {
  const { users, fetchUsers, deleteUser } = useAdminStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (userId, username) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${username}?`);
    if (confirmed) {
      deleteUser(userId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-13">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-green-600 mt-2 ml-1">Manage registered users below</p>
        </nav>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden mt-10 font-bold">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Username</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Created At</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(user._id, user.username)}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
