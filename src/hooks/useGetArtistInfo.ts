import axios from "axios";
import { useState } from "react";
import { TypeArtistInfo } from "../UnauthorisedControls/unauthorizedControl.types";
const useGetArtistInfo = () => {
  const [artistInfo, setArtistInfo] = useState<TypeArtistInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchArtistInfo = async (artistId: string | null) => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return { artistInfo, loading, fetchArtistInfo };
};
export default useGetArtistInfo;
