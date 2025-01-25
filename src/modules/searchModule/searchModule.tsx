import { Route, Routes } from "react-router-dom";
import { SearchComponent } from "./searchComponent/searchComponent"

const HomeModule: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<SearchComponent />}></Route>
        </Routes>
    )
}

export default HomeModule;