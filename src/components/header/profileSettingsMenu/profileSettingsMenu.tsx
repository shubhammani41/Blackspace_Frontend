import React from 'react';
import './profileSettingsMenu.scss';
import { Menu, MenuItem } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';

export interface ProfileSettingsMenuProp {
    settingsAnchorRef: React.RefObject<HTMLButtonElement>;
    settingsOpen: boolean;
    handleClose: () => void;
}

const ProfileSettingsMenu: React.FC<ProfileSettingsMenuProp> = (props: ProfileSettingsMenuProp) => {
    const navigate = useNavigate();
    const navigateToLogin = ()=>{
        navigate(`/signin`);
    }

    return (
        <Menu className="smallMenu" anchorEl={props.settingsAnchorRef.current} open={props.settingsOpen} onClose={props.handleClose}>
            <MenuItem>
                <div className='df jc ac' onClick={navigateToLogin}>
                    <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></AccountCircleOutlinedIcon>
                    SignIn
                </div>
            </MenuItem>
            <MenuItem>
                <div className='df jc ac'>
                    <TuneRoundedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></TuneRoundedIcon>
                    Settings
                </div>
            </MenuItem>
        </Menu>
    )
}

export { ProfileSettingsMenu }