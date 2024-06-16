interface APIConfig {
    type: string;
    access: string;
    url: string;
}
const baseURL: string = "http://localhost:8080/";
// const baseURL: string = "http://blackspace.co.in/api/";

const apiConstants: { [key: string]: APIConfig } = {
    getUserListRandom: {
        "type": "GET",
        "access": "public",
        "url": "public/getRandomUserList"
    },
    searchUserByKeyWord:{
        "type": "GET",
        "access": "public",
        "url": "public/searchUsersByKeyword"
    }
}

export { baseURL, apiConstants }