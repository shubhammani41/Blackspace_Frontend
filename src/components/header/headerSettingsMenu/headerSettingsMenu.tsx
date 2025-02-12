import React from 'react';
import './headerSettingsMenu.scss';
import { Menu, MenuItem, SimplePaletteColorOptions } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { ThemeToggleBtn } from '../../themeToggleBtn/themeToggleBtn';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { MatrixEasterEggToggleBtn } from '../../themeToggleBtn/matrixEasterEggToggleBtn';
import { useNavigate } from 'react-router-dom';
import apiFunctions from '../../../constants/apiFunctions';
import useSigninDialogStore from '../../signinDialog/store/signinDialogStore';
import useUserLoginDataStore from '../../../store/userLoginDetailsStore';
import useThemeStore from '../../themeToggleBtn/store/themeStore';

export interface HeaderSettingsMenuProp {
    settingsAnchorRef: React.RefObject<HTMLButtonElement>;
    settingsOpen: boolean;
    handleClose: () => void;
}

const HeaderSettingsMenu: React.FC<HeaderSettingsMenuProp> = (props: HeaderSettingsMenuProp) => {
    const signinDialogStore = useSigninDialogStore();
    const userLoginDataStore = useUserLoginDataStore();
    const currentTheme = useThemeStore();
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
        <Menu anchorEl={props.settingsAnchorRef.current} open={props.settingsOpen} onClose={props.handleClose}>
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
            {userLoginDataStore?.data.isUserLoggedIn ?
                [
                    <MenuItem key='settings'>
                        <div className='df jc ac'>
                            <svg className="icon30 p4" width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fill={(currentTheme.data.theme.palette?.secondary as SimplePaletteColorOptions).light} opacity="0.4" d="M12 22.01C17.5228 22.01 22 17.5329 22 12.01C22 6.48716 17.5228 2.01001 12 2.01001C6.47715 2.01001 2 6.48716 2 12.01C2 17.5329 6.47715 22.01 12 22.01Z"></path>
                                    <path fill={(currentTheme.data.theme.palette?.secondary as SimplePaletteColorOptions).main} d="M12 6.93994C9.93 6.93994 8.25 8.61994 8.25 10.6899C8.25 12.7199 9.84 14.3699 11.95 14.4299C11.98 14.4299 12.02 14.4299 12.04 14.4299C12.06 14.4299 12.09 14.4299 12.11 14.4299C12.12 14.4299 12.13 14.4299 12.13 14.4299C14.15 14.3599 15.74 12.7199 15.75 10.6899C15.75 8.61994 14.07 6.93994 12 6.93994Z"></path>
                                    <path fill={(currentTheme.data.theme.palette?.secondary as SimplePaletteColorOptions).main} d="M18.7807 19.36C17.0007 21 14.6207 22.01 12.0007 22.01C9.3807 22.01 7.0007 21 5.2207 19.36C5.4607 18.45 6.1107 17.62 7.0607 16.98C9.7907 15.16 14.2307 15.16 16.9407 16.98C17.9007 17.62 18.5407 18.45 18.7807 19.36Z"></path>
                                </g>
                            </svg>
                            {/* <TuneRoundedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></TuneRoundedIcon> */}
                            Profile
                        </div>
                    </MenuItem>,
                    <MenuItem key='switch'>
                    <div className='df jc ac' onClick={switchAccount}>
                        <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></AccountCircleOutlinedIcon>
                        Switch Account
                    </div>
                </MenuItem>,
                    <MenuItem key='logout'>
                        <div className='df jc ac' onClick={navigateToLogin}>
                            <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></AccountCircleOutlinedIcon>
                            logout
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
            {/* <MenuItem>
                <div  className='df jc ac'>
                    <MatrixEasterEggToggleBtn></MatrixEasterEggToggleBtn>
                </div>
            </MenuItem> */}
        </Menu>
    )
}

export { HeaderSettingsMenu }