
interface UserData {
    userId?: number;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date | string; // Depending on how dates are handled in your frontend (Date object or string representation)
    profilePictureUrl?: string;
    gender?: string; // Assuming gender is a string (e.g., 'male', 'female', etc.)
    bio?: string;
    websiteUrl?: string;
    userName?: string;
    skills?: UserSkill[];
    userExperience?: UserExperience[];
    countryName?: string;
    stateName?: string;
    cityName?: string;
    positionName?: string;
    industryName?: string;
    roleId?: number;
    countryId?: number;
    cityId?: number;
    stateId?: number;
    positionId?: number;
    industryId?: number;
    roleName?: String;
    experience?: number;
    email?: string;
    phoneNumber?: String;
    isEmailPrivate?: boolean;
    isPhonePrivate?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    updatedBy?: number;
    userProfileCreatedAt?: Date | string;
    userProfileUpdatedAt?: Date | string;
    userProfileUpdatedBy?: number;
}

interface UserSkill {
    skillId: number,
    skillName: string
}

interface UserExperience {
    organizationId?: number,
    organizationName?: string,
    fromDate: string,
    isCurrentOrganization: boolean;
}

interface UserListResponse {
    data: UserData[],
    pageSize: number
    totalElements: number
    totalPages: number
}

export type { UserData, UserSkill, UserExperience, UserListResponse }