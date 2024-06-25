import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    ratings: [{
      type: Number,
      default: [],
    }],
    rating: {
      type: Number,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    orders: [{
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    }],
    order: {
      type: Number,
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "dark",
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
