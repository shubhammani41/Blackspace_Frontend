import { Button, SimplePaletteColorOptions, Typography } from "@mui/material";
import './sidebar.scss';
import { useEffect, useState } from "react";
import useThemeStore from "../themeToggleBtn/store/themeStore";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useSideBarStore from "./store/sideBarStore";
import { SideBarInner } from "./sideBarInner/sideBarInner";

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
            <div className={"sideBarContainer df js as flxCol d-md-none" + (openSideBar ? " sideBarVisible" : " sideBarHidden")} style={{ "backgroundColor": currentTheme.data.theme.palette?.background?.paper }}>
                <div className="df jsb ac px-3 pt-3" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper }}>
                    <div>
                        <Typography className="headerl" variant="body2">Menu</Typography>
                    </div>
                    <Button className="mw0px dsBlock closeBtn" onClick={() => closeSideBar()}>
                        <CloseRoundedIcon sx={{color: currentTheme.data.theme.palette?.text?.secondary}} className="sideBarIcoClamp2535"></CloseRoundedIcon>
                    </Button>
                </div>
                <SideBarInner></SideBarInner>
            </div>
        </div>
    )
}

export { SideBar };