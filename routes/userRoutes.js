import express from "express";
import validateBody from "../helpers/validateBody.js";
import { userRegistrationSchema } from "../bd/schemas/userSchemas.js";
const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegistrationSchema), userSignup);
// userRouter.post("/login", validateBody(userRegistrationSchema), userSignIn);
// userRouter.post("/logout", verifyToken, userLogout);
// userRouter.get("/current", verifyToken, currentUser);
// userRouter.patch(
//   "/update",
//   verifyToken,
//   validateBody(userUpdateSchema),
//   upload.single("file"),
//   addAvatar,
//   updateProfile
// );
export default userRouter;