import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileUrl: { type: String, required: true },
  favoritesList: {
    type: [
      {
        artistId: { type: String, required: true },
        artistName: { type: String, default: "" },
        birthDay: { type: String, default: "" },
        deathDay: { type: String, default: "" },
        nationality: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now },
        image: { type: String, required: true },
      },
    ],
    required: true,
  },
});

const User = mongoose.model("User", UserSchema, "users");

export default User;
