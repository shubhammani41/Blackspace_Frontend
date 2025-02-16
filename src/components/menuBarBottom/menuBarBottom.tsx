import { Typography } from "@mui/material";
import './menuBarBottom.scss';
import useThemeStore from "../themeToggleBtn/store/themeStore";
import { MenuBarInner } from "./menuBarInner/menuBarInner";

const MenuBarBottom: React.FC = () => {

    const currentTheme = useThemeStore();

    return (
        <div className="menuBarBottomContainer row gx-0">
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-1 col-1">
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-sm-10 col-10">
                <div className="menuBarBottomContainerInner roundedContainer df js as d-md-none" style={{ "backgroundColor": currentTheme.data.theme.palette?.background?.paper }}>
                    <MenuBarInner mode="horizontal"></MenuBarInner>
                </div>
            </div>
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-1 col-1">
            </div>
        </div>
    )
}

export { MenuBarBottom };