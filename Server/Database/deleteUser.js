import User from "./UserSchema.js";

const deleteUser = async (req, res, next) => {
  const { email } = req.body;
  const response = await User.deleteOne({ email });
  if (response.acknowledged === true) {
    res.status(201);
  } else {
    res.status(400);
  }
  res.locals.response = response;
  next();
};

export default deleteUser;
