import { Button, Typography } from "@mui/material";
import style from './header.module.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import LogoTr from '../../assets/images/logoTr.png';
import useThemeStore, { ThemeMode } from "../themeToggleBtn/store/themeStore";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { MainBarLayoutComponent } from "../layoutComponents/mainBarLayoutComponent/mainBarLayoutComponent";
import { BackButtonComponent } from "../backButtonComponent/backButtonComponent";

const AppHeader: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 10) {
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
        <div className={style.headerContainer + (isHidden ? (" " + style.headerHidden) : "")} style={{background: currentTheme.data.theme.palette?.background?.default}}>
            {location.pathname !== '/signin' ?
                <MainBarLayoutComponent>
                    <div className={`${style.headerInner}`} style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper }}>
                        <div className={`${style.headerInnerLeft}`}>
                            {isBackEnabled ?
                                <BackButtonComponent></BackButtonComponent>
                                :
                                <div className={style.logoContainer}>
                                    <img src={LogoTr} alt="home" className={`${style.icon30} ${style.logoIco} ${((themeMode === ThemeMode.Dark || themeMode === ThemeMode.Blue || themeMode === ThemeMode.Red) ? style.logoIcoInvert : '')}`}
                                        onClick={navigateToHome}></img>
                                    <Typography sx={{ color: 'text.primary' }} className={`${style.ellipsis} ${style.crPointer} ${style.headerFontClamp} d-none d-sm-block ms-2`} variant="body1" color="text.secondary"
                                        onClick={navigateToHome}>
                                        Blackspace
                                    </Typography>
                                    <ArrowForwardIosIcon sx={{ color: 'text.secondary' }} className={`${style.w15} ${style.h15} ${style.headerIcoClamp1525}`}></ArrowForwardIosIcon>
                                </div>}
                            {location?.pathname ? <Typography className={`${style.ellipsis} ${style.fw300} ${style.headerFontClamp}`} color="text.primary">{pageName !== '' ? pageName : 'Home'}</Typography> : null}
                        </div>
                        <div className={`${style.headerInnerRight}`}>
                            <Button onClick={handleSearchClick} className={`${style.mw0px}`}>
                                <SearchIcon sx={{ color: 'text.secondary' }} className={`${style.headerIcoClamp2830}`}></SearchIcon>
                            </Button>
                            <Button className={`${style.mw0px}`}>
                                <NotificationsRoundedIcon sx={{ color: 'text.secondary' }} className={`${style.headerIcoClamp2830}`}></NotificationsRoundedIcon>
                            </Button>
                            <Button className={`${style.mw0px}`} onClick={navigateToSettings}>
                                <MenuRoundedIcon sx={{ color: 'text.secondary' }} className={`${style.headerIcoClamp2830}`}></MenuRoundedIcon>
                            </Button>
                        </div>
                    </div>
                </MainBarLayoutComponent> : <></>}

        </div>
    )
}

export { AppHeader };