import dotenv from "dotenv";
dotenv.config();
import gravatar from "gravatar";
import bcrypt from "bcrypt";
import User from "../bd/models/userModel.js";
import Role from "../bd/models/roleModel.js";
import Order from "../bd/models/orderModel.js";
import { tokenUpdate, updateAvatar } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

export const userSignup = async (req, res, next) => {
  try {
    const { name, email, password, role, manager } = req.body;
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
    console.log(manager);

    if (role === "worker") {
      const currentManager = await User.findOne({ name: manager });
      if (!currentManager) {
        throw HttpError(404, "Manager not found");
      }
      data.manager = currentManager._id;
    }

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

export const editUser = async (req, res, next) => {
  try {
    const userId = req.user;
    const { name, email, password, rating, theme, role, order } = req.body;
    const avatar = req.file;

    let user = await User.findById(userId);

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (rating !== undefined) {
      user.ratings.push(rating);
      const totalRatings = user.ratings.reduce(
        (acc, rating) => acc + rating,
        0
      );
      user.averageRating = totalRatings / user.ratings.length;
    }
    if (theme) user.theme = theme;
    if (role) {
      const existingRole = await Role.findById({ _id: role});
      if (!existingRole) {
        throw HttpError(404, "Role not found");
      }
      user.role = existingRole._id;
    }

    if (avatar) {
      const result = await updateAvatar(avatar.path);
      user.avatarUrl = result;
    }

    const currentRole = await Role.findById({_id: user.role});
    
    if (currentRole.name === "worker" && order !== undefined) {
      const order = await Order.findOne({ number: order });
      if (!order) {
        throw HttpError(404, "Order not found");
      }
      user.orders.push(order._id);
    }

    await user.save();
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (er) {
    console.error(er);
  }
};