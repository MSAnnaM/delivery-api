import HttpError from "../helpers/HttpError.js";
import User from "../bd/models/userModel.js";
import Client from "../bd/models/clientModel.js";
import { checkAuth } from "../helpers/token.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.startsWith("Bearer") &&
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw HttpError(401, "Not authorized");
    }

    const userId = checkAuth(token);
    const decodedUser = await User.findById(userId);

    if (!decodedUser || decodedUser.token !== token) {
      throw HttpError(401, "Not authorized");
    }

    req.user = decodedUser;
    next();
  } catch (er) {
    next(er);
  }
};

export const verifyClientToken = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.startsWith("Bearer") &&
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw HttpError(401, "Not authorized");
    }

    const clientId = checkAuth(token);
    const decodedClient = await Client.findById(clientId);

    if (!decodedClient || decodedClient.token !== token) {
      throw HttpError(401, "Not authorized");
    }

    req.client = decodedClient;
    next();
  } catch (er) {
    next(er);
  }
};