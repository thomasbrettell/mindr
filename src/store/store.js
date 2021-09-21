import {configureStore} from "@reduxjs/toolkit";
import appReducer from "./app-slice";
import roomReducer from "./room-slice";

const store = configureStore({
  reducer: {
    room: roomReducer,
    app: appReducer,
  },
});

export default store;
