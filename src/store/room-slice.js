import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  roomId: "",
};

const roomSlice = createSlice({
  name: "room",
  initialState: initialState,
  reducers: {
    SET_ROOM_ID(state, action) {
      state.roomId = action.payload;
    },
    SET_USER_ID(state, action) {
      state.userId = action.payload;
    },
    RESET_ROOM() {
      return initialState;
    },
  },
});

export const roomActions = roomSlice.actions;
export default roomSlice.reducer;
