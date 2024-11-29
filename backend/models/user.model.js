import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  profile: {
    profilePhoto: { type: String, default: "" },
    bio: { type: String, default: "" },
    skills: { type: [String], default: [] },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
