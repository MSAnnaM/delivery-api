import mongoose from 'mongoose';

const { Schema } = mongoose;

const clientSchema = new Schema({
    name: {
      type: String,
      required: true,
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
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "dark",
    },
    token: {
      type: String,
      default: null,
    },
},
{ versionKey: false }
);

const Client = mongoose.model('Client', clientSchema);

export default Client;