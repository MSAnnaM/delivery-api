import express from "express";
import validateBody from "../helpers/validateBody.js";
import { userRegistrationSchema, userUpdateSchema } from "../bd/schemas/userSchemas.js";
import { userSignup, userSignIn, userLogout, editUser, managerUser, managerTeam } from "../controllers/userControllers.js";
import { verifyToken } from "../midellwares/verifyToken.js";
import { checkIsValidId } from "../midellwares/isValidId.js";
import upload from "../midellwares/upload.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegistrationSchema), userSignup);
userRouter.post("/login", validateBody(userRegistrationSchema), userSignIn);
userRouter.post("/logout", verifyToken, userLogout);
userRouter.get("/manager", verifyToken, managerUser);
userRouter.get("/:managerId", verifyToken, checkIsValidId, managerTeam )
userRouter.patch(
  "/update",
  verifyToken,
    validateBody(userUpdateSchema),
    upload.single("file"),
  editUser
);
export default userRouter;