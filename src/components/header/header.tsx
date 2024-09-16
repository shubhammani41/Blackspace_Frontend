import { AppBar, Button, Typography } from "@mui/material";
import './header.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useMemo, useRef, useState } from "react";
import Logo from '../../assets/images/logo5.png';
import useThemeStore, { ThemeMode } from "../themeToggleBtn/store/themeStore";
import { HeaderSettingsMenu } from "./headerSettingsMenu/headerSettingsMenu";
import { ProfileSettingsMenu } from "./profileSettingsMenu/profileSettingsMenu";

const AppHeader: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const headerSettingsAnchorRef = useRef<HTMLButtonElement>(null);
    const profileSettingsAnchorRef = useRef<HTMLButtonElement>(null);
    const [headerSettingsOpen, setHeaderSettingsOpen] = useState<boolean>(false);
    const [profileSettingsOpen, setProfileSettingsOpen] = useState<boolean>(false);
    const handleClickHeaderSettings = () => {
        setHeaderSettingsOpen((prev) => !prev);
    };
    const handleCloseHeaderSettings = () => {
        setHeaderSettingsOpen(false);
    };
    const handleClickProfileSettings = () => {
        setProfileSettingsOpen((prev) => !prev);
    };
    const handleCloseProfileSettings = () => {
        setProfileSettingsOpen(false);
    };

    const navigateToHome = () => {
        navigate("/home");
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
        <AppBar className="headerContainer df jc ac" sx={{ backgroundColor: 'background.default' }}>
            <div className="headerInner df jsb ac w75vw" style={{backgroundColor: currentTheme.data.theme.palette?.background?.paper}}>
                <div className="df js ac">
                    <img src={Logo} className={"icon30 iconTp2n logoIco " + ((themeMode === ThemeMode.Dark || themeMode === ThemeMode.Blue || themeMode === ThemeMode.Red) ? 'logoIcoInvert' : '')}></img>
                    <Typography sx={{ color: 'text.primary' }} className="ellipsis crPointer headerFontClamp" variant="body1" color="text.secondary"
                        onClick={navigateToHome}>
                        Blackspace
                    </Typography>
                    <ArrowForwardIosIcon sx={{ color: 'text.secondary' }} className="w15 h15 headerIcoClamp1525"></ArrowForwardIosIcon>
                    {location?.pathname ? <Typography className="ellipsis fw300 ml15 headerFontClamp mw11vw" color="text.secondary">{pageName}</Typography> : null}
                </div>
                <div className="df je ac">
                    <Button onClick={handleClickProfileSettings} ref={profileSettingsAnchorRef} className="ml15 mw0px">
                        <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2535"></AccountCircleOutlinedIcon>
                    </Button>
                    <Button onClick={handleClickHeaderSettings} ref={headerSettingsAnchorRef} className="mw0px">
                        <SettingsOutlinedIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2535"></SettingsOutlinedIcon>
                    </Button>
                </div>
            </div>
            <div onClick={handleCloseHeaderSettings}>
                <HeaderSettingsMenu settingsAnchorRef={headerSettingsAnchorRef} settingsOpen={headerSettingsOpen} handleClose={handleCloseHeaderSettings}></HeaderSettingsMenu>
            </div>
            <div onClick={handleCloseProfileSettings}>
                <ProfileSettingsMenu settingsAnchorRef={profileSettingsAnchorRef} settingsOpen={profileSettingsOpen} handleClose={handleCloseProfileSettings}></ProfileSettingsMenu>
            </div>
        </AppBar>
    )
}

export { AppHeader };