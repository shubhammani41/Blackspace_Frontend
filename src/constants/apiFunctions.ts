import axiosInstance from "../config/axiosConfig";
import { UserListResponse } from "../models/userData";
import { UserLoginReq } from "../models/userLoginReq";
import { UserLoginRes } from "../models/userLoginRes";
import { apiConstants } from "./apiConstants";
import { firebaseAuth } from "./sensitiveConstants";

const apiFunctions = {
    verifyFirebaseToken: async (firebaseToken: string): Promise<{ data: UserLoginRes }> => {
        let url = apiConstants.getToken.url;
        let data: UserLoginReq = { firebaseToken: firebaseToken }
        let response: { data: UserLoginRes } = await axiosInstance.post(url, data);
        return response;
    },
    fetchUserList: async (pageSize: number, pageNumber: number, searchKeyWord: string = ''): Promise<{ data: UserListResponse }> => {
        let url = "";
        if (searchKeyWord && searchKeyWord !== '') {
            url = apiConstants.searchUserByKeyWord.url + `?pageSize=${pageSize}&pageNumber=${pageNumber}&searchKeyWord=${searchKeyWord}`;
        }
        else {
            url = apiConstants.getUserListRandom.url + `?pageSize=${pageSize}&pageNumber=${pageNumber}`;
        }
        let response: any = await axiosInstance.get(url);
        return response
    },
    logout: async () => {
        return new Promise(async (resolve, reject) => {
            await firebaseAuth.signOut().then(res => {
                localStorage.clear();
                resolve(res);
            }, rej => {
                reject(rej);
            }).catch(err => {
                reject(err);
            })
        });
    }
}

export default apiFunctions;