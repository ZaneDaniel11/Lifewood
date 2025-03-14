import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { HandleApplicationsApi } from "./assets/services/HandleApplicationsApi";

export const store = configureStore({
    reducer: {
        [HandleApplicationsApi.reducerPath]: HandleApplicationsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(HandleApplicationsApi.middleware),
});

// Ensure setupListeners is called properly
setupListeners(store.dispatch);

