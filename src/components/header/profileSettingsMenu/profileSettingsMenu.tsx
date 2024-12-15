import React, { useEffect, useState } from 'react';
import './profileSettingsMenu.scss';
import { Menu, MenuItem } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';
import apiFunctions from '../../../constants/apiFunctions';
import useSigninDialogStore from '../../signinDialog/store/signinDialogStore';
import useUserLoginDataStore from '../../../store/userLoginDetailsStore';

export interface ProfileSettingsMenuProp {
    settingsAnchorRef: React.RefObject<HTMLButtonElement>;
    settingsOpen: boolean;
    handleClose: () => void;
}

const ProfileSettingsMenu: React.FC<ProfileSettingsMenuProp> = (props: ProfileSettingsMenuProp) => {
    const signinDialogStore = useSigninDialogStore();
    const userLoginDataStore = useUserLoginDataStore();
    const navigate = useNavigate();
    const navigateToLogin = async () => {
        userLoginDataStore.clearUserData();
        apiFunctions.logout()
            .then(() => {
                navigate('/signin');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const switchAccount = async () => {
        signinDialogStore.openDialog();
    }

    return (
        <Menu className="smallMenu" anchorEl={props.settingsAnchorRef.current} open={props.settingsOpen} onClose={props.handleClose}>
            {userLoginDataStore?.data.isUserLoggedIn ?
                [
                    <MenuItem key='logout'>
                        <div className='df jc ac' onClick={navigateToLogin}>
                            <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></AccountCircleOutlinedIcon>
                            logout
                        </div>
                    </MenuItem>,
                    <MenuItem key='switch'>
                        <div className='df jc ac' onClick={switchAccount}>
                            <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></AccountCircleOutlinedIcon>
                            Switch Account
                        </div>
                    </MenuItem>,
                    <MenuItem key='settings'>
                        <div className='df jc ac'>
                            <TuneRoundedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></TuneRoundedIcon>
                            Settings
                        </div>
                    </MenuItem>
                ]
                :
                <MenuItem>
                    <div className='df jc ac' onClick={switchAccount}>
                        <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></AccountCircleOutlinedIcon>
                        Signin
                    </div>
                </MenuItem>
            }
        </Menu>
    )
}

export { ProfileSettingsMenu }