import React from "react";
import styles from './settingsComponent.module.scss';
import { MainLayoutComponent } from "../../../components/layoutComponents/mainLayoutComponent/mainLayoutComponent";
import { ProfileSettingsMenu } from "../../../components/profileSettingsMenu/profileSettingsMenu";

const SettingsComponent: React.FC = () => {

    return (
        <MainLayoutComponent>
            <div className="mb-3">
                {/* settings ui will go here */}
                <ProfileSettingsMenu></ProfileSettingsMenu>
            </div>
        </MainLayoutComponent>
    );
}

export { SettingsComponent };