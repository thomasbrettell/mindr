import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    appIsLoaded: false,
    userName: "",
    roomStage: "",
  },
  reducers: {
    SET_INITIAL_LOAD(state) {
      state.appIsLoaded = true;
    },
    SET_USER_NAME(state, action) {
      state.userName = action.payload;
    },
    SET_ROOM_STAGE(state, action) {
      state.roomStage = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
