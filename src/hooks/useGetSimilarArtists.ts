import { useEffect, useState } from "react";
import { TypeArtistListDetails } from "../UnauthorisedControls/unauthorizedControl.types";
import axios from "axios";

const useGetSimilarArtists = (artistId: string | null) => {
  const [similarArtistLoading, setsimilarArtistLoading] =
    useState<boolean>(false);
  const [similarArtistList, setSimilarArtistList] = useState<
    TypeArtistListDetails[] | null
  >(null);

  useEffect(() => {
    const fetchSimilarArtists = async () => {
      try {
        if (artistId) {
          setsimilarArtistLoading(true);
          const url = `/api/similarartists/${artistId}`;
          const headers = {
            "Content-Type": "application/json",
          };
          const axiosOptions = {
            withCredentials: true,
            headers: headers,
          };
          const response = await axios.get(url, axiosOptions);
          const refinedSimilarArtists = response.data.similarArtistList.map(
            (artistInfo: any) => {
              const image =
                artistInfo["_links"]["thumbnail"]["href"] ===
                "/assets/shared/missing_image.png"
                  ? "/assets/artsy_logo.svg"
                  : artistInfo["_links"]["thumbnail"]["href"];

              return {
                id: artistInfo["id"],
                title: artistInfo["name"],
                image: image,
              };
            }
          );
          setSimilarArtistList(refinedSimilarArtists);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setsimilarArtistLoading(false);
      }
    };
    fetchSimilarArtists();
  }, [artistId]);

  return { similarArtistList, similarArtistLoading };
};

export default useGetSimilarArtists;
