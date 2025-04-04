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

export type UserState = {
  user: TypeUser | null;
  favoritesListIds: string[] | null;
  favoritesList: TypeFavorite[] | null;
  notifications: TypeNotification[] | null;
  authenticated: boolean;
};

export type TypeNotification = {
  id: number;
  message: string;
  type: string;
};

export type TypeFavorite = {
  artistId: string;
  artistName: string;
  birthDay: string;
  deathDay: string;
  nationality: string;
  image: string;
  createdAt: Date;
};
