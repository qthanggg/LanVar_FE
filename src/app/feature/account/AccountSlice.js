import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: {
    id: 0,
    username: "",
    email: "",
    permission_id: 0,
  },
};

// Lấy trạng thái đăng nhập từ LocalStorage khi khởi tạo ứng dụng
const savedState = localStorage.getItem("reduxState");
const persistedState = savedState ? JSON.parse(savedState) : initialState;

export const AccountSlice = createSlice({
  name: "account",
  initialState: persistedState,
  reducers: {
    setLoggedInAccount(state, action) {
      state.loggedIn = action.payload;
      // Lưu trạng thái đăng nhập vào LocalStorage
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    logout(state) {
      state.loggedIn = initialState.loggedIn;
      // Xóa trạng thái đăng nhập khỏi LocalStorage khi đăng xuất
      localStorage.removeItem("reduxState");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedInAccount, logout } = AccountSlice.actions;

const accountReducer = AccountSlice.reducer;
export { accountReducer };
