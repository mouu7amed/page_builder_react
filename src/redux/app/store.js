import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/page/pageSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
  },
});

export default store;
