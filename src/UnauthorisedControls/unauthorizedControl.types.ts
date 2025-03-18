export type TypeUnAuthorizedControlKey = "register" | "search" | "login";

export type TypeArtistListDetails = {
  id: string;
  title: string;
  image: string;
};

export type TypeArtistInfo = {
  artistName: string;
  nationality: string;
  birthDay: string;
  deathDay: string;
  biography: string;
};

export type TypeArtworks = {
  id: string;
  title: string;
  date: string;
  image: string;
};

export type TypeCategory = {
  id: string;
  title: string;
  image: string;
};
