interface UserProfile {
    userId?: number;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date | string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    profilePictureUrl?: string;
    bio?: string;
    websiteUrl?: string;
    userName?: string;
    countryName?: string;
    stateName?: string;
    cityName?: string;
    roleId?: number;
    positionId?: number;
    skillIds?: string;
    isPhonePrivate?: boolean;
    isEmailPrivate?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    updatedBy?: number;
}

interface UserLogin {
    userId?: number;
    userProfileId?: number;
    phoneNumber?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
    updatedBy?: number;
    isDeactivated?: boolean;
    deactivatedAt?: Date;
}

interface UserData extends UserProfile {
    userId?: number;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date | string;
    profilePictureUrl?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    bio?: string;
    websiteUrl?: string;
    userName?: string;
    skills?: UserSkill[];
    userExperience?: UserExperience[];
    positionName?: string;
    industryName?: string;
    roleId?: number;
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

export type { UserLogin, UserProfile, UserData, UserSkill, UserExperience, UserListResponse }