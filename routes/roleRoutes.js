import express from "express";
import validateBody from "../helpers/validateBody.js";
import roleValidationSchema from "../bd/schemas/roleSchemas.js"
import roleCreate from "../controllers/roleControllers.js";

const roleRouter = express.Router();

roleRouter.post("/create", validateBody(roleValidationSchema), roleCreate);

export default roleRouter;