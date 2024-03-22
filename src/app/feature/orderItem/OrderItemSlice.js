// Trong file OrderItemSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrderItems = createAsyncThunk(
  "orderItems/fetchOrderItems",
  async () => {
    const response = await axios.get(
      "https://localhost:7022/api/OrderItem/GetAllUserItem"
    );
    return response.data;
  }
);

const orderItemSlice = createSlice({
  name: "orderItems",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderItemSlice.reducer;
