export interface UserLoginRes {
    token: string;
    userDetails?:UserLoginDetails;
}

export interface UserLoginDetails {
    userId?: number;
    userPhoneNumber?: string;
    userEmail?: string;
    userProfileId?: number;
}
