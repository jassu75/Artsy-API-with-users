import axios from "axios";
import { useEffect, useState } from "react";
import {
  TypeArtistInfo,
  TypeArtistListDetails,
  TypeArtworks,
} from "../UnauthorisedControls/unauthorizedControl.types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useGetArtistDetails = (artistId: string | null) => {
  const [artworks, setArtworks] = useState<TypeArtworks[] | null>(null);
  const [artistInfo, setArtistInfo] = useState<TypeArtistInfo | null>(null);
  const [similarArtistList, setSimilarArtistList] = useState<
    TypeArtistListDetails[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const authenticated = useSelector(
    (state: RootState) => state.userSlice.authenticated
  );

  useEffect(() => {
    if (artistId) {
      const fetchArtistDetails = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/api/artistdetails/${artistId}`);

          const responseArtistInfo = response.data.artistInfo;
          const refinedArtistInfo = {
            artistName: responseArtistInfo.name || "",
            birthDay: responseArtistInfo.birthday || "",
            deathDay: responseArtistInfo.deathday || "",
            nationality: responseArtistInfo.nationality || "",
            biography: responseArtistInfo.biography || "",
          };
          setArtistInfo(refinedArtistInfo);

          const responseArtworks = response.data.artWorks._embedded.artworks;
          const refinedArtworks = responseArtworks.map(
            (artworkDetails: any) => {
              return {
                id: artworkDetails?.id,
                title: artworkDetails?.title,
                date: artworkDetails?.date,
                image: artworkDetails?._links?.thumbnail?.href,
              };
            }
          );

          setArtworks(refinedArtworks);

          if (authenticated) {
            const responseSimilarArtistlist = response.data.similarArtistList;
            const refinedSimilarArtists = responseSimilarArtistlist.map(
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
        } catch (error) {
          console.error("Error fetching artist details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchArtistDetails();
    }
  }, [artistId, authenticated]);

  return { artworks, similarArtistList, artistInfo, loading };
};

export default useGetArtistDetails;
