import { StoreApi, UseBoundStore, create } from "zustand";
import { UserLoginRes } from "../models/userLoginRes";

export interface UserLoginState {
    isUserLoggedIn: boolean;
    userDetails?: UserLoginRes;
}

export interface UserLoginDataStore {
    data: UserLoginState,
    clearUserData: () => void,
    updateUserData: (data: UserLoginRes) => void,
}

const logoutState: UserLoginState = { isUserLoggedIn: false };

const useUserLoginDataStore: UseBoundStore<StoreApi<UserLoginDataStore>> = create((set) => ({
    data: logoutState,
    clearUserData: () => set(() => (
        { data: logoutState }
    )),
    updateUserData: (data: UserLoginRes) => set((state: { data: UserLoginState }) => (
        { data: { isUserLoggedIn: true, userDetails: data } }
    )),
}));

export { logoutState };
export default useUserLoginDataStore;