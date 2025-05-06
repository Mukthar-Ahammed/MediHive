import dotenv from 'dotenv';  // Only import dotenv once
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.model.js'
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'

dotenv.config();

const createAdmin = async () => {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const existingAdmin = await Admin.findOne({ username: adminUsername });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10); // 10 is the salt rounds
        
        const newAdmin = new Admin({
            username: adminUsername,
            password: hashedPassword,
        });

        await newAdmin.save();
        console.log("Admin user created successfully.");
    } else {
        console.log("Admin user already exists.");
    }
};

createAdmin();





// Admin Login function

export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", username); // Debug log

    try {
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: 'admin' }, // include role in payload
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false, // Should be true in production with HTTPS
            sameSite: 'Lax',
            maxAge: 3600000,
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error("Login error:", err); // 🔴 This will show the actual backend error
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};










export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }); // exclude admins
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};
