import { connect } from "../utils/dbconnect.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../utils/mailSender.js";
import jwt from "jsonwebtoken";
export async function SignUp(req, res) {
  await connect();
  try {
    const reqBody = await req.body;
    const { username, email, password } = reqBody;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      status: 500,
    });
  }
}

export async function Login(req, res) {
  await connect();
  try {
    const reqBody = await req.body;
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        error:
          "We have sent a verification email to your email address. Please verify your email",
      });
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET);
    return res.status(200).json({
      message: "Login successful",
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      status: 500,
    });
  }
}

export async function Verify(req, res) {
  await connect();
  try {
    const reqBody = await req.body;
    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token.toString(),
      // verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified", success: true });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ error: error.message });
  }
}

export async function Forget(req, res) {
  await connect();
  try {
    const reqBody = await req.body;
    const { email } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const hashedToken = await bcryptjs.hash(user._id.toString(), 10);

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return res.status(200).json({
      message: "Reset link sent to your email. Please check your email",
      success: true,
      data: hashedToken,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      status: 500,
    });
  }
}

export async function Reset(req, res) {
  await connect();
  try {
    const reqBody = await req.body;
    const { token, password } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token.toString(),
      // forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password reset successful", success: true });
  } catch (error) {
    console.error("Reset error:", error);
    return res.status(500).json({ error: error.message });
  }
}

export async function GetUser(req, res) {
  await connect();
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User found", success: true, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
