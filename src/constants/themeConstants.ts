import { ThemeOptions } from "@mui/material"

const themeObjLight: ThemeOptions = {
    components: {
        MuiPaper: {
            styleOverrides: { root: { backgroundImage: 'unset' } },
        },
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#03A062',
            contrastText: '#ffffff',
            light: '#77ffc8',
            dark: '#006b40',
        },
        secondary: {
            main: '#0095F6',
            light: '#67bdff',
            dark: '#247cbf',
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
            default: '#F5F5F7',
            paper: '#ffffff'
        },
        text: {
            primary: '#000000',
            secondary: '#6a617e',
            // disabled: '#03A062',
        },
        action: {
            active: '#0095F6',
            hover: '#efefef',
            // hoverOpacity: number;
            selected: '#0095F6',
            // selectedOpacity: number;
            // disabled: string;
            // disabledOpacity: number;
            // disabledBackground: string;
            focus: '#0095F6',
            // focusOpacity: number;
            // activatedOpacity: number;
        }
    },
    typography: {
        fontFamily: 'Roboto',
        allVariants: {
            color: "#6a617e"
        },
        fontWeightLight: 200,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600
    },
    shadows: ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none"]
}
const themeObjDark: ThemeOptions = {
    components: {
        MuiPaper: {
            styleOverrides: { root: { backgroundImage: 'unset' } },
        },
    },
    palette: {
        mode: 'dark',
        primary: {
            // main: '#03A062',
            main: '#03A062',
            contrastText: '#ffffff',
            light: '#77ffc8',
            dark: '#006b40',
        },
        secondary: {
            main: '#0095F6',
            light: '#67bdff',
            dark: '#247cbf',
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
            paper: '#0d0d0d'
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffffff',
            // disabled: '#03A062',
        },
        action: {
            active: '#0095F6',
            hover: '#4a4a4a',
            // hoverOpacity: number;
            selected: '#0095F6',
            // selectedOpacity: number;
            // disabled: string;
            // disabledOpacity: number;
            // disabledBackground: string;
            focus: '#0095F6',
            // focusOpacity: number;
            // activatedOpacity: number;
        },
    },
    typography: {
        fontFamily: 'Roboto',
        allVariants: {
            color: "#ffffff"
        },
        fontWeightLight: 100,
        fontWeightRegular: 300,
        fontWeightMedium: 400,
        fontWeightBold: 500
    },
    shadows: ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none"]
}

const themeObjDarkRed: ThemeOptions = {
    components: {
        MuiPaper: {
            styleOverrides: { root: { backgroundImage: 'unset' } },
        },
    },
    palette: {
        mode: 'dark',
        primary: {
            // main: '#c0281b',
            main: '#c0281b',
            contrastText: '#ffffff',
            light: '#77ffc8',
            dark: '#006b40',
        },
        secondary: {
            main: '#0095F6',
            light: '#67bdff',
            dark: '#247cbf',
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
            main: '#c0281b',
            contrastText: '#ffffff',
            light: '#77ffc8',
            dark: '#006b40',
        },
        background: {
            default: '#000000',
            paper: '#0d0d0d'
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffffff',
            // disabled: '#c0281b',
        },
        action: {
            active: '#0095F6',
            hover: '#4a4a4a',
            // hoverOpacity: number;
            selected: '#0095F6',
            // selectedOpacity: number;
            // disabled: string;
            // disabledOpacity: number;
            // disabledBackground: string;
            focus: '#0095F6',
            // focusOpacity: number;
            // activatedOpacity: number;
        },
    },
    typography: {
        fontFamily: 'Roboto',
        allVariants: {
            color: "#ffffff"
        },
        fontWeightLight: 100,
        fontWeightRegular: 300,
        fontWeightMedium: 400,
        fontWeightBold: 500
    },
    shadows: ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none"]
}
const themeObjDarkBlue: ThemeOptions = {
    components: {
        MuiPaper: {
            styleOverrides: { root: { backgroundImage: 'unset' } },
        },
    },
    palette: {
        mode: 'dark',
        primary: {
            // main: '#c0281b',
            main: '#42a0df',
            contrastText: '#ffffff',
            light: '#77ffc8',
            dark: '#006b40',
        },
        secondary: {
            main: '#0095F6',
            light: '#67bdff',
            dark: '#247cbf',
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
            main: '#42a0df',
            contrastText: '#ffffff',
            light: '#77ffc8',
            dark: '#006b40',
        },
        background: {
            default: '#000000',
            paper: '#0d0d0d'
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffffff',
            // disabled: '#42a0df',
        },
        action: {
            active: '#0095F6',
            hover: '#4a4a4a',
            // hoverOpacity: number;
            selected: '#0095F6',
            // selectedOpacity: number;
            // disabled: string;
            // disabledOpacity: number;
            // disabledBackground: string;
            focus: '#0095F6',
            // focusOpacity: number;
            // activatedOpacity: number;
        },
    },
    typography: {
        fontFamily: 'Roboto',
        allVariants: {
            color: "#ffffff"
        },
        fontWeightLight: 100,
        fontWeightRegular: 300,
        fontWeightMedium: 400,
        fontWeightBold: 500
    },
    shadows: ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none"]
}

export { themeObjDarkRed, themeObjDarkBlue, themeObjLight, themeObjDark }