import { AppBar, Button, Typography } from "@mui/material";
import './header.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useEffect, useMemo, useRef, useState } from "react";
import LogoTr from '../../assets/images/logoTr.png';
import useThemeStore, { ThemeMode } from "../themeToggleBtn/store/themeStore";
import { HeaderSettingsMenu } from "./headerSettingsMenu/headerSettingsMenu";
import { ProfileSettingsMenu } from "./profileSettingsMenu/profileSettingsMenu";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import useSideBarStore from "../sideBar/store/sideBarStore";
import SearchIcon from '@mui/icons-material/Search';

const AppHeader: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const headerSettingsAnchorRef = useRef<HTMLButtonElement>(null);
    const profileSettingsAnchorRef = useRef<HTMLButtonElement>(null);
    const [headerSettingsOpen, setHeaderSettingsOpen] = useState<boolean>(false);
    const [profileSettingsOpen, setProfileSettingsOpen] = useState<boolean>(false);
    const sideBarStore = useSideBarStore();
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

    const toggleSideBar = () => {
        sideBarStore.toggleSideBar();
    }

    const pageName = useMemo<string>(() => {
        const segments = location.pathname.split('/').filter(Boolean);
        const lastSegment = segments[segments.length - 1];
        return lastSegment ? lastSegment.split('?')[0] : '';
    }, [location]);

    const currentTheme = useThemeStore();

    const themeMode = useMemo<string | null>(() => {
        return currentTheme?.data?.mode ? currentTheme.data.mode : null;
    }, [currentTheme]);

    return (
        <div className={"headerContainer" + (isHidden ? " headerHidden" : "")}>
            {location.pathname !== '/signin' ? <AppBar sx={{ backgroundColor: 'background.default', paddingBottom:'0px' }}>
                <div className="row gx-0">
                    <div className="col-xxl-2 col-xl-2 col-lg-1 d-sm-block">

                    </div>
                    <div className="col-1 df je ac">
                        <Button className="mw0px">
                            <MenuRoundedIcon sx={{ color: 'text.secondary' }} className="sideBarIcoClamp2535" onClick={toggleSideBar}></MenuRoundedIcon>
                        </Button>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-8 col-sm-10 col-10">
                        <div className="headerInner df jsb ac" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper }}>
                            <div className="df js ac headerInnerLeft">
                                <img src={LogoTr} className={"icon30 logoIco " + ((themeMode === ThemeMode.Dark || themeMode === ThemeMode.Blue || themeMode === ThemeMode.Red) ? 'logoIcoInvert' : '')}
                                    onClick={navigateToHome}></img>
                                <Typography sx={{ color: 'text.primary' }} className="ellipsis crPointer headerFontClamp d-none d-sm-block ms-2" variant="body1" color="text.secondary"
                                    onClick={navigateToHome}>
                                    Blackspace
                                </Typography>
                                <ArrowForwardIosIcon sx={{ color: 'text.secondary' }} className="w15 h15 headerIcoClamp1525"></ArrowForwardIosIcon>
                                {location?.pathname ? <Typography className="ellipsis fw300 headerFontClamp" color="text.secondary">{pageName != '' ? pageName : 'Home'}</Typography> : null}
                            </div>
                            <div className="df je ac headerInnerRight">
                                <Button onClick={handleSearchClick} ref={profileSettingsAnchorRef} className="ml15 mw0px" style={{padding: '4px'}}>
                                    <SearchIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2535"></SearchIcon>
                                </Button>
                                <Button onClick={handleClickHeaderSettings} ref={headerSettingsAnchorRef} className="mw0px" style={{padding: '4px'}}>
                                    <SettingsOutlinedIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2535"></SettingsOutlinedIcon>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-2 col-sm-1 col-1">

                    </div>
                </div>

                <div onClick={handleCloseHeaderSettings}>
                    <HeaderSettingsMenu settingsAnchorRef={headerSettingsAnchorRef} settingsOpen={headerSettingsOpen} handleClose={handleCloseHeaderSettings}></HeaderSettingsMenu>
                </div>
                <div onClick={handleCloseProfileSettings}>
                    <ProfileSettingsMenu settingsAnchorRef={profileSettingsAnchorRef} settingsOpen={profileSettingsOpen} handleClose={handleCloseProfileSettings}></ProfileSettingsMenu>
                </div>
            </AppBar>: <></>}
            
        </div>
    )
}

export { AppHeader };