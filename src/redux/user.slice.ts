import { createSlice } from "@reduxjs/toolkit";
import {
  TypeFavorite,
  UserState,
} from "../UnauthorisedControls/unauthorizedControl.types";

const initialState: UserState = {
  user: null,
  favoritesListIds: null,
  favoritesList: null,
  notifications: null,
  authenticated: false,
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setAuthentication: (state, action) => {
      state.authenticated = action.payload;
    },
    setFavoriteListIds: (state, action) => {
      state.favoritesListIds = action.payload;
    },
    addFavoriteListIds: (state, action) => {
      if (state.favoritesListIds) {
        state.favoritesListIds = Array.from(
          new Set(state.favoritesListIds.concat(action.payload))
        );
      }
    },

    removeFavoriteListIds: (state, action) => {
      if (state.favoritesListIds) {
        state.favoritesListIds = state.favoritesListIds.filter(
          (artistId) => artistId !== action.payload
        );
      }
    },
    setFavoriteList: (state, action) => {
      if (state.favoritesList) {
        state.favoritesList = action.payload.sort(
          (a: TypeFavorite, b: TypeFavorite) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
        );
      }
    },
    addNotification: (state, action) => {
      state.notifications = [action.payload, ...(state.notifications || [])];
    },
    deleteNotification: (state, action) => {
      if (state.notifications) {
        state.notifications = state.notifications.filter(
          (toast) => toast.id !== action.payload.id
        );
      }
    },
  },
});

export const {
  setAuthentication,
  setUser,
  setFavoriteListIds,
  addFavoriteListIds,
  removeFavoriteListIds,
  setFavoriteList,
  addNotification,
  deleteNotification,
} = userSlice.actions;

export default userSlice.reducer;
