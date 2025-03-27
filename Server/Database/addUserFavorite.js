import User from "./UserSchema.js";

const addUserFavorite = async (req, res, next) => {
  try {
    if (req.isAuthenticated) {
      const artistId = req.params.artistId;
      const { email } = req.user;
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $addToSet: { favoritesList: artistId } },
        { new: true, upsert: false }
      );
      if (updatedUser) {
        req.favoritesList = updatedUser.favoritesList;
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    next();
  }
};

export default addUserFavorite;
