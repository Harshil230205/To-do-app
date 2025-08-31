import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // Logic for user registration
    const { name, email, password } = req.body;

    //check all fields are required
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
        message: "Please provide all required fields",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
        message: "A user with this email already exists",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    hashedPassword.toString();

    
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({
      seccess: true,
      message: "User registered successfully",
      userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Registration failed",
      message: error.message || "An error occurred during registration",
    });
  }
};

export const login = async (req, res) => {
  try {
    // Logic for user login
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
        message: "Please provide both email and password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found",
        message: "No user found with this email",
      });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        
        error: "Invalid credentials",
        message: "Incorrect password",
      });
    }
    const { password: _, ...userWithoutPassword } = user.toObject();
 const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      success: true,
      token,
      message: "User logged in successfully",
      userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Login failed",
      message: error.message || "An error occurred during login",
    });
  }
};
