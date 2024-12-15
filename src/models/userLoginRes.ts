export interface UserLoginRes {
    token: string;
    userDetails?: UserLoginDetails;
}

export interface UserLoginDetails {
    userId: number;
    userProfileId?: number;
    phoneNumber?: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
    updated_by?: number;
    isDeactivated?: boolean;
    deactivatedAt?: string;
}
