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

export type TypeUserRegister = {
  fullname: string;
  email: string;
  password: string;
};

export type TypeUserLogin = {
  email: string;
  password: string;
};

export type TypeUser = {
  email: string;
  fullname: string;
  profileUrl: string;
};

export type TypeError = {
  field: string;
  message: string;
};
