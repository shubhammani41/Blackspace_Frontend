import React from "react";
import './settingsComponent.scss';
import useThemeStore from "../../../components/themeToggleBtn/store/themeStore";
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