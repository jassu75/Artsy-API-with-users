import axios from "axios";
import { useState } from "react";
import { TypeArtistListDetails } from "../UnauthorisedControls/unauthorizedControl.types";
const useGetArtistList = () => {
  const [artistList, setArtistList] = useState<TypeArtistListDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const fetchArtistList = async (artistName: string | null) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/search/${artistName}`);
      const refinedArtistList = response.data.map((artistInfo: any) => {
        const image =
          artistInfo["_links"]["thumbnail"]["href"] ===
          "/assets/shared/missing_image.png"
            ? "/assets/artsy_logo.svg"
            : artistInfo["_links"]["thumbnail"]["href"];

        return {
          id: artistInfo["_links"]["self"]["href"].split("/").pop(),
          title: artistInfo["title"],
          image: image,
        };
      });

      setArtistList(refinedArtistList);
    } finally {
      setLoading(false);
    }
  };

  return { artistList, loading, fetchArtistList };
};
export default useGetArtistList;
