
import React, { useEffect } from 'react';
import "./LoginComponent.scss"
import axiosInstance from '../../../config/axiosConfig';
import { apiConstants } from '../../../constants/apiConstants';
import { UserLoginReq } from '../../../models/userLoginReq';
import { UserLoginRes } from '../../../models/userLoginRes';
declare const window: any;

const LoginComponent = () => {
    useEffect(() => {
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
            const user_json_url = userObj.user_json_url;
            console.log(user_json_url);
            // Do stuff after verification
            //like send the json url to backend for domain verification and user data access and register/login user

        };
        window.phoneEmailReceiver = function (userObj: any) {
            const user_json_url = userObj.user_json_url;
            console.log(user_json_url);
            // Do stuff after verification
            //like send the json url to backend for domain verification and user data access and register/login user
            let tokenRes = getToken(user_json_url, 1);
            tokenRes.then(res=>{
                console.log(res);
            })

        };

        return () => {
            // Cleanup the listener function when the component unmounts
            window.phoneEmailListener = null;
        };
    }, []);

    const getToken = async (userJsonUrl: string, authType: number): Promise<UserLoginRes> => {
        let url = apiConstants.getToken.url;
        let data: UserLoginReq = { userJsonUrl: userJsonUrl, authType: authType }
        let response: UserLoginRes = await axiosInstance.post(url,data);
        return response;
    }

    return (
        <div className='singInButtonContainer'>
            <div className="pe_signin_button" data-client-id="17849261284489939531"></div>
            <div className="pe_verify_email" data-client-id="17849261284489939531"></div>
        </div>
    );
};

export { LoginComponent };
