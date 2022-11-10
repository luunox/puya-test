/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  counter: 0,
  userData: {},
};

export const appReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userData = action.payload;
    },
    increment: (state) => void (state.counter += 1),
    decrement: (state) => void (state.counter -= 1),
    incrementByAmount: (state, action) => void (state.counter += action.payload),
  },
});

export const { login, increment, decrement, incrementByAmount } = appReducer.actions;
