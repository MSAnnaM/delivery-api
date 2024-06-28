import dotenv from "dotenv";
dotenv.config();
import gravatar from "gravatar";
import bcrypt from "bcrypt";
import Client from "../bd/models/clientModel.js";
import { updateAvatar } from "../services/userServices.js";
import { clientTokenUpdate } from "../services/clientServices.js";
import HttpError from "../helpers/HttpError.js";

export const clientSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingClient = await Client.findOne({ email });

    if (existingClient) {
      throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarUrl = gravatar.url(email);

    const data = {
      name,
      email,
      password: hashedPassword,
      avatarUrl,
    };

      const client = await Client.create(data);
    const newClient = await clientTokenUpdate(client);

    res.status(201).json(newClient);
  } catch (er) {
    next(er);
  }
};

export const clientSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingClient = await Client.findOne({ email }).select("+password");
    if (!existingClient) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingClient.password
    );

    if (!isPasswordValid) {
      throw HttpError(401, "Email or password is wrong");
    }

    const client = await clientTokenUpdate(existingClient);
    client.password = undefined;
    res.json(client);
  } catch (er) {
    next(er);
  }
};

export const clientLogout = async (req, res, next) => {
  try {
    const client = await Client.findById(req.client._id);

    if (!client) {
      throw HttpError(401, "Not authorized");
    }

    client.token = "";
    await client.save();

    res.status(204).end();
  } catch (er) {
    next(er);
  }
};

export const editClient = async (req, res, next) => {
  try {
      const clientId = req.client;
    const { name, email, password, theme,} = req.body;
      const avatar = req.file;
      console.log(avatar);

    let client = await Client.findById(clientId);

    if (!client) {
      throw HttpError(404, "User not found");
    }

    if (name) client.name = name;
    if (email)client.email = email;
    if (password) client.password = await bcrypt.hash(password, 10);
    if (theme) client.theme = theme;

    if (avatar) {
      const result = await updateAvatar(avatar.path);
      client.avatarUrl = result;
    }

    await client.save();
    const updatedClient = await Client.findByIdAndUpdate(clientId, client, {
      new: true,
    });

    res.status(200).json(updatedClient);
  } catch (error) {
    next(error);
  }
};