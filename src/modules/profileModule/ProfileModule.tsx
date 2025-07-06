import { Route, Routes } from "react-router-dom";
import { ProfileComponent } from "./profileComponent/profileComponent";

const HomeModule: React.FC = () => {
    return (
        <Routes>
            <Route path="/viewProfile/*" element={<ProfileComponent />}></Route>
            <Route path="/profilePosts/*" element={<ProfileComponent postDetailView={true} />}></Route>
        </Routes>
    )
}

export default HomeModule;