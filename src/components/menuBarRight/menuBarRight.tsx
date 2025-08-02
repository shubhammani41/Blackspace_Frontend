
import { Button, Typography } from '@mui/material';
import './menuBarRight.scss';
import AddBoxIcon from '@mui/icons-material/AddBox';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import useThemeStore, { ThemeMode } from '../themeToggleBtn/store/themeStore';
import useUserLoginDataStore from '../../store/userLoginDetailsStore';

export interface MenuBarInnerProps {
    mode: 'vertical' | 'horizontal'
}

const MenuBarRight: React.FC<MenuBarInnerProps> = (props: MenuBarInnerProps) => {
    const currentTheme = useThemeStore();
    const userLoginDataStore = useUserLoginDataStore();
    const profileSettingContainerHorizontal = <>
        {userLoginDataStore?.data.isUserLoggedIn ?
            <></> :
            <Button className="mw0px menuBarInnerItems">
                <AccountCircleRoundedIcon sx={{ color: 'text.secondary' }} className={'menuBarInnerIcoClamp2830'}></AccountCircleRoundedIcon>
                <Typography className='menuItemLabel leftAlignedText' variant="body2">You are offline!</Typography>
            </Button>
        }
    </>

    const profileSettingContainerVertical = <>
        {userLoginDataStore?.data.isUserLoggedIn ?
            <></> :
            <Button className={"mw0px menuBarInnerItems"}>
                <AccountCircleRoundedIcon sx={{ color: 'text.secondary' }} className={'menuBarInnerIcoClamp2830'}></AccountCircleRoundedIcon>
                <Typography className='menuItemLabel leftAlignedText' variant="body2">You are offline!</Typography>
            </Button>
        }
    </>

    return (
        <div className={"menuBarInner" + (props.mode === "horizontal" ? " horizontal" : " vertical")}>
            <div className="df ac jc fw menuBarInnerItemsContainer">
                <Button className="mw0px menuBarInnerItems">
                    <AccountCircleRoundedIcon sx={{ color: 'text.secondary' }} className="menuBarInnerIcoClamp2830"></AccountCircleRoundedIcon>
                    <svg className='online_icon' height="256px" width="256px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.955 31.955" fill="#000000">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path fill='#4dff00' d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3 c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"></path>
                                <path fill='#4dff00' d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416 C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375 C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672 C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137 C17.523,1.94,14.328,1.906,11.394,2.883z"></path>
                                <circle fill='#4dff00' cx="15.979" cy="15.977" r="6.117"></circle>
                            </g>
                        </g>
                    </svg>
                    <Typography className='menuItemLabel ellipsis' variant="body2">shubhamTargaryen</Typography>
                </Button>
                <Button className="mw0px menuBarInnerItems">
                    <AccountCircleRoundedIcon sx={{ color: 'text.secondary' }} className="menuBarInnerIcoClamp2830"></AccountCircleRoundedIcon>
                    <svg className='online_icon' height="256px" width="256px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.955 31.955" fill="#000000">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path fill='#4dff00' d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3 c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"></path>
                                <path fill='#4dff00' d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416 C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375 C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672 C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137 C17.523,1.94,14.328,1.906,11.394,2.883z"></path>
                                <circle fill='#4dff00' cx="15.979" cy="15.977" r="6.117"></circle>
                            </g>
                        </g>
                    </svg>
                    <Typography className='menuItemLabel ellipsis' variant="h5">shivanshUchiha</Typography>
                </Button>
                <Button className="mw0px menuBarInnerItems">
                    <AccountCircleRoundedIcon sx={{ color: 'text.secondary' }} className="menuBarInnerIcoClamp2830"></AccountCircleRoundedIcon>
                    <svg className='online_icon' height="256px" width="256px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.955 31.955" fill="#000000">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path fill='#4dff00' d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3 c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"></path>
                                <path fill='#4dff00' d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416 C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375 C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672 C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137 C17.523,1.94,14.328,1.906,11.394,2.883z"></path>
                                <circle fill='#4dff00' cx="15.979" cy="15.977" r="6.117"></circle>
                            </g>
                        </g>
                    </svg>
                    <Typography className='menuItemLabel ellipsis' variant="body2">pushspamUzumaki</Typography>
                </Button>
                <div className="m-0" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper, width: '100%' }}>
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

export { MenuBarRight }