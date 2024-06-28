import express from "express";
import validateBody from "../helpers/validateBody.js";
import { clientRegistrationSchema, clientUpdateSchema, loginClientSchema } from "../bd/schemas/clientSchemas.js"; 
import { clientSignIn, clientSignup, clientLogout, editClient } from "../controllers/clientControllers.js"; 
import { verifyClientToken } from "../midellwares/verifyToken.js";
import upload from "../midellwares/upload.js";

const clientRouter = express.Router();

clientRouter.post("/register", validateBody(clientRegistrationSchema), clientSignup);
clientRouter.post("/login", validateBody(loginClientSchema), clientSignIn);
clientRouter.post("/logout", verifyClientToken, clientLogout);
clientRouter.patch(
  "/update",
  verifyClientToken,
    validateBody(clientUpdateSchema),
    upload.single("avatar"),
  editClient
);
export default clientRouter;