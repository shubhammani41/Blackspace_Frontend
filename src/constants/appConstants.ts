import moment from "moment";
import { UserData, UserExperience } from "../models/userData";
import { UserExperienceDetails } from "../models/userExperience";
import { UserLoginRes } from "../models/userLoginRes";

const AppText = {
    loadingMessage: "Hold on a sec.",
    successMessage: "There you go.",
    errorMessage: "Opps! Something went wrong."
}

const userLoginDataStorageKey = 'userLoginData';

const AppValues = {
    defaultLoadingTimer: 500
}

const getTokenFromLocalStorage = (): String => {
    try {
        const userLoginDataStr = localStorage.getItem(userLoginDataStorageKey);
        if (userLoginDataStr) {
            const userLoginData = JSON.parse(userLoginDataStr);
            return userLoginData.token;
        }
        else return '';
    }
    catch (e) {
        console.log("Error in parsing user login data");
        return '';
    }
}

const getUserLoginDetailsFromLocalStorage = (): UserLoginRes | null => {
    try {
        const userLoginDataStr = localStorage.getItem(userLoginDataStorageKey);
        if (userLoginDataStr) {
            const userLoginData = JSON.parse(userLoginDataStr);
            return userLoginData;
        }
        else return null;
    }
    catch (e) {
        console.log("Error in parsing user login data");
        return null;
    }
}

const updateUserLoginDataInLocalStorage = (data: UserLoginRes) => {
    localStorage.clear();
    localStorage.setItem(userLoginDataStorageKey, JSON.stringify(data));
}

const transformUserDataList = (data: UserData[]): UserData[] => {
    return data.map((obj: any) => {
        return transformUserData(obj);
    });
}

const transformUserData = (data: UserData): UserData => {
    let formattedData: UserData = {
        ...data,
        userExperience: data.userExperience?sortExperienceByDateAndCurrent(data.userExperience):undefined,
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

export { AppText, AppValues, transformUserDataList, transformUserData, sortExperienceByDateAndCurrent, sortExperienceDetailsByDateAndCurrent, getTokenFromLocalStorage, updateUserLoginDataInLocalStorage, getUserLoginDetailsFromLocalStorage }