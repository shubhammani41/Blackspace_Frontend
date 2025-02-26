import { AppBar, Button, SimplePaletteColorOptions, Typography } from "@mui/material";
import './header.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useEffect, useMemo, useRef, useState } from "react";
import LogoTr from '../../assets/images/logoTr.png';
import useThemeStore, { ThemeMode } from "../themeToggleBtn/store/themeStore";
import { HeaderSettingsMenu } from "./headerSettingsMenu/headerSettingsMenu";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchIcon from '@mui/icons-material/Search';
import { ReactComponent as SettingsIcon } from '../../assets/images/settings.svg';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const AppHeader: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const headerSettingsAnchorRef = useRef<HTMLButtonElement>(null);
    const profileSettingsAnchorRef = useRef<HTMLButtonElement>(null);
    const [headerSettingsOpen, setHeaderSettingsOpen] = useState<boolean>(false);
    const [profileSettingsOpen, setProfileSettingsOpen] = useState<boolean>(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const handleClickHeaderSettings = () => {
        setHeaderSettingsOpen((prev) => !prev);
    };
    const handleCloseHeaderSettings = () => {
        setHeaderSettingsOpen(false);
    };
    const handleSearchClick = () => {
        navigate('/profileSearch');
    };
    const handleCloseProfileSettings = () => {
        setProfileSettingsOpen(false);
    };

    const navigateToHome = () => {
        navigate("/home");
    }
    const goBack = () => {
        navigate(-1);
    }

    const pageName = useMemo<string>(() => {
        const segments = location.pathname.split('/').filter(Boolean);
        const lastSegment = segments[segments.length - 1]?.split('?')[0] ?? '';

        // Function to split camelCase and capitalize words
        const formatTitle = (str: string) => {
            return str
                .replace(/([a-z])([A-Z])/g, "$1 $2") // Split camelCase
                .replace(/-/g, " ") // Replace hyphens with spaces
                .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter
        };

        return lastSegment ? formatTitle(lastSegment) : '';
    }, [location]);

    const isBackEnabled = useMemo(() => {
        console.log(location.key);
        if (location.key != 'default' && location.pathname !== '/home') {
            return true;
        }
        return false;
    }, [location])

    const currentTheme = useThemeStore();

    const themeMode = useMemo<string | null>(() => {
        return currentTheme?.data?.mode ? currentTheme.data.mode : null;
    }, [currentTheme]);

    return (
        <div className={"headerContainer" + (isHidden ? " headerHidden" : "")}>
            {location.pathname !== '/signin' ? <AppBar sx={{ backgroundColor: 'background.default', padding: '0px', paddingTop: '8px' }}>
                <div className="row gx-0 px-2">
                    <div className="col-lg-2 col-sm-1 d-sm-block d-none">
                    </div>
                    <div className="col-lg-8 col-sm-10 col-12">
                        <div className="headerInner df jsb ac" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper }}>
                            <div className="df js ac headerInnerLeft">
                                {isBackEnabled ? <ArrowBackRoundedIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2535 me-1" onClick={goBack}></ArrowBackRoundedIcon> : null}
                                {!isBackEnabled ? <div>
                                    <img src={LogoTr} className={"icon30 logoIco " + ((themeMode === ThemeMode.Dark || themeMode === ThemeMode.Blue || themeMode === ThemeMode.Red) ? 'logoIcoInvert' : '')}
                                        onClick={navigateToHome}></img>
                                    <Typography sx={{ color: 'text.primary' }} className="ellipsis crPointer headerFontClamp d-none d-sm-block ms-2" variant="body1" color="text.secondary"
                                        onClick={navigateToHome}>
                                        Blackspace
                                    </Typography>
                                    <ArrowForwardIosIcon sx={{ color: 'text.secondary' }} className="w15 h15 headerIcoClamp1525"></ArrowForwardIosIcon>
                                </div> : null}
                                {location?.pathname ? <Typography className="ellipsis fw300 headerFontClamp" color="text.secondary">{pageName != '' ? pageName : 'Home'}</Typography> : null}
                            </div>
                            <div className="df je ac headerInnerRight">
                                <Button onClick={handleSearchClick} ref={profileSettingsAnchorRef} className="mw0px" style={{ padding: '4px' }}>
                                    <SearchIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2535"></SearchIcon>
                                </Button>
                                <Button onClick={handleClickHeaderSettings} ref={headerSettingsAnchorRef} className="mw0px" style={{ padding: '4px' }}>
                                    <svg className="headerIcoClamp2535" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path fill={(currentTheme.data.theme.palette?.secondary as SimplePaletteColorOptions).light} opacity="0.4" d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z"></path>
                                            <path fill={(currentTheme.data.theme.palette?.secondary as SimplePaletteColorOptions).main} d="M12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25Z"></path>
                                        </g>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-sm-1 d-sm-block d-none">
                    </div>
                </div>

                <div onClick={handleCloseHeaderSettings}>
                    <HeaderSettingsMenu settingsAnchorRef={headerSettingsAnchorRef} settingsOpen={headerSettingsOpen} handleClose={handleCloseHeaderSettings}></HeaderSettingsMenu>
                </div>
            </AppBar> : <></>}

        </div>
    )
}

export { AppHeader };