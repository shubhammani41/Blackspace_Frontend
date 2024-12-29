import { UserLogin } from "./userData";

export interface UserLoginRes {
    token: string;
    userDetails?: UserLogin;
}
