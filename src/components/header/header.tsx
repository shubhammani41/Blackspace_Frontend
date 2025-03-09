import { AppBar, Button, Typography } from "@mui/material";
import './header.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import LogoTr from '../../assets/images/logoTr.png';
import useThemeStore, { ThemeMode } from "../themeToggleBtn/store/themeStore";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

const AppHeader: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
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

    const handleSearchClick = () => {
        navigate('/profileSearch');
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
        if (location.key !== 'default' && location.pathname !== '/home') {
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
            {location.pathname !== '/signin' ? <AppBar sx={{ backgroundColor: 'background.default', padding: '0px', paddingRight:'0px !important', paddingTop: '8px' }}>
                <div className="row gx-0 px-2">
                    <div className="col-lg-2 col-sm-1 d-sm-block d-none">
                    </div>
                    <div className="col-lg-8 col-sm-10 col-12">
                        <div className="headerInner df jsb ac" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper }}>
                            <div className="df js ac headerInnerLeft">
                                {isBackEnabled ? <ArrowBackRoundedIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2830 me-1" onClick={goBack}></ArrowBackRoundedIcon> : null}
                                {!isBackEnabled ? <div>
                                    <img src={LogoTr} alt="home" className={"icon30 logoIco " + ((themeMode === ThemeMode.Dark || themeMode === ThemeMode.Blue || themeMode === ThemeMode.Red) ? 'logoIcoInvert' : '')}
                                        onClick={navigateToHome}></img>
                                    <Typography sx={{ color: 'text.primary' }} className="ellipsis crPointer headerFontClamp d-none d-sm-block ms-2" variant="body1" color="text.secondary"
                                        onClick={navigateToHome}>
                                        Blackspace
                                    </Typography>
                                    <ArrowForwardIosIcon sx={{ color: 'text.secondary' }} className="w15 h15 headerIcoClamp1525"></ArrowForwardIosIcon>
                                </div> : null}
                                {location?.pathname ? <Typography className="ellipsis fw300 headerFontClamp" color="text.primary">{pageName !== '' ? pageName : 'Home'}</Typography> : null}
                            </div>
                            <div className="df je ac headerInnerRight">
                                <Button onClick={handleSearchClick} className="mw0px" style={{ padding: '4px' }}>
                                    <SearchIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2830"></SearchIcon>
                                </Button>
                                <Button className="mw0px" style={{ padding: '4px' }}>
                                    <NotificationsRoundedIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2830"></NotificationsRoundedIcon>
                                </Button>
                                <Button className="mw0px threeDotVerticalIcon" style={{ padding: '4px' }}>
                                    <svg className="headerIcoClamp2830" width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z" fill={currentTheme.data.theme.palette?.text?.secondary}></path>
                                            <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" fill={currentTheme.data.theme.palette?.text?.secondary}></path>
                                            <path opacity="0.5" d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill={currentTheme.data.theme.palette?.text?.secondary}></path>
                                        </g>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-sm-1 d-sm-block d-none">
                    </div>
                </div>
            </AppBar> : <></>}

        </div>
    )
}

export { AppHeader };