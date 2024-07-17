import { Button, Typography } from "@mui/material";
import './sidebar.scss';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useState } from "react";
import useThemeStore from "../themeToggleBtn/store/themeStore";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import Person4Icon from '@mui/icons-material/Person4';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

const SideBar: React.FC = () => {

    const currentTheme = useThemeStore();
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const toggleSideBar = () => {
        setOpenSideBar(prev => {
            return !prev
        })
    }

    return (
        <div>
            <div className="df js ac flxCol sideBarVisible menuIconContainer">
                <Button className="mw0px">
                    <MenuRoundedIcon sx={{ color: openSideBar ? '#ffffff' : 'text.secondary' }} className="sideBarIcoClamp2535" onClick={toggleSideBar}></MenuRoundedIcon>
                </Button>
            </div>
            <div className={"sideBarContainer df js ac flxCol" + (openSideBar ? " sideBarVisible" : " sideBarHidden")}>
                <div className="df js ac flxCol sidebarInner">
                    <div className="df jc ac flxCol">
                        <Button className="mw0px dsBlock">
                            <DnsRoundedIcon className="sideBarIcoClamp2535 whiteText"></DnsRoundedIcon>
                        </Button>
                        <Typography sx={{ color: '#ffffff' }} variant="body2">Profiles</Typography>
                    </div>
                    <div className="df jc ac flxCol">
                        <Button className="mw0px dsBlock">
                            <PushPinRoundedIcon className="sideBarIcoClamp2535 whiteText"></PushPinRoundedIcon>
                        </Button>
                        <Typography sx={{ color: '#ffffff' }} variant="body2">Pins</Typography>
                    </div>
                    <div className="df jc ac flxCol">
                        <Button className="mw0px dsBlock">
                            <ArticleRoundedIcon className="sideBarIcoClamp2535 whiteText"></ArticleRoundedIcon>
                        </Button>
                        <Typography sx={{ color: '#ffffff' }} variant="body2">Posts</Typography>
                    </div>
                    <div className="df jc ac flxCol">
                        <Button className="mw0px dsBlock">
                            <EmailRoundedIcon className="sideBarIcoClamp2535 whiteText"></EmailRoundedIcon>
                        </Button>
                        <Typography sx={{ color: '#ffffff' }} variant="body2">Mail</Typography>
                    </div>
                    <div className="df jc ac flxCol">
                        <Button className="mw0px dsBlock">
                            <SettingsOutlinedIcon className="sideBarIcoClamp2535 whiteText"></SettingsOutlinedIcon>
                        </Button>
                        <Typography sx={{ color: '#ffffff' }} variant="body2">Settings</Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { SideBar };