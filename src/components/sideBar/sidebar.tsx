import { Button } from "@mui/material";
import './sidebar.scss';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useEffect, useState } from "react";
import useThemeStore from "../themeToggleBtn/store/themeStore";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const SideBar: React.FC = () => {

    const currentTheme = useThemeStore();
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const toggleSideBar = () => {
        setOpenSideBar(prev => {
            return !prev
        })
    }
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setOpenSideBar(!isMobile);
    }, [isMobile])

    return (
        <div>
            <div className="df js ac flxCol sideBarVisible menuIconContainer">
                    <Button className="mw0px">
                        <MenuRoundedIcon sx={{ color: openSideBar ? '#ffffff' : 'text.secondary' }} className="sideBarIcoClamp2535" onClick={toggleSideBar}></MenuRoundedIcon>
                    </Button>
            </div>
            {/* <div className="menuIconContainer">
                <MenuRoundedIcon sx={{ color: openSideBar ? '#ffffff' : 'text.secondary' }} className="sideBarIcoClamp2535" onClick={toggleSideBar}></MenuRoundedIcon>
            </div> */}
            <div className={"sideBarContainer df js ac flxCol" + (openSideBar ? " sideBarVisible" : " sideBarHidden")}>
                <div className="df je ac flxCol sidebarInner">
                    <Button className="mw0px">
                        <SettingsOutlinedIcon className="sideBarIcoClamp2535 whiteText"></SettingsOutlinedIcon>
                    </Button>
                    <Button className="mw0px">
                        <SettingsOutlinedIcon className="sideBarIcoClamp2535 whiteText"></SettingsOutlinedIcon>
                    </Button>
                    <Button className="mw0px">
                        <SettingsOutlinedIcon className="sideBarIcoClamp2535 whiteText"></SettingsOutlinedIcon>
                    </Button>
                    <Button className="mw0px">
                        <SettingsOutlinedIcon className="sideBarIcoClamp2535 whiteText"></SettingsOutlinedIcon>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export { SideBar };