
interface UserData {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date | string; // Depending on how dates are handled in your frontend (Date object or string representation)
    profilePictureUrl: string;
    gender: string; // Assuming gender is a string (e.g., 'male', 'female', etc.)
    bio: string;
    githubUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
    websiteUrl: string;
    userName: string;
    skills: any; // JSON string of skills
    countryName: string;
    stateName: string;
    cityName: string;
    positionName: string;
    industryName: string;
    organizationName: string;
    roleId: number;
    countryId: number;
    cityId: number;
    stateId: number;
    positionId: number;
    organizationId: number;
    industryId: number;
    roleName: String;
    experience: number;
}

export type { UserData }