import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      if (!existingUser.password && existingUser.googleId) {
        return res.status(409).json({
          error:
            "Account already exists with Google. Please sign in with Google",
        });
      }
      return res.status(400).json({
        error: "User Already Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(201).json({
      success: true,
      message: "User Created Succesfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.log("Error Creating error", error);
    res.status(500).json({
      error: "Error Creating User",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({
        error: "User Not Found",
      });
    }
    if (!user.password) {
      return res.status(400).json({
        error: "This Account is linked with Google. Please sign in with Google",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(201).json({
      success: true,
      message: "User LoggedIn Succesfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.log("Error Login User error", error);
    res.status(500).json({
      error: "Error Logging In User",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(204).json({
      success: true,
      message: "LoggedOut Succesfully",
    });
  } catch (error) {
    console.log("Error Logging Out error", error);
    res.status(500).json({
      error: "Error Logging Out User",
    });
  }
};

export const check = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "user Authenticated Succesfuly",
      user: req.user,
    });
  } catch (error) {
    console.log("Error authentication error", error);
    res.status(500).json({
      error: "Error Authenticating User",
    });
  }
};




export const googleAuthSuccess = async (req,res) => {
  try {
    if(!req.user){
      return res.status(401).json({message: "Authentication failed"});
    }

    const user = req.user;

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET,{
      expiresIn: "7d"
    })
    res.cookie("jwt", token,{
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    })
    res.redirect(`${process.env.FRONTEND_URL}/problems`)
  } catch (error) {
    console.error("OAuth success handler error:", error);
    res.status(500).json({ error: "OAuth login failed" });
  }
}


export const googleAuthFail = (req, res) => {
  res.status(401).json({ message: "Google login failed" });
};