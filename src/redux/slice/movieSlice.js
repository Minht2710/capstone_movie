import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieDetail: [],
};

export const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {
    setMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
  },
});

export const { setMovieDetail } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
