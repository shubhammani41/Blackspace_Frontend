
import { Button, Typography } from '@mui/material';
import './menuBarInner.scss';
import useThemeStore, { ThemeMode } from '../../themeToggleBtn/store/themeStore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import useUserLoginDataStore from '../../../store/userLoginDetailsStore';

export interface MenuBarInnerProps {
    mode: 'vertical' | 'horizontal'
}

const MenuBarInner: React.FC<MenuBarInnerProps> = (props: MenuBarInnerProps) => {
    const currentTheme = useThemeStore();
    const userLoginDataStore = useUserLoginDataStore();
    const profileSettingContainerHorizontal = <>
        {userLoginDataStore?.data.isUserLoggedIn ?
            <Button className="mw0px menuBarInnerItems">
                <AccountCircleRoundedIcon sx={{ color: 'text.secondary' }} className={'menuBarInnerIcoClamp2830'}></AccountCircleRoundedIcon>
                <Typography className='menuItemLabel leftAlignedText' variant="body2">{userLoginDataStore?.data.userDetails?.userProfileDetails?.firstName || 'Tell us more about yourself!'}</Typography>
            </Button> :
            <Button className="mw0px menuBarInnerItems">
                <AccountCircleRoundedIcon sx={{ color: 'text.secondary' }} className={'menuBarInnerIcoClamp2830'}></AccountCircleRoundedIcon>
                <Typography className='menuItemLabel leftAlignedText' variant="body2">Signin here!</Typography>
            </Button>
        }
    </>

    const profileSettingContainerVertical = <>
        {userLoginDataStore?.data.isUserLoggedIn ?
            <Button className={"mw0px menuBarInnerItems"}>
                <AccountCircleRoundedIcon sx={{ color: 'text.secondary' }} className={'menuBarInnerIcoClamp2830'}></AccountCircleRoundedIcon>
                <Typography className='menuItemLabel leftAlignedText' variant="body2">{userLoginDataStore?.data.userDetails?.userProfileDetails?.firstName || 'Tell us more about yourself!'}</Typography>
            </Button> :
            <Button className={"mw0px menuBarInnerItems"}>
                <AccountCircleRoundedIcon sx={{ color: 'text.secondary' }} className={'menuBarInnerIcoClamp2830'}></AccountCircleRoundedIcon>
                <Typography className='menuItemLabel leftAlignedText' variant="body2">Signin here!</Typography>
            </Button>
        }
    </>

    return (
        <div className={"menuBarInner" + (props.mode === "horizontal" ? " horizontal" : " vertical")}>
            <div className="df ac jc fw menuBarInnerItemsContainer">
                <Button className="mw0px menuBarInnerItems">
                    <HomeRoundedIcon sx={{ color: 'text.secondary' }} className="menuBarInnerIcoClamp2830"></HomeRoundedIcon>
                    <Typography className='menuItemLabel ellipsis' variant="body2">Posts</Typography>
                </Button>
                <Button className="mw0px menuBarInnerItems">
                    <WhatshotIcon sx={{ color: 'text.secondary' }} className="menuBarInnerIcoClamp2830"></WhatshotIcon>
                    <Typography className='menuItemLabel ellipsis' variant="h5">Trending</Typography>
                </Button>
                <Button className="mw0px menuBarInnerItems">
                    <AddBoxIcon sx={{ color: 'text.secondary' }} className="menuBarInnerIcoClamp2830"></AddBoxIcon>
                    <Typography className='menuItemLabel ellipsis' variant="body2">Add Post</Typography>
                </Button>
                <Button className="mw0px menuBarInnerItems">
                    <svg className="menuBarInnerIcoClamp2830" width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.31745 3.32481C6.34246 3.99738 4.00813 6.28371 3.29193 9.22642C2.90031 10.8355 2.90389 12.5287 3.29551 14.1378C4.0229 17.1265 6.16258 19.6138 9.03293 20.7728L9.15805 20.8233C10.4002 21.3249 11.8231 20.7208 12.3327 19.4902C12.473 19.1515 12.807 18.9268 13.1761 18.9268H14.2999C17.3564 18.9268 20.0154 16.8499 20.7328 13.9021C21.0891 12.4382 21.0891 10.9113 20.7328 9.44741L20.6387 9.06088C19.9472 6.21958 17.6933 4.01204 14.8209 3.36264L14.4173 3.27141C12.8166 2.90953 11.1543 2.90953 9.55362 3.27141L9.31745 3.32481ZM8.50194 8.36669C8.11716 8.36669 7.80524 8.67616 7.80524 9.05792C7.80524 9.43968 8.11716 9.74916 8.50194 9.74916H14.8884C15.2732 9.74916 15.5851 9.43968 15.5851 9.05792C15.5851 8.67616 15.2732 8.36669 14.8884 8.36669H8.50194ZM9.66312 11.8229C9.27834 11.8229 8.96642 12.1323 8.96642 12.5141C8.96642 12.8958 9.27834 13.2053 9.66312 13.2053H13.7272C14.112 13.2053 14.4239 12.8958 14.4239 12.5141C14.4239 12.1323 14.112 11.8229 13.7272 11.8229H9.66312Z" fill={currentTheme.data.theme.palette?.text?.secondary}></path>
                        </g>
                    </svg>
                    <Typography className='menuItemLabel ellipsis' variant="body2">Messages</Typography>
                </Button>
                <div className="m-0 d-none d-sm-block" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper, width: '100%' }}>
                    <hr className="m-0"></hr>
                </div>
                {props.mode === "horizontal" ?
                    profileSettingContainerHorizontal :
                    profileSettingContainerVertical
                }
            </div>
        </div>
    )
}

export { MenuBarInner }