import { Route, Routes } from "react-router-dom";
import { HomeComponent } from "./homeComponent/homeComponent"

const HomeModule: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeComponent />}></Route>
        </Routes>
    )
}

export default HomeModule;