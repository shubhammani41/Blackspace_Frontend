import moment from "moment";
import { UserData, UserExperience } from "../models/userData";
import { UserExperienceDetails } from "../models/userExperience";

const AppText = {
    loadingMessage: "Hold on a sec.",
    successMessage: "There you go.",
    errorMessage: "Opps! Something went wrong."
}

const AppValues = {
    defaultLoadingTimer: 500
}

const transformUserDataList = (data: UserData[]): UserData[] => {
    return data.map((obj: any) => {
        return transformUserData(obj);
    });
}

const transformUserData = (data: UserData): UserData => {
    let formattedData: UserData = {
        ...data,
        userExperience: sortExperienceByDateAndCurrent(data.userExperience),
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

export { AppText, AppValues, transformUserDataList, transformUserData, sortExperienceByDateAndCurrent, sortExperienceDetailsByDateAndCurrent }