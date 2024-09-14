import { ThemeOptions } from "@mui/material";
import { StoreApi, UseBoundStore, create } from "zustand";
import { themeObjDark, themeObjLight } from "../../../constants/themeConstants";

export enum ThemeMode {
    Light = "LIGHT",
    Dark = "DARK"
}

export interface ThemeState {
    theme: ThemeOptions,
    mode: ThemeMode
}

export interface ThemeStore {
    data: ThemeState,
    toggleTheme: () => void
}

const lightTheme: ThemeState = { theme: themeObjLight, mode: ThemeMode.Light };
const darkTheme: ThemeState = { theme: themeObjDark, mode: ThemeMode.Dark };
const defaultTheme: ThemeState = lightTheme;

const useThemeStore: UseBoundStore<StoreApi<ThemeStore>> = create((set) => ({
    data: defaultTheme,
    toggleTheme: () => set((state: { data: ThemeState }) => (
        state.data.mode === ThemeMode.Light ? { data: darkTheme } : { data: lightTheme }
    )),
}));

export { defaultTheme, lightTheme, darkTheme };
export default useThemeStore;