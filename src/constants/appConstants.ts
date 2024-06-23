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
        return { ...obj, skills: JSON.parse(obj.skills).map((sk: any) => sk.skill_name).join(",") }
    });

}

export { AppText, AppValues, transformUserData }