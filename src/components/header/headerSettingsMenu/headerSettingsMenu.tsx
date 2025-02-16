import React from 'react';
import './headerSettingsMenu.scss';
import { Button, Menu, MenuItem, SimplePaletteColorOptions, Typography } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { ThemeToggleBtn } from '../../themeToggleBtn/themeToggleBtn';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { MatrixEasterEggToggleBtn } from '../../themeToggleBtn/matrixEasterEggToggleBtn';
import { useNavigate } from 'react-router-dom';
import apiFunctions from '../../../constants/apiFunctions';
import useSigninDialogStore from '../../signinDialog/store/signinDialogStore';
import useUserLoginDataStore from '../../../store/userLoginDetailsStore';
import useThemeStore from '../../themeToggleBtn/store/themeStore';
import AvatarAvacadoIcon from '../../../assets/images/avatar-avacado.svg';
import ExitDoorIcon from '../../../assets/images/exit-door.svg'

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
    const openSignInDialog = async () => {
        signinDialogStore.openDialog();
    }
    return (
        <Menu anchorEl={props.settingsAnchorRef.current} open={props.settingsOpen} onClose={props.handleClose}>
            <MenuItem>
                <Button variant="text" style={{ textTransform: 'none' }}>
                    <TuneRoundedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></TuneRoundedIcon>
                    <Typography variant="body2">Settings</Typography>
                </Button>
            </MenuItem>
            <MenuItem>
                <Button variant="text" style={{ textTransform: 'none' }}>
                    <ThemeToggleBtn></ThemeToggleBtn>
                </Button>
            </MenuItem>
            {userLoginDataStore?.data.isUserLoggedIn ?
                [
                    <MenuItem key='settings'>
                        <Button variant="text" style={{ textTransform: 'none' }}>
                            <img className="icon30 p4" src={AvatarAvacadoIcon}></img>
                            <Typography variant="body2">Profile</Typography>
                        </Button>
                    </MenuItem>,
                    <MenuItem key='logout'>
                        <Button variant="text" style={{ textTransform: 'none' }} onClick={navigateToLogin}>
                            <img className="icon30 p4" src={ExitDoorIcon}></img>
                            <Typography variant="body2">logout</Typography>
                        </Button>
                    </MenuItem>
                ]
                :
                <MenuItem>
                    <Button variant="text" style={{ textTransform: 'none' }} onClick={openSignInDialog}>
                        <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></AccountCircleOutlinedIcon>
                        <Typography variant="body2">Signin</Typography>
                    </Button>
                </MenuItem>
            }
            {/* <MenuItem>
                <Button variant="text" style={{ textTransform: 'none' }}>
                    <MatrixEasterEggToggleBtn></MatrixEasterEggToggleBtn>
                </Button>
            </MenuItem> */}
        </Menu>
    )
}

export { HeaderSettingsMenu }