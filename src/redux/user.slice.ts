import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../UnauthorisedControls/unauthorizedControl.types";

const initialState: UserState = {
  user: null,
  favoritesList: null,
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFavoriteList: (state, action) => {
      state.favoritesList = action.payload;
    },
    addFavoriteList: (state, action) => {
      if (state.favoritesList) {
        state.favoritesList = Array.from(
          new Set(state.favoritesList.concat(action.payload))
        );
      }
    },

    removeFavoriteList: (state, action) => {
      if (state.favoritesList) {
        state.favoritesList = state.favoritesList.filter(
          (artistId) => artistId !== action.payload
        );
      }
    },
  },
});

export const { setUser, setFavoriteList, addFavoriteList, removeFavoriteList } =
  userSlice.actions;

export default userSlice.reducer;
