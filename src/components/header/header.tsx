import { AppBar, Button, Menu, MenuItem, Typography } from "@mui/material";
import './header.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useRef, useState } from "react";
import { ThemeToggleBtn } from "../themeToggleBtn/themeToggleBtn";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

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
    return (
        <AppBar className="headerContainer df jc ac" sx={{ backgroundColor: 'background.default' }}>
            <div className="df jc ac w75vw">
                <div className="df js ac f50">
                    <HomeRoundedIcon sx={{ color: 'text.primary' }} className="icon30 iconTp2n" onClick={navigateToHome}></HomeRoundedIcon>
                    <Typography sx={{ color: 'text.primary' }} className="ellipsis crPointer" variant="body1" color="text.secondary"
                        onClick={navigateToHome}>
                        Blackspace
                    </Typography>
                    <ArrowForwardIosIcon sx={{ color: 'text.secondary' }} className="w15 h15"></ArrowForwardIosIcon>
                    {location?.pathname ? <Typography className="ellipsis fw300 ml15" color="text.secondary">{location.pathname.substring(1)}</Typography> : null}
                </div>
                <div className="df je ac f50">
                    <Button onClick={handleClick} ref={settingsAnchorRef} className="ml15">
                        <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} className="icon30"></AccountCircleOutlinedIcon>
                    </Button>
                    <Button onClick={handleClick} ref={settingsAnchorRef}>
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