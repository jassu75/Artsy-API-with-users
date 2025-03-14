import { TypeArtistInfo } from "../../UnauthorisedControls/unauthorizedControl.types";
import styles from "./artistInfo.module.css";

const ArtistInfo = ({ artistInfo }: { artistInfo: TypeArtistInfo }) => {
  const cleanedBio = artistInfo.biography.replace(/(\w+)-\s+(\w+)/g, "$1$2");
  return (
    <div className={styles.description_container}>
      <span className={styles.description_title_text}>
        {artistInfo.artistName}
      </span>
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
