interface APIConfig {
    type: string;
    access: string;
    url: string;
}
const baseURL: string = "http://localhost:8080";
// const baseURL: string = "https://blackspace.co.in/api/";

const apiConstants: { [key: string]: APIConfig } = {
    getUserListRandom: {
        "type": "GET",
        "access": "public",
        "url": "/public/getRandomUserList"
    },
    searchUserByKeyWord: {
        "type": "GET",
        "access": "public",
        "url": "/public/searchUsersByKeyword"
    },
    getUserDataByUserName: {
        "type": "GET",
        "access": "public",
        "url": "/public/getUserByUserName"
    },
    getUserProfileByUserLoginId: {
        "type": "GET",
        "access": "private",
        "url": "/getUserProfileByUserLoginId"
    },
    getUserExperienceByUserId: {
        "type": "GET",
        "access": "public",
        "url": "/public/getUserExperienceByUserId"
    },
    getToken: {
        "type": "POST",
        "access": "public",
        "url": "/public/login"
    },
    saveBasicDetailsByUserLoginId: {
        "type": "POST",
        "access": "private",
        "url": "/saveBasicDetailsByUserLoginId"
    },
    getProfilePublicPostsByUserId: {
        "type": "PUBLIC",
        "access": "public",
        "url": "/public/getProfilePublicPostsByUserId"
    },
    getPublicFeed: {
        "type": "PUBLIC",
        "access": "public",
        "url": "/public/getPublicFeed"
    }
}

export { baseURL, apiConstants }