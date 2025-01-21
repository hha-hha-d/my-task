import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import personsDataReducer from "./personsDataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    persons: personsDataReducer,
  },
});
