import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
