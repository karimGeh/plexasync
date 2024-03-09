import { ReduxReducers } from "store/types";
import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  theme: "light" | "dark";
  isSideBarCollapsed: boolean;
}

const initialState: GlobalState = {
  theme: "light",
  isSideBarCollapsed: false,
};

export const globalSlice = createSlice({
  name: ReduxReducers.GLOBAL,
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    toggleSideBar: (state) => {
      state.isSideBarCollapsed = !state.isSideBarCollapsed;
    },
    //
    placeholder: (state) => {
      return state;
    },
  },
});

export const {
  toggleTheme,
  //
  toggleSideBar,
  //
  placeholder,
} = globalSlice.actions;

const globalReducer = globalSlice.reducer;

export type GlobalAction =
  | ReturnType<typeof globalSlice.actions.toggleTheme>
  | ReturnType<typeof globalSlice.actions.toggleSideBar>
  | ReturnType<typeof placeholder>;

export default globalReducer;
