import { Typography } from "@mui/material";
import React from "react";
import './settingsComponent.scss';
import useThemeStore from "../../../components/themeToggleBtn/store/themeStore";
import { MenuBarBottom } from "../../../components/menuBarBottom/menuBarBottom";
import { MenuBarInner } from "../../../components/menuBarBottom/menuBarInner/menuBarInner";

const SettingsComponent: React.FC = () => {
    const currentTheme = useThemeStore();

    return (
        <div className="mainContainer">
            <MenuBarBottom></MenuBarBottom>
            <div className="row gx-0 px-2">
                <div className="col-xl-3 col-lg-2 col-sm-1 d-sm-block d-none">
                </div>
                <div className="col-xl-6 col-lg-8 col-sm-10 col-12 mb-2 row gx-0">
                    <div className="col-4 d-none d-md-block">
                        <div className="roundedContainer stickyMenu me-3" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper }}>
                            <div className="px-3 pt-2">
                                <Typography className="headerml" variant="body2">Menu</Typography>
                            </div>
                            <MenuBarInner mode="vertical"></MenuBarInner>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 settingsContainer">
                        <div className="mb-3">
                            {/* settings ui will go here */}
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-2 col-sm-1 d-sm-block d-none">
                </div>
            </div>
        </div>
    );
}

export { SettingsComponent };