
interface UserData {
    userId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date | string; // Depending on how dates are handled in your frontend (Date object or string representation)
    profilePictureUrl: string;
    gender: string; // Assuming gender is a string (e.g., 'male', 'female', etc.)
    bio: string;
    websiteUrl: string;
    userName: string;
    skills: any; // JSON string of skills
    skillList?: UserSkill[];
    userExperience: any; // JSON string of expeirence
    experienceList: UserExperience[];
    countryName: string;
    stateName: string;
    cityName: string;
    positionName: string;
    industryName: string;
    roleId: number;
    countryId: number;
    cityId: number;
    stateId: number;
    positionId: number;
    industryId: number;
    roleName: String;
    experience: number;
    // need to provide privacy settings before displaying phone and email
    // email: string;
    // phoneNumber: String;
}

interface UserSkill {
    skillId: number,
    skillName: string
}

interface UserExperience {
    organizationId: number,
    organizationName: string,
    fromDate: string
}

interface UserListResponse {
    data: UserData[],
    pageSize: number
    totalElements: number
    totalPages: number
}

export type { UserData, UserSkill, UserListResponse }