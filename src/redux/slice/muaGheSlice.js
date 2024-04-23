import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quanLyRapServ } from "../../services/quanLyRap";
import { handleTurnOffLoading, handleTurnOnLoading } from "./loadingSlice";

const initialState = {
  lstChoNgoi: [],
  bookingSeat: [],
};
console.log(initialState.bookingSeat);
export const getLichChieu = createAsyncThunk(
  "quanLyRap/getLichChieu",
  async (maLichChieu, { _, dispatch }) => {
    dispatch(handleTurnOnLoading());
    const res = await quanLyRapServ.getLichChieu(maLichChieu);
    dispatch(handleTurnOffLoading());
    return res.data.content;
  }
);

const muaGheSlice = createSlice({
  name: "quanLiDatCho",
  initialState,
  reducers: {
    handleAllSit: (state, action) => {
      state.lstChoNgoi = action.payload;
    },
    handleAddToCart: (state, action) => {
      // console.log(action);
      state.bookingSeat.push(action.payload);
    },
    handleRemoveCart: (state, action) => {
      const maGheToRemove = action.payload.maGhe;
      state.bookingSeat = state.bookingSeat.filter(
        (ghe) => ghe.maGhe !== maGheToRemove
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLichChieu.fulfilled, (state, action) => {
      state.lstChoNgoi = action.payload;
    });
  },
});

export const { handleAllSit, handleAddToCart, handleRemoveCart } =
  muaGheSlice.actions;

export default muaGheSlice.reducer;
