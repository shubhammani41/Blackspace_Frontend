import { UserData } from "../models/userData";

const AppText = {
    loadingMessage: "Hold on a sec.",
    successMessage: "There you go.",
    errorMessage: "Opps! Something went wrong."
}

const AppValues = {
    defaultLoadingTimer: 500
}

const transformUserData = (data: UserData[]): UserData[] => {
    return data.map((obj: any) => {
        let formattedData: UserData = {
            ...obj,
            skillList: JSON.parse(obj.skills).map((skill: any) => ({ skillId: skill.skill_id, skillName: skill.skill_name })),
            experienceList: JSON.parse(obj.userExperience).map((experience: any) => ({ organizationId: experience.organization_id, organizationName: experience.organization_name, fromDate: experience.from_date })),
        }
        return formattedData;
    });

}

export { AppText, AppValues, transformUserData }