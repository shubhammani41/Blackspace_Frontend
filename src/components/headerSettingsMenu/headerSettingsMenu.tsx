import React from 'react';
import './headerSettingsMenu.scss';
import { Menu, MenuItem } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { ThemeToggleBtn } from '../themeToggleBtn/themeToggleBtn';

export interface HeaderSettingsMenuProp {
    settingsAnchorRef: React.RefObject<HTMLButtonElement>;
    settingsOpen: boolean;
    handleClose: () => void;
}

const HeaderSettingsMenu: React.FC<HeaderSettingsMenuProp> = (props: HeaderSettingsMenuProp) => {
    return (
        <Menu className="smallMenu" anchorEl={props.settingsAnchorRef.current} open={props.settingsOpen} onClose={props.handleClose}>
            <MenuItem>
                <div className='df jc ac'>
                    <TuneRoundedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></TuneRoundedIcon>
                    Settings
                </div>
            </MenuItem>
            <MenuItem>
                <div  className='df jc ac'>
                    <ThemeToggleBtn></ThemeToggleBtn>
                </div>
            </MenuItem>
        </Menu>
    )
}

export { HeaderSettingsMenu }