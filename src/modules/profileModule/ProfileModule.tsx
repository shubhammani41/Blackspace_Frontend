import { Route, Routes } from "react-router-dom";
import { ProfileComponent } from "./profileComponent/profileComponent"
import { ProfileSettingsComponent } from "./profileSettings/profileSettings";

const HomeModule: React.FC = () => {
    return (
        <Routes>
            <Route path="/viewProfile/:userName" element={<ProfileComponent />}></Route>
            <Route path="/profileSettings" element={<ProfileSettingsComponent />}></Route>
        </Routes>
    )
}

export default HomeModule;