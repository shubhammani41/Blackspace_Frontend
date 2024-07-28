import { ThemeOptions } from "@mui/material";
import { StoreApi, UseBoundStore, create } from "zustand";
import { themeObjDarkBlue, themeObjDarkRed } from "../../../constants/themeConstants";

export enum ThemeMode {
    Blue = "BLUE",
    Red = "RED"
}

export interface ThemeState {
    theme: ThemeOptions,
    mode: ThemeMode
}

export interface ThemeStore {
    data: ThemeState,
    toggleTheme: () => void,
    setBlueTheme: () => void,
    setRedTheme: () => void
}

const blueTheme: ThemeState = { theme: themeObjDarkBlue, mode: ThemeMode.Blue };
const redTheme: ThemeState = { theme: themeObjDarkRed, mode: ThemeMode.Red };
const defaultTheme: ThemeState = blueTheme;

const useThemeStore: UseBoundStore<StoreApi<ThemeStore>> = create((set) => ({
    data: defaultTheme,
    toggleTheme: () => set((state: { data: ThemeState }) => (
        state.data.mode === ThemeMode.Blue ? { data: redTheme } : { data: blueTheme }
    )),
    setBlueTheme: () => set((state: { data: ThemeState }) => (
        { data: blueTheme }
    )),
    setRedTheme: () => set((state: { data: ThemeState }) => (
        { data: redTheme }
    )),
}));

export { defaultTheme, blueTheme, redTheme };
export default useThemeStore;