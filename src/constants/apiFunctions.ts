import axiosInstance from "../config/axiosConfig";
import { firebaseAuth } from "../config/firebaseConfig";
import { PostListReponse } from "../models/postData";
import { UserData, UserListResponse } from "../models/userData";
import { UserExperienceDetails } from "../models/userExperience";
import { UserLoginReq } from "../models/userLoginReq";
import { UserLoginRes } from "../models/userLoginRes";
import { apiConstants } from "./apiConstants";
import { sortExperienceDetailsByDateAndCurrent, transformUserData, transformUserDataList } from "./appConstants";

const apiFunctions = {
    verifyFirebaseToken: async (firebaseToken: string): Promise<{ data: UserLoginRes }> => {
        return new Promise<{ data: UserLoginRes }>((resolve, reject) => {
            let url = apiConstants.getToken.url;
            let data: UserLoginReq = { firebaseToken: firebaseToken }
            axiosInstance.post(url, data).then((response: { data: UserLoginRes }) => {
                resolve(response);
            }).catch(err => {
                reject(err);
            });
        })
    },
    fetchUserList: async (pageSize: number, pageNumber: number, searchKeyWord: string = ''): Promise<{ data: UserListResponse }> => {
        return new Promise<{ data: UserListResponse }>((resolve, reject) => {
            let url = "";
            if (searchKeyWord && searchKeyWord !== '') {
                url = apiConstants.searchUserByKeyWord.url + `?pageSize=${pageSize}&pageNumber=${pageNumber}&searchKeyWord=${searchKeyWord}`;
            }
            else {
                url = apiConstants.getUserListRandom.url + `?pageSize=${pageSize}&pageNumber=${pageNumber}`;
            }
            axiosInstance.get(url).then((response: { data: UserListResponse }) => {
                if (response?.data?.data) {
                    response.data.data = transformUserDataList(response.data.data);
                    resolve(response);
                }
                else {
                    reject(response);
                }
            }).catch(err => {
                reject(err);
            });
        });
    },
    fetchUserDetailsByUserName: async (userName: string): Promise<{ data: UserData }> => {
        return new Promise<{ data: UserData }>((resolve, reject) => {
            const url = apiConstants.getUserDataByUserName.url + `?userName=${userName.trim()}`;
            axiosInstance.get(url).then((response: { data: UserData }) => {
                if (response.data) {
                    response.data = transformUserData(response.data);
                    resolve(response);
                }
                else {
                    reject(response);
                }
            }).catch(err => {
                reject(err);
            });
        });
    },
    fetchUserProfileByUserLoginId: async (userLoginId: number): Promise<{ data: UserData }> => {
        return new Promise<{ data: UserData }>((resolve, reject) => {
            const url = apiConstants.getUserProfileByUserLoginId.url + `?userLoginId=${userLoginId}`;
            axiosInstance.get(url).then((response: { data: UserData }) => {
                if (response.data) {
                    response.data = transformUserData(response.data);
                    resolve(response);
                }
                else {
                    reject(response);
                }
            }).catch(err => {
                reject("error");
            });
        });
    },
    fetchUserExperienceDetails: async (userId: number): Promise<{ data: UserExperienceDetails[] }> => {
        return new Promise<{ data: UserExperienceDetails[] }>((resolve, reject) => {
            const url = apiConstants.getUserExperienceByUserId.url + `?userId=${userId}`;
            axiosInstance.get(url).then((response: { data: UserExperienceDetails[] }) => {
                if (response.data) {
                    response.data = sortExperienceDetailsByDateAndCurrent(response.data);
                    resolve(response);
                }
                else {
                    reject(response);
                }
            }).catch(err => {
                reject(err);
            });
        });
    },
    logout: async () => {
        return new Promise((resolve, reject) => {
            firebaseAuth.signOut().then(res => {
                localStorage.clear();
                resolve(res);
            }, rej => {
                reject(rej);
            }).catch(err => {
                reject(err);
            })
        });
    },
    saveBasicDetailsByUserLoginId: async (userData: UserData) => {
        return new Promise<{ data: UserData }>((resolve, reject) => {
            const url = apiConstants.saveBasicDetailsByUserLoginId.url;
            axiosInstance.post(url, userData).then((response: { data: UserData }) => {
                if (response.data) {
                    response.data = transformUserData(response.data);
                    resolve(response);
                }
                else {
                    reject(response);
                }
            }).catch(err => {
                reject(err);
            });
        });
    },
    fetchProfilePublicPosts: async (pageSize: number, pageNumber: number, userId: number): Promise<{ data: PostListReponse }> => {
        return new Promise<{ data: PostListReponse }>((resolve, reject) => {
            let url = "";
            if (userId) {
                url = apiConstants.getProfilePublicPostsByUserId.url + `?pageSize=${pageSize}&pageNumber=${pageNumber}&userId=${userId}`;
                axiosInstance.get(url).then((response: { data: PostListReponse }) => {
                    if (response?.data?.data) {
                        resolve(response);
                    }
                    else {
                        reject(response);
                    }
                }).catch(err => {
                    reject(err);
                });
            }
            else {
                reject("Invalid user id");
            }
        });
    },
    fetchPublciFeed: async (pageSize: number, pageNumber: number): Promise<{ data: PostListReponse }> => {
        return new Promise<{ data: PostListReponse }>((resolve, reject) => {
            let url = "";
            url = apiConstants.getPublicFeed.url + `?pageSize=${pageSize}&pageNumber=${pageNumber}`;
            axiosInstance.get(url).then((response: { data: PostListReponse }) => {
                if (response?.data?.data) {
                    resolve(response);
                }
                else {
                    reject(response);
                }
            }).catch(err => {
                reject(err);
            });
        });
    },
}

export default apiFunctions;