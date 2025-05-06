import axios from 'axios';
import { useEffect, useState } from 'react';
import { create } from 'zustand';
import toast from 'react-hot-toast';

// Use environment-specific base URL
const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '';

export const useAdminStore = create((set) => ({
    isLoggingIn: false,
    adminAuth: false,
    users: [],

    loginAdmin: async (data) => {
        set({ isLoggingIn: true });

        try {
            const response = await axios.post(`${BASE_URL}/api/admin/login`, data, {
                withCredentials: true,
            });

            set({ adminAuth: true });
            set({ isLoggingIn: false });
            toast.success('Admin logged in successfully');
        } catch (error) {
            set({ isLoggingIn: false });
            toast.error('Failed to login as admin');
        }
    },

    fetchUsers: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/admin/users`, {
                withCredentials: true,
            });

            console.log('Fetched users:', response.data);
            set({ users: response.data });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },

    deleteUser: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/admin/users/${id}`, {
                withCredentials: true,
            });

            toast.success('User deleted successfully');
            set((state) => ({
                users: state.users.filter((user) => user._id !== id),
            }));
        } catch (error) {
            toast.error('Failed to delete user');
        }
    },
}));
