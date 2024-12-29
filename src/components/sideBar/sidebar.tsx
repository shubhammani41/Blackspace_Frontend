import { Button, SimplePaletteColorOptions, Typography } from "@mui/material";
import './sidebar.scss';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useEffect, useState } from "react";
import useThemeStore from "../themeToggleBtn/store/themeStore";
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useSideBarStore from "./store/sideBarStore";

const SideBar: React.FC = () => {

    const currentTheme = useThemeStore();
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const sideBarStore = useSideBarStore();

    useEffect(() => {
        if (sideBarStore.data.sideBarState) {
            setOpenSideBar(true);
        }
        else {
            setOpenSideBar(false);
        }
    }, [sideBarStore])

    const closeSideBar = () => {
        sideBarStore.closeSideBar();
    }

    return (
        <div>
            <div className={"sideBarContainer df js as flxCol" + (openSideBar ? " sideBarVisible" : " sideBarHidden")} style={{ "backgroundColor": (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                <div className="df jc ac" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper }}>
                    <Button className="mw0px dsBlock closeBtn" onClick={() => closeSideBar()}>
                        <CloseRoundedIcon sx={{color: currentTheme.data.theme.palette?.text?.secondary}} className="sideBarIcoClamp2535"></CloseRoundedIcon>
                    </Button>
                </div>
                <div className="sidebarInner">
                    <div className="df ac jc fw flxcol sideBarInnerItemsContainer">
                        <div className="df jc ac flxCol sideBarInnerItems">
                            <Button className="mw0px dsBlock">
                                <DnsRoundedIcon className="sideBarIcoClamp2535 whiteText"></DnsRoundedIcon>
                            </Button>
                            <Typography sx={{ color: '#ffffff' }} variant="body2">Profiles</Typography>
                        </div>
                        <div className="df jc ac flxCol sideBarInnerItems">
                            <Button className="mw0px dsBlock">
                                <PushPinRoundedIcon className="sideBarIcoClamp2535 whiteText"></PushPinRoundedIcon>
                            </Button>
                            <Typography sx={{ color: '#ffffff' }} variant="body2">Pins</Typography>
                        </div>
                        <div className="df jc ac flxCol sideBarInnerItems">
                            <Button className="mw0px dsBlock">
                                <ArticleRoundedIcon className="sideBarIcoClamp2535 whiteText"></ArticleRoundedIcon>
                            </Button>
                            <Typography sx={{ color: '#ffffff' }} variant="body2">Posts</Typography>
                        </div>
                        <div className="df jc ac flxCol sideBarInnerItems">
                            <Button className="mw0px dsBlock">
                                <EmailRoundedIcon className="sideBarIcoClamp2535 whiteText"></EmailRoundedIcon>
                            </Button>
                            <Typography sx={{ color: '#ffffff' }} variant="body2">Mail</Typography>
                        </div>
                        <div className="df jc ac flxCol sideBarInnerItems">
                            <Button className="mw0px dsBlock">
                                <SettingsOutlinedIcon className="sideBarIcoClamp2535 whiteText"></SettingsOutlinedIcon>
                            </Button>
                            <Typography sx={{ color: '#ffffff' }} variant="body2">Settings</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { SideBar };