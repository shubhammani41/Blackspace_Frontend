import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../reducers/themeReducer";

const ThemeStore = configureStore({
    reducer:{
        theme:themeReducer
    }
});

export {ThemeStore}
export type ThemeState = ReturnType<typeof ThemeStore.getState>;