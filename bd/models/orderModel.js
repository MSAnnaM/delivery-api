import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "in progress", "done"],
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    worker: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     products: [{
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    }],
  },
  { versionKey: false }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
