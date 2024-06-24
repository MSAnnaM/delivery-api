import dotenv from "dotenv";
dotenv.config();
import gravatar from "gravatar";
import bcrypt from "bcrypt";
import User from "../bd/models/userModel.js";
import Role from "../bd/models/roleModel.js";
import { tokenUpdate } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

export const userSignup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
      const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw HttpError(409, "Email in use");
      }
      
      const existingRole = await Role.findOne({ name: role });
      
    if (!existingRole) {
      throw HttpError(404, "Role not found");
      }
      
    const hashedPassword = await bcrypt.hash(password, 10);
      const avatarUrl = gravatar.url(email);
    const data = {
      name,
      email,
      password: hashedPassword,
      avatarUrl,
      role: existingRole._id,
    };
    const user = await User.create(data);
    const newUser = await tokenUpdate(user);

    res.status(201).json(newUser);
  } catch (er) {
    next(er);
  }
};

export const userSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw HttpError(401, "Email or password is wrong");
    }

    const user = await tokenUpdate(existingUser);
    user.password = undefined;
    res.json(user);
  } catch (er) {
    next(er);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    user.token = "";
    await user.save();

    res.status(204).end();
  } catch (er) {
    next(er);
  }
};

