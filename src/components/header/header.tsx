import { AppBar, Button, Menu, MenuItem, Typography } from "@mui/material";
import './header.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useMemo, useRef, useState } from "react";
import { ThemeToggleBtn } from "../themeToggleBtn/themeToggleBtn";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import Logo from '../../assets/images/logo5.png';
import useThemeStore, { ThemeMode } from "../themeToggleBtn/store/themeStore";

const AppHeader: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const settingsAnchorRef = useRef<HTMLButtonElement>(null);
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const handleClick = () => {
        setSettingsOpen((prev) => !prev);
    };

    const handleClose = () => {
        setSettingsOpen(false);
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
            <div className="df jc ac w75vw">
                <div className="df js ac f50">
                    <img src={Logo} className={"icon30 iconTp2n logoIco " + (themeMode === ThemeMode.Dark ? 'logoIcoInvert' : '')}></img>
                    <Typography sx={{ color: 'text.primary' }} className="ellipsis crPointer" variant="body1" color="text.secondary"
                        onClick={navigateToHome}>
                        Blackspace
                    </Typography>
                    <ArrowForwardIosIcon sx={{ color: 'text.secondary' }} className="w15 h15"></ArrowForwardIosIcon>
                    {location?.pathname ? <Typography className="ellipsis fw300 ml15" color="text.secondary">{pageName}</Typography> : null}
                </div>
                <div className="df je ac f50">
                    <Button onClick={handleClick} ref={settingsAnchorRef} className="ml15 mw0px">
                        <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} className="icon30"></AccountCircleOutlinedIcon>
                    </Button>
                    <Button onClick={handleClick} ref={settingsAnchorRef} className="mw0px">
                        <SettingsOutlinedIcon sx={{ color: 'text.secondary' }} className="icon30"></SettingsOutlinedIcon>
                    </Button>
                </div>
            </div>
            <Menu className="smallMenu" anchorEl={settingsAnchorRef.current} open={settingsOpen} onClose={handleClose}>
                <MenuItem> <TuneRoundedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></TuneRoundedIcon>
                    Settings</MenuItem>
                <MenuItem>
                    <ThemeToggleBtn></ThemeToggleBtn>
                </MenuItem>
            </Menu>
        </AppBar>
    )
}

export { AppHeader };