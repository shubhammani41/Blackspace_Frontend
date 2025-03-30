
import { useEffect, useState } from 'react';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import "./LoginUIComponent.scss";
import useUserLoginDataStore from '../../store/userLoginDetailsStore';
import apiFunctions from '../../constants/apiFunctions';
import useAddBasicDetailsDialogStore from '../addBasicDetailsDialog/store/addBasicDetailsDialogStotre';

export interface LoginUIComponentProp {
    onSuccess?: (res?: any) => void;
    onFail?: (err?: any) => void;
    redirectURL?: string;
}

const LoginUIComponent: React.FC<LoginUIComponentProp> = (props: LoginUIComponentProp) => {
    const [isLoginCardReady, setIsLoginCardReady] = useState<boolean>(false);
    const userLoginDataStore = useUserLoginDataStore();
    const navigate = useNavigate();
    const addBasicDetailsDialogStore = useAddBasicDetailsDialogStore();

    const firebaseUIConfig = {
        signInSuccessUrl: props?.redirectURL ?? '',
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: (authResult: any) => {
                // Log the user's token
                authResult.user.getIdToken().then((token: string) => {
                    apiFunctions.verifyFirebaseToken(token)
                        .then(res => {
                            if (res?.data?.userDetails?.userId && res?.data?.token) {
                                userLoginDataStore.updateUserData({ userLoginDetails: res.data, userProfileDetails: userLoginDataStore?.data?.userDetails?.userProfileDetails });
                                if (res.data.userDetails?.userId) {
                                    apiFunctions.fetchUserProfileByUserLoginId(res.data.userDetails.userId).then(response => {
                                        if (response?.data?.userId && userLoginDataStore?.data?.userDetails) {
                                            userLoginDataStore.updateUserData({ userProfileDetails: response.data, ...userLoginDataStore.data.userDetails })
                                        }
                                        else {
                                            addBasicDetailsDialogStore.openDialog();
                                            if (props?.onSuccess) {
                                                props.onSuccess(res);
                                            }
                                            if (props?.redirectURL) {
                                                navigate(props.redirectURL);
                                            }
                                        }
                                    }, rej => {
                                        if (rej === 'error') {
                                            userLoginDataStore.clearUserData();
                                            if (props?.onFail) {
                                                props.onFail(res);
                                            }
                                        }
                                        else {
                                            addBasicDetailsDialogStore.openDialog();
                                            if (props?.onSuccess) {
                                                props.onSuccess(res);
                                            }
                                            if (props?.redirectURL) {
                                                navigate(props.redirectURL);
                                            }
                                        }
                                    })
                                }
                            }
                            else {
                                if (props?.onFail) {
                                    props.onFail(res);
                                }
                            }
                        }, rej => {
                            if (props?.onFail) {
                                props.onFail(rej);
                            }
                        }).catch(err => {
                            if (props?.onFail) {
                                props.onFail(err);
                            }
                        })
                }).catch((error: any) => {
                    console.error('Error fetching token:', error);
                });
                return false; // Prevents redirect
            },
            signInFailure: (error: any) => {
                // Handle failed sign-in attempts
                console.error('Sign-in failed:', error);
                return Promise.resolve();
            },
        },
    };

    useEffect(() => {
        //firebaseui
        const ui = firebaseui.auth.AuthUI?.getInstance() ?? new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', firebaseUIConfig);
        setTimeout(() => {
            setIsLoginCardReady(true);
        }, 700);

        return () => ui.reset();
    }, []);

    return (
        <div className={"loginUIContainer " + (!isLoginCardReady ? " hidden" : "")}>
            <div className='singInButtonContainer'>
                <div id="firebaseui-auth-container"></div>
                <div className="df jc ac f100">
                    <p className="errorText textwrapNone">
                        Phone auth is temporarily disabled.
                    </p>
                </div>
            </div>
        </div>
    );
};

export { LoginUIComponent };
