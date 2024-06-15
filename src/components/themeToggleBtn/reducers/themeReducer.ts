import { ThemeOptions } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { themeObjDark, themeObjLight } from "../../../constants/themeConstants";

enum ThemeMode {
    Light = "LIGHT",
    Dark = "DARK",
    Toggle = "TOGGLE"
}

const initialState: { theme: ThemeOptions | any, mode: ThemeMode | string } = {
    theme: themeObjDark,
    mode: ThemeMode.Dark
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        switchTheme: (state: { theme: ThemeOptions | any, mode: ThemeMode | string }, action: PayloadAction<ThemeMode>) => {
            switch (action.payload) {
                case ThemeMode.Light:
                    return { ...state, theme: themeObjLight, mode: ThemeMode.Light };
                case ThemeMode.Dark:
                    return { ...state, theme: themeObjDark, mode: ThemeMode.Dark };
                case ThemeMode.Toggle:
                    const nextTheme = state.mode === ThemeMode.Dark ? { theme: themeObjLight, mode: ThemeMode.Light } : { theme: themeObjDark, mode: ThemeMode.Dark };
                    return nextTheme;
                default:
                    return initialState;
            }
        }
    }
});

export const { switchTheme } = themeSlice.actions;
export { ThemeMode }
export default themeSlice.reducer;