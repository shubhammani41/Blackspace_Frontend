
import { useEffect } from 'react';
import "./LoginComponent.scss"
import axiosInstance from '../../../config/axiosConfig';
import { apiConstants } from '../../../constants/apiConstants';
import { UserLoginReq } from '../../../models/userLoginReq';
import { UserLoginRes } from '../../../models/userLoginRes';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../../components/themeToggleBtn/store/themeStore';
import { Card, CardContent, SimplePaletteColorOptions } from '@mui/material';
import { sensitiveConstants } from '../../../constants/sensitiveConstants';
declare const window: any;

const LoginComponent = () => {
    const navigate = useNavigate();
    const currentTheme = useThemeStore();
    useEffect(() => {
        localStorage.clear();
        // Load the external script
        const phoneSignInScript = document.createElement('script');
        phoneSignInScript.src = "https://www.phone.email/sign_in_button_v1.js";
        phoneSignInScript.async = true;
        document.querySelector('.pe_signin_button')?.appendChild(phoneSignInScript);

        const emailSignInScript = document.createElement('script');
        emailSignInScript.src = "https://www.phone.email/verify_email_v1.js";
        emailSignInScript.async = true;
        document.querySelector('.pe_verify_email')?.appendChild(emailSignInScript);

        // Define the listener function
        window.phoneEmailListener = function (userObj: any) {
            //temporarily disable phone auth
            return false;
            const user_json_url = userObj.user_json_url;
            console.log(user_json_url);
            // Do stuff after verification
            //like send the json url to backend for domain verification and user data access and register/login user
            let tokenRes = getToken(user_json_url, 0);
            tokenRes.then((res: { data: UserLoginRes }) => {
                console.log(res)
                if (res && res.data && res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    navigate("/home");
                }
            })

        };
        window.phoneEmailReceiver = function (userObj: any) {
            const user_json_url = userObj.user_json_url;
            console.log(user_json_url);
            // Do stuff after verification
            //like send the json url to backend for domain verification and user data access and register/login user
            let tokenRes = getToken(user_json_url, 1);
            tokenRes.then((res: { data: UserLoginRes }) => {
                console.log(res)
                if (res && res.data && res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    navigate("/home");
                }
            })

        };

        return () => {
            // Cleanup the listener function when the component unmounts
            window.phoneEmailListener = null;
        };
    }, []);

    const getToken = async (userJsonUrl: string, authType: number): Promise<{ data: UserLoginRes }> => {
        let url = apiConstants.getToken.url;
        let data: UserLoginReq = { userJsonUrl: userJsonUrl, authType: authType }
        let response: { data: UserLoginRes } = await axiosInstance.post(url, data);
        return response;
    }

    return (
        <div className='loginCardContainer matrix-card-list'>
            <div className="matrix-card-container">
                <Card>
                    <CardContent className="pb3px pt3px">
                        <div className='singInButtonContainer'>
                            <div>
                                <div className='df jc ac fw'>
                                    <p className='p0m0 header f100 df jc ac' style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                                        Welcome to Blackspace,
                                    </p>
                                </div>
                                <div className='df jc ac fw'>
                                    <p className='p0m00150 header f100 df jc ac' style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                                        Sign In.
                                    </p>
                                </div>
                            </div>
                            <div className="pe_signin_button" data-client-id={sensitiveConstants.phoneEmaildataClientId}></div>
                            <div className="pe_verify_email" data-client-id={sensitiveConstants.phoneEmaildataClientId}></div>
                            <div className="df jc ac f100">
                                <p className="errorText">
                                    Phone auth is temporarily disabled.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export { LoginComponent };
