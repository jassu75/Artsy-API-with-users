import User from "./UserSchema.js";

const retrieveFavoriteList = async (req, res, next) => {
  try {
    if (req.isAuthenticated) {
      const email = req.user.email;
      const existingUser = await User.findOne({ email }).select(
        "favoritesList"
      );
      req.favoritesList = existingUser.favoritesList;
      return next();
    } else {
      return next();
    }
  } catch (err) {
    console.error(err);
    req.favoritesList = [];
    return next();
  }
};

export default retrieveFavoriteList;
