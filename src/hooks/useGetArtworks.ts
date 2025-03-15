import axios from "axios";
import { useState } from "react";
import { TypeArtworks } from "../UnauthorisedControls/unauthorizedControl.types";
const useGetArtworks = () => {
  const [artworks, setArtworks] = useState<TypeArtworks | null>(null);
  const [artworksLoading, setArtworksLoading] = useState(false);
  const fetchArtworks = async (artistId: string | null) => {
    try {
      setArtworksLoading(true);
      const response = await axios.get(`/api/artworks/${artistId}`);
      const artworkList = response.data._embedded.artworks;

      const refinedArtworks = artworkList.map((artworkDetails: any) => {
        return {
          id: artworkDetails?.id,
          title: artworkDetails?.title,
          date: artworkDetails?.date,
          image: artworkDetails?._links?.thumbnail?.href,
        };
      });

      setArtworks(refinedArtworks);
    } finally {
      setArtworksLoading(false);
    }
  };

  return { artworks, artworksLoading, fetchArtworks };
};
export default useGetArtworks;
