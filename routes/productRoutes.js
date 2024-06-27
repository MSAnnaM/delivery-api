import express from "express";
import validateBody from "../helpers/validateBody.js";
import { checkIsValidId } from "../midellwares/isValidId.js";
import {
  productCreateSchema,
  productUpdateSchema,
} from "../bd/schemas/productSchemas.js";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

import { verifyToken } from "../midellwares/verifyToken.js";
import upload from "../midellwares/upload.js";

const productRouter = express.Router();

productRouter.post(
  "/create",
  verifyToken,
  validateBody(productCreateSchema),
  createProduct
);
productRouter.get("/", verifyToken, getAllProducts);
productRouter.patch(
  "/:productId",
  verifyToken,
  checkIsValidId,
  validateBody(productUpdateSchema),
  updateProduct
);
productRouter.delete("/:productId", verifyToken, checkIsValidId, deleteProduct);
export default productRouter;
