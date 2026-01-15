import jwt from "jsonwebtoken";
import { userModel } from "../database/userSchema.js";
import bcrypt from "bcrypt";
import { jwt_secret } from "../config/index.js";

export const signupController = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    // 1. Check user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 2. Validate user type
    const allowedTypes = ["reader", "author", "admin"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword, // ✅ MUST be `password`
      type,
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signinController = async (req, res) => {
  try {
    const { email, password, type } = req.body;

    // 1. Find user + password
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Create JWT
    const payload = { sub: user._id, email: user.email, type: user.type };
    const accessToken = jwt.sign(payload, jwt_secret, {
      expiresIn: "1h",
    });

    // 4. Send token
    return res.status(200).json({
      accessToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
      userModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .select("-password")
        .lean(),

      userModel.countDocuments(),
    ]);

    res.status(200).json({
      data: users,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        limit,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAuthors = async (req, res) => {};

export const getReaders = async (req, res) => {};
