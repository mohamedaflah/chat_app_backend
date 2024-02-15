import { Request, Response } from "express";
import UserModal from "../Model/UserModal";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signupController = async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;
    const userNameExists = await UserModal.findOne({ username: username });
    if (userNameExists) {
      throw new Error("Username is already taken!!");
    }
    const emailExists = await UserModal.findOne({ email: email });
    console.log("🚀 ~ signupController ~ emailExists:", emailExists);
    if (emailExists) {
      throw new Error("Email already exists!!");
    }
    password = await bcrypt.hash(password, 10);
    console.log(req.body, ` in signup controller `);
    const user: any = await new UserModal({
      username,
      email,
      password,
      joinedDate: Date.now(),
    }).save();

    const token = jwt.sign(
      { username: user.username, email: user.email, id: user.id },
      process.env.JWT_SECRET ?? "He",
      {
        expiresIn: "48h",
      }
    );
    console.log("🚀 ~ signupController ~ token:", token);
    console.log("true");
    res.cookie("token", token, { httpOnly: true, maxAge: 1.728e8 });
    delete user.password;
    res
      .status(200)
      .json({ status: true, message: "Successfully registered", user });
  } catch (err: any) {
    console.log(err);

    res.status(400).json({ status: false, err: err.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, " body of login for testing 🛹");

    const userData: any = await UserModal.findOne({ email: email });
    if (!userData) {
      throw new Error("User not exists");
    }

    const passwordComparison: boolean = await bcrypt.compare(
      password,
      userData.password
    );
    if (!passwordComparison) {
      throw new Error("Incorrect email or password");
    }
    const token = jwt.sign(
      { username: userData.username, email: userData.email, id: userData._id },
      process.env.JWT_SECRET ?? "He",
      {
        expiresIn: "48h",
      }
    );
    console.log(token);

    res.cookie("token", token, { httpOnly: true, maxAge: 1.728e8 });
    res.json({ status: true, message: "Successfully logined", user: userData });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ status: false, err: error.message });
  }
};
export const logoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.json({ status: true, message: "Logout Successfull!!", user: null });
  } catch (error: any) {
    res.status(400).json({ status: false, err: error.message, user: null });
    console.log(error);
  }
};
export const checkAuthController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SECRET ?? "He",
        async (err: any, decoded: any) => {
          if (err) {
            throw err;
          }
          console.log(decoded);
          const user = await UserModal.findById(decoded.id);
          res.status(200).json({ status: true, message: "Successful", user });
        }
      );
    } else {
      throw new Error("Your session cleared");
    }
  } catch (error: any) {
    res.status(400).json({ status: false, err: error.message, user: null });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const myId = req.query.id;
    const users = await UserModal.find({ _id: { $ne: myId } }).sort({createdAt:-1});

    res.status(200).json({ status: true, users });
  } catch (error: Error | any) {
    res.status(400).json({ status: true, err: error.message, users: false });
  }
};
export const setLastSeen = async (req: Request, res: Response) => {
  try {
    const { userId, date } = req.body;
    await UserModal.updateOne(
      { _id: userId },
      {
        $set: {
          lastSeen: new Date(date),
        },
      }
    );
    res.status(200).json({status:true,message:"Successfull"})
  } catch (error: Error | any) {
    res.status(400).json({ status: false, err: error.message });
  }
};
