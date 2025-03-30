import React from 'react';
import './profileSettingsMenu.scss';
import { Button, Paper, Typography } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { ThemeToggleBtn } from '../themeToggleBtn/themeToggleBtn';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { MatrixEasterEggToggleBtn } from '../themeToggleBtn/matrixEasterEggToggleBtn';
import { useNavigate } from 'react-router-dom';
import apiFunctions from '../../constants/apiFunctions';
import useSigninDialogStore from '../signinDialog/store/signinDialogStore';
import useUserLoginDataStore from '../../store/userLoginDetailsStore';
import AvatarAvacadoIcon from '../../assets/images/avatar-avacado.svg';
import ExitDoorIcon from '../../assets/images/exit-door.svg';

const ProfileSettingsMenu: React.FC = () => {
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
    const openSignInDialog = async () => {
        signinDialogStore.openDialog();
    }
    return (
        <div>
            <div className='mb-2'>
                <Typography sx={{ color: 'text.primary' }} className="ellipsis" variant="body2" color="text.secondary">
                    Profile Settings
                </Typography>
            </div>
            <Paper className='settingContainer roundedContainer'>
                {userLoginDataStore?.data.isUserLoggedIn ?
                    [
                        <Button key='settings' variant="text" style={{ textTransform: 'none' }}>
                            <img className="icon30 p4" alt='profile' src={AvatarAvacadoIcon}></img>
                            <Typography variant="body2">Profile</Typography>
                        </Button>,
                        <Button key='logout' variant="text" style={{ textTransform: 'none' }} onClick={navigateToLogin}>
                            <img className="icon30 p4" alt='logout' src={ExitDoorIcon}></img>
                            <Typography variant="body2">logout</Typography>
                        </Button>
                    ]
                    :
                    <Button variant="text" style={{ textTransform: 'none' }} onClick={openSignInDialog}>
                        <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></AccountCircleOutlinedIcon>
                        <Typography variant="body2">Signin</Typography>
                    </Button>
                }
                {/* <Button variant="text" style={{ textTransform: 'none' }}>
                    <MatrixEasterEggToggleBtn></MatrixEasterEggToggleBtn>
                </Button> */}
            </Paper>
            <div className='mb-2 mt-3'>
                <Typography sx={{ color: 'text.primary' }} className="ellipsis" variant="body2" color="text.secondary">
                    App Settings
                </Typography>
            </div>
            <Paper className='settingContainer roundedContainer'>
                <Button variant="text" style={{ textTransform: 'none' }}>
                    <TuneRoundedIcon sx={{ color: 'text.secondary' }} className="icon30 p4"></TuneRoundedIcon>
                    <Typography variant="body2">Settings</Typography>
                </Button>
                <Button variant="text" style={{ textTransform: 'none' }}>
                    <ThemeToggleBtn></ThemeToggleBtn>
                </Button>
            </Paper>
        </div>
    )
}

export { ProfileSettingsMenu }