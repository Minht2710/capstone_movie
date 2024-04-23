import { configureStore } from "@reduxjs/toolkit";
import phimSlice from "./slice/phimSlice";
import loadingSlice from "./slice/loadingSlice";
import userSlice from "./slice/userSlice";
import movieSlice from "./slice/movieSlice";
import muaGheSlice from "./slice/muaGheSlice";

export const store = configureStore({
  reducer: {
    phimSlice,
    loadingSlice,
    userSlice,
    movieSlice,
    muaGheSlice
  },
});
