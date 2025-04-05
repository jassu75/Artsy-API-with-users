import User from "./UserSchema.js";

const retrieveFavoriteList = async (req, res, next) => {
  try {
    const email = req.params.email;
    const existingUser = await User.findOne({ email }).select("favoritesList");
    if (existingUser) {
      req.favoritesList = existingUser.favoritesList;
    } else {
      req.favoritesList = [];
    }
    return next();
  } catch (err) {
    console.error(err);
    req.favoritesList = [];
    return next();
  }
};

export default retrieveFavoriteList;
