
import { LoginUIComponent } from "../../../components/loginUIComponent/LoginUIComponent";
import "./LoginComponent.scss";
import { Card, CardContent } from '@mui/material';
import LogoTr from '../../../assets/images/logoTr.png';
import useThemeStore, { ThemeMode } from "../../../components/themeToggleBtn/store/themeStore";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const onFail = (err: any) => {
        console.log(err);
    }
    const currentTheme = useThemeStore();
    const themeMode = useMemo<string | null>(() => {
        return currentTheme?.data?.mode ? currentTheme.data.mode : null;
    }, [currentTheme]);
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/home");
    }
    return (
        <div>
            <div className='row gx-0'>
                <div className="col-xxl-4 col-xl-4 col-lg-3 col-sm-2 col-1">
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-sm-8 col-10 logoContainer">
                    <img src={LogoTr} className={"loginLogoIco " + ((themeMode === ThemeMode.Dark || themeMode === ThemeMode.Blue || themeMode === ThemeMode.Red) ? 'logoIcoInvert' : '')}
                        onClick={navigateToHome}></img>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-3 col-sm-2 col-1">
                </div>
            </div>
            <div className='row gx-0'>
                <div className="col-xxl-4 col-xl-4 col-lg-3 col-sm-2 col-1">
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-sm-8 col-10 loginCardContainer">
                    <Card className='pb5 roundedContainer'>
                        <CardContent className="pb3px pt3px">
                            <LoginUIComponent onFail={onFail} redirectURL="/home"></LoginUIComponent>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-3 col-sm-2 col-1">
                </div>
            </div>
        </div>
    );
};

export { LoginComponent };
