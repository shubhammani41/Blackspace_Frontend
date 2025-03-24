import { Typography } from "@mui/material";
import React from "react";
import './settingsComponent.scss';
import useThemeStore from "../../../components/themeToggleBtn/store/themeStore";
import { MenuBarBottom } from "../../../components/menuBarBottom/menuBarBottom";
import { MenuBarInner } from "../../../components/menuBarBottom/menuBarInner/menuBarInner";
import { MainLayoutComponent } from "../../../components/layoutComponents/mainLayoutComponent/mainLayoutComponent";

const SettingsComponent: React.FC = () => {
    const currentTheme = useThemeStore();

    return (
        <MainLayoutComponent>
            <div className="mb-3">
                {/* settings ui will go here */}
            </div>
        </MainLayoutComponent>
    );
}

export { SettingsComponent };