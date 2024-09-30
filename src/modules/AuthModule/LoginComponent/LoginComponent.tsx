
import { useEffect, useState } from 'react';
import "./LoginComponent.scss"
import axiosInstance from '../../../config/axiosConfig';
import { apiConstants } from '../../../constants/apiConstants';
import { UserLoginReq } from '../../../models/userLoginReq';
import { UserLoginRes } from '../../../models/userLoginRes';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../../components/themeToggleBtn/store/themeStore';
import { Card, CardContent, SimplePaletteColorOptions } from '@mui/material';
import * as firebaseui from 'firebaseui';
import { firebaseAuth } from '../../../constants/sensitiveConstants';
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';

const LoginComponent = () => {
    const navigate = useNavigate();
    const currentTheme = useThemeStore();
    const [isLoginCardReady, setIsLoginCardReady] = useState<boolean>(false);

    const firebaseUIConfig = {
        signInSuccessUrl: '/home',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: (authResult:any) => {
                // Log the user's token
                authResult.user.getIdToken().then((token:string) => {
                    console.log('User Token:', token);
                    navigate("/home");
                }).catch((error:any) => {
                    console.error('Error fetching token:', error);
                });
                return false; // Prevents redirect
            },
        },
    };

    useEffect(() => {
        localStorage.clear();

        //firebaseui
        const ui = new firebaseui.auth.AuthUI(firebaseAuth);
        ui.start('#firebaseui-auth-container', firebaseUIConfig);

        setTimeout(() => {
            setIsLoginCardReady(true);
        }, 700);

        return () => ui.reset();
    }, []);

    const getToken = async (userJsonUrl: string, authType: number): Promise<{ data: UserLoginRes }> => {
        let url = apiConstants.getToken.url;
        let data: UserLoginReq = { userJsonUrl: userJsonUrl, authType: authType }
        let response: { data: UserLoginRes } = await axiosInstance.post(url, data);
        return response;
    }

    return (<div className='loginCardContainer matrix-card-list'>
        <div className={"matrix-card-container" + (!isLoginCardReady ? " hidden" : "")}>
            <Card className='pb5'>
                <CardContent className="pb3px pt3px">
                    <div className='singInButtonContainer'>
                        <div>
                            <div className='df jc ac fw'>
                                <p className='p0m0 header textwrapNone f100 df jc ac' style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                                    Welcome to Blackspace,
                                </p>
                            </div>
                            <div className='df jc ac fw'>
                                <p className='p0m00150 header f100 df jc ac' style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                                    Sign In.
                                </p>
                            </div>
                        </div>
                        <div id="firebaseui-auth-container"></div>
                        <div className="df jc ac f100">
                            <p className="errorText textwrapNone">
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
