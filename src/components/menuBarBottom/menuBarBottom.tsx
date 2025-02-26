import { Typography } from "@mui/material";
import './menuBarBottom.scss';
import useThemeStore from "../themeToggleBtn/store/themeStore";
import { MenuBarInner } from "./menuBarInner/menuBarInner";

const MenuBarBottom: React.FC = () => {

    const currentTheme = useThemeStore();

    return (
        <div className="menuBarBottomContainer row gx-0 px-2">
            <div className="col-lg-2 col-sm-1 d-sm-block d-none">
            </div>
            <div className="col-lg-8 col-sm-10 col-12">
                <div className="menuBarBottomContainerInner df js as d-md-none" style={{ "backgroundColor": currentTheme.data.theme.palette?.background?.paper }}>
                    <MenuBarInner mode="horizontal"></MenuBarInner>
                </div>
            </div>
            <div className="col-lg-2 col-sm-1 d-sm-block d-none">
            </div>
        </div>
    )
}

export { MenuBarBottom };