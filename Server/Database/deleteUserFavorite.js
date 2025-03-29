import User from "./UserSchema.js";

const deleteUserFavorite = async (req, res, next) => {
  try {
    if (req.isAuthenticated) {
      const artistId = req.params.artistId;
      const { email } = req.user;
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $pull: { favoritesList: { artistId: artistId } } },
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

export default deleteUserFavorite;
