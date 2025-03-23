import moment from "moment";
import { UserData, UserExperience } from "../models/userData";
import { UserExperienceDetails } from "../models/userExperience";
import { UserLoginRes } from "../models/userLoginRes";

const AppText = {
    loadingMessage: "Hold on a sec.",
    successMessage: "There you go.",
    errorMessage: "Oops! Something went wrong."
}

const userDataStorageKey = 'userLoginData';

const AppValues = {
    defaultLoadingTimer: 500
}

const getTokenFromLocalStorage = (): String => {
    try {
        const userDataStr = localStorage.getItem(userDataStorageKey);
        if (userDataStr) {
            const userData:{ userLoginDetails: UserLoginRes, userProfileDetails?: UserData } | null = JSON.parse(userDataStr);
            if(userData?.userLoginDetails?.token){
                return userData.userLoginDetails.token;
            }
            else return '';
        }
        else return '';
    }
    catch (e) {
        console.log("Error in parsing user login data");
        return '';
    }
}

const getUserDataFromLocalStorage = (): { userLoginDetails: UserLoginRes, userProfileDetails?: UserData } | null => {
    try {
        const userDataStr = localStorage.getItem(userDataStorageKey);
        if (userDataStr) {
            const userLoginData = JSON.parse(userDataStr);
            return userLoginData;
        }
        else return null;
    }
    catch (e) {
        console.log("Error in parsing user login data");
        return null;
    }
}

const updateUserDataInLocalStorage = (data: { userLoginDetails: UserLoginRes, userProfileDetails?: UserData }) => {
    localStorage.clear();
    localStorage.setItem(userDataStorageKey, JSON.stringify(data));
}

const transformUserDataList = (data: UserData[]): UserData[] => {
    return data.map((obj: any) => {
        return transformUserData(obj);
    });
}

const transformUserData = (data: UserData): UserData => {
    let formattedData: UserData = {
        ...data,
        userExperience: data.userExperience ? sortExperienceByDateAndCurrent(data.userExperience) : undefined,
    }
    return formattedData;
}

const sortExperienceByDateAndCurrent = (experienceList: UserExperience[]): UserExperience[] => {
    return experienceList.sort((a: UserExperience, b: UserExperience) => {
        if (a.isCurrentOrganization && !b.isCurrentOrganization) return -1;
        if (!a.isCurrentOrganization && b.isCurrentOrganization) return 1;
        return moment(moment(b.fromDate, "yyyy-mm-dd")).diff(moment(a.fromDate, "yyyy-mm-dd"));
    });
}

const sortExperienceDetailsByDateAndCurrent = (experienceList: UserExperienceDetails[]): UserExperienceDetails[] => {
    return experienceList.sort((a: UserExperienceDetails, b: UserExperienceDetails) => {
        if (a.isCurrentOrganization && !b.isCurrentOrganization) return -1;
        if (!a.isCurrentOrganization && b.isCurrentOrganization) return 1;
        return moment(moment(b.fromDate, "yyyy-mm-dd")).diff(moment(a.fromDate, "yyyy-mm-dd"));
    });
}

export { AppText, AppValues, transformUserDataList, transformUserData, sortExperienceByDateAndCurrent, sortExperienceDetailsByDateAndCurrent, getTokenFromLocalStorage, updateUserDataInLocalStorage, getUserDataFromLocalStorage }