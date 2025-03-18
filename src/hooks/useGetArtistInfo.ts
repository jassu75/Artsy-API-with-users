import axios from "axios";
import { useEffect, useState } from "react";
import { TypeArtistInfo } from "../UnauthorisedControls/unauthorizedControl.types";
const useGetArtistInfo = (artistId: string | null) => {
  const [artistInfo, setArtistInfo] = useState<TypeArtistInfo | null>(null);
  const [artistInfoLoading, setArtistInfoLoading] = useState(false);
  useEffect(() => {
    if (artistId) {
      const fetchArtistInfo = async () => {
        try {
          setArtistInfoLoading(true);
          const response = await axios.get(`/api/artistinfo/${artistId}`);
          const refinedArtistInfo = {
            artistName: response.data.name || "",
            birthDay: response.data.birthday || "",
            deathDay: response.data.deathday || "",
            nationality: response.data.nationality || "",
            biography: response.data.biography || "",
          };

          setArtistInfo(refinedArtistInfo);
        } finally {
          setArtistInfoLoading(false);
        }
      };

      fetchArtistInfo();
    }
  }, [artistId]);

  return { artistInfo, artistInfoLoading };
};
export default useGetArtistInfo;
