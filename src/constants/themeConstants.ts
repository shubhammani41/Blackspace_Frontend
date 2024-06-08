import { ThemeOptions } from "@mui/material"

const themeObjLight: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#03A062',
            contrastText: '#ffffff',
            light: '#77ffc8',
            dark: '#006b40',
        },
        secondary: {
            main: '#569CD6',
            light: '#7cadd5',
            dark: '#569cd665',
            contrastText: '#ffffff',
        },
        error: {
            main: '#ff0000',
            light: '#ff7272',
            dark: '#950000',
            contrastText: '#ffffff',
        },
        info: {
            main: '#FFFF00',
            light: '#ffff9e',
            dark: '#9c9c00',
            contrastText: '#ffffff',
        },
        success: {
            main: '#03A062',
            contrastText: '#ffffff',
            light: '#77ffc8',
            dark: '#006b40',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff'
        },
        text: {
            primary: '#000000',
            secondary: '#000000',
            // disabled: '#03A062',
        },
        action: {
            active: '#569CD6',
            hover: '#7cadd5',
            // hoverOpacity: number;
            selected: '#569CD6',
            // selectedOpacity: number;
            // disabled: string;
            // disabledOpacity: number;
            // disabledBackground: string;
            focus: '#569CD6',
            // focusOpacity: number;
            // activatedOpacity: number;
        }
    },
    typography: {
        fontFamily: 'IBM Plex Mono',
        allVariants: {
            color: "#03A062"
        },
    },
    shadows:["none", "rgba(149, 157, 165, 0.2) 0px 8px 24px", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none"]
}
const themeObjDark: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#03A062',
            contrastText: '#ffffff',
            light: '#77ffc8',
            dark: '#006b40',
        },
        secondary: {
            main: '#569CD6',
            light: '#7cadd5',
            dark: '#569cd665',
            contrastText: '#ffffff',
        },
        error: {
            main: '#ff0000',
            light: '#ff7272',
            dark: '#950000',
            contrastText: '#ffffff',
        },
        info: {
            main: '#FFFF00',
            light: '#ffff9e',
            dark: '#9c9c00',
            contrastText: '#ffffff',
        },
        success: {
            main: '#03A062',
            contrastText: '#ffffff',
            light: '#77ffc8',
            dark: '#006b40',
        },
        background: {
            default: '#000000',
            paper: '#000000'
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffffff',
            // disabled: '#03A062',
        },
        action: {
            active: '#569CD6',
            hover: '#7cadd5',
            // hoverOpacity: number;
            selected: '#569CD6',
            // selectedOpacity: number;
            // disabled: string;
            // disabledOpacity: number;
            // disabledBackground: string;
            focus: '#569CD6',
            // focusOpacity: number;
            // activatedOpacity: number;
        },
    },
    typography: {
        fontFamily: 'IBM Plex Mono',
        allVariants: {
            color: "#03A062"
        },
    },
    shadows:["none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none"]
}

export { themeObjLight, themeObjDark }