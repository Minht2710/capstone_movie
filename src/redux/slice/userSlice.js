import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { quanLyNguoiDungServ } from '../../services/quanLyNguoiDung';

const initialState = {
  arrUser:[]
}

export const getAllUserThunk = createAsyncThunk(
  "user/getAllUserThunk",
  // dataLocal là nhận data từ dispatch(getAllUserThunk("abc")) ở components con
  async (dataLocal, thunkAPI) => {
    const res= await quanLyNguoiDungServ.getUser()
    return res.data.content;
  }
  
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // handelAllUser:(state,action) => {
    //   state.arrUser=action.payload
    // },
  },
  // có extraReducers bên dưới mới lấy được dữ liệu từ thunk bên trên
  extraReducers: (builder) => {
    builder.addCase(getAllUserThunk.fulfilled, (state, action) => {
      // console.log(action);
      state.arrUser = action.payload;
    
    });
  },
});
export const {} = userSlice.actions
export default userSlice.reducer






