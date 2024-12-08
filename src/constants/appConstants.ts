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

// TODO: Need to move below transformation functions on backend
const transformUserDataList = (data: UserData[]): UserData[] => {
    return data.map((obj: any) => {
        return transformUserData(obj);
    });
}

const transformUserData = (data: UserData): UserData => {
    let formattedData: UserData = {
        ...data,
        skillList: JSON.parse(data.skills).map((skill: any) => (
            {
                skillId: skill.skill_id,
                skillName: skill.skill_name
            }
        )),
        experienceList: sortExperienceByDateAndCurrent(
            JSON.parse(data.userExperience).map((experience: any) => (
                {
                    organizationId: experience.organization_id,
                    organizationName: experience.organization_name,
                    fromDate: experience.from_date,
                    isCurrentOrganization: experience.is_current_organization
                }
            ))
        ),
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