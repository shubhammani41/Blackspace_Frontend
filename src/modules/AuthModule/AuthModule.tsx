import { Route, Routes } from "react-router-dom";
import { LoginComponent } from "./loginComponent/loginComponent";

const AuthModule: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginComponent />}></Route>
        </Routes>
    )
}

export default AuthModule;