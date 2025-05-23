import User from "./UserSchema.js";

const addUserFavorite = async (req, res, next) => {
  try {
    if (req.isAuthenticated) {
      const artistId = req.params.artistId;
      const artistInfo = req.artistInfo;
      const image =
        artistInfo?._links?.thumbnail?.href &&
        artistInfo._links.thumbnail.href !== "/assets/shared/missing_image.png"
          ? artistInfo._links.thumbnail.href
          : "/assets/artsy_logo.svg";

      const favorite = {
        artistId: artistId,
        artistName: artistInfo.name || "",
        birthDay: artistInfo.birthday || "",
        deathDay: artistInfo.deathday || "",
        nationality: artistInfo.nationality || "",
        createdAt: new Date(),
        image: image,
      };
      const { email } = req.user;
      const updatedUser = await User.findOneAndUpdate(
        { email, "favoritesList.artistId": { $ne: artistId } },
        { $push: { favoritesList: favorite } },
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
