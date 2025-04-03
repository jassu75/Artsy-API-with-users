import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../UnauthorisedControls/unauthorizedControl.types";

const initialState: UserState = {
  user: null,
  favoritesListIds: null,
  favoritesList: null,
  notifications: null,
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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
      state.favoritesList = action.payload;
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
  setUser,
  setFavoriteListIds,
  addFavoriteListIds,
  removeFavoriteListIds,
  setFavoriteList,
  addNotification,
  deleteNotification,
} = userSlice.actions;

export default userSlice.reducer;
