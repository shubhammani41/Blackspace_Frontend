import { Route, Routes } from "react-router-dom";
import { SettingsComponent } from "./settingsComponent/settingsComponent";

const HomeModule: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<SettingsComponent />}></Route>
        </Routes>
    )
}

export default HomeModule;