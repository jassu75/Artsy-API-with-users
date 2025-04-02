import FavortiesIcon from "../../AuthorisedControls/FavoritesIcon";
import { TypeArtistInfo } from "../../UnauthorisedControls/unauthorizedControl.types";
import styles from "./artistInfo.module.css";

const ArtistInfo = ({
  artistInfo,
  artistId,
}: {
  artistInfo: TypeArtistInfo;
  artistId: string;
}) => {
  const cleanedBio = artistInfo.biography.replace(/-\s+/g, "");
  return (
    <div className={styles.description_container}>
      <div className={styles.description_title_text}>
        <span>{artistInfo.artistName}</span>
        <FavortiesIcon artistId={artistId} parent={`artistInfo`} />
      </div>
      <span className={styles.description_nationality_text}>
        {artistInfo.nationality}, {artistInfo.birthDay} - {artistInfo.deathDay}
      </span>
      <div className={styles.description}>
        {cleanedBio.split("\n\n").map((text, index) => (
          <p key={index} className={styles.description_text}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ArtistInfo;
