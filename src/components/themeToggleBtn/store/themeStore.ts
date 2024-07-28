import { ThemeOptions } from "@mui/material";
import { StoreApi, UseBoundStore, create } from "zustand";
import { themeObjDark, themeObjDarkBlue, themeObjDarkRed, themeObjLight } from "../../../constants/themeConstants";

export enum ThemeMode {
    Light = "LIGHT",
    Dark = "DARK",
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

const lightTheme: ThemeState = { theme: themeObjLight, mode: ThemeMode.Light };
const darkTheme: ThemeState = { theme: themeObjDark, mode: ThemeMode.Dark };
const blueTheme: ThemeState = { theme: themeObjDarkBlue, mode: ThemeMode.Blue };
const redTheme: ThemeState = { theme: themeObjDarkRed, mode: ThemeMode.Red };
const defaultTheme: ThemeState = lightTheme;

const useThemeStore: UseBoundStore<StoreApi<ThemeStore>> = create((set) => ({
    data: defaultTheme,
    toggleTheme: () => set((state: { data: ThemeState }) => (
        state.data.mode === ThemeMode.Light ? { data: darkTheme } : { data: lightTheme }
    )),
    setBlueTheme: () => set((state: { data: ThemeState }) => (
        { data: blueTheme }
    )),
    setRedTheme: () => set((state: { data: ThemeState }) => (
        { data: redTheme }
    )),
}));

export { defaultTheme, blueTheme, redTheme, lightTheme, darkTheme };
export default useThemeStore;