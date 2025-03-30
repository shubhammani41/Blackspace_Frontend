import { StoreApi, UseBoundStore, create } from "zustand";
import { UserLoginRes } from "../models/userLoginRes";
import { updateUserDataInLocalStorage } from "../constants/appConstants";
import { UserData } from "../models/userData";

export interface UserLoginState {
    isUserLoggedIn: boolean;
    userDetails?: { userLoginDetails: UserLoginRes, userProfileDetails?: UserData };
}

export interface UserLoginDataStore {
    data: UserLoginState,
    clearUserData: () => void,
    updateUserData: (data: { userLoginDetails: UserLoginRes, userProfileDetails?: UserData }) => void,
}

const logoutState: UserLoginState = { isUserLoggedIn: false };

const useUserLoginDataStore: UseBoundStore<StoreApi<UserLoginDataStore>> = create((set) => ({
    data: logoutState,
    clearUserData: () => set(() => {
        localStorage.clear();
        return { data: logoutState }
    }
    ),
    updateUserData: (data: { userLoginDetails: UserLoginRes, userProfileDetails?: UserData }) => set((state: { data: UserLoginState }) => {
        const loggedInState = (data?.userLoginDetails?.userDetails?.userId && data?.userLoginDetails?.token) ? true : false;
        updateUserDataInLocalStorage(data);
        return { data: { isUserLoggedIn: loggedInState, userDetails: data } }
    }
    ),
}));

export { logoutState };
export default useUserLoginDataStore;