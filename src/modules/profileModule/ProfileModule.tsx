import { Route, Routes } from "react-router-dom";
import { ProfileComponent } from "./profileComponent/profileComponent"

const HomeModule: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<ProfileComponent />}></Route>
        </Routes>
    )
}

export default HomeModule;