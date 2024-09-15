export interface UserLoginReq {
    userJsonUrl: string;
    authType: number;  // 0 for phone, 1 for email
}