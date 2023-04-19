import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import globalSlice from './slice/globalSlice';
import refreshSlice from './slice/refreshSlice';
import toggleNavSlice from './slice/toggleNavSlice';
import userSlice from './slice/userSlice';
import modeSlice from './slice/modeSlice';
import policeSlice from "./slice/towingPoliceSlice";

export const store = configureStore({
  reducer: {
    userConnected: userSlice,
    globalState: globalSlice,
    refreshData: refreshSlice,
    toggleNav: toggleNavSlice,
    towingPolice: policeSlice,
    mode: modeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
