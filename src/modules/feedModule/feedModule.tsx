import { Route, Routes } from "react-router-dom";
import {FeedComponent} from "./feedComponent/feedComponent"

const FeedModule: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<FeedComponent />}></Route>
        </Routes>
    )
}

export default FeedModule;