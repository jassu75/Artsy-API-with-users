import User from "./UserSchema.js";

const retrieveUsers = async () => {
  try {
    const users = await User.find();
    console.log("users retrieved");

    return users;
  } catch (err) {
    console.error(err);
  }
};

export default retrieveUsers;
