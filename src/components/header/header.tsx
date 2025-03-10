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
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

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

    const navigateToSettings = () => {
        navigate('/settings');
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
                                <Button onClick={handleSearchClick} className="mw0px">
                                    <SearchIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2830"></SearchIcon>
                                </Button>
                                <Button className="mw0px">
                                    <NotificationsRoundedIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2830"></NotificationsRoundedIcon>
                                </Button>
                                <Button className="mw0px" onClick={navigateToSettings}>
                                    <MenuRoundedIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2830"></MenuRoundedIcon>
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