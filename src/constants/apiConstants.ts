interface APIConfig {
    type: string;
    access: string;
    url: string;
}

const baseURL: string = "http://blackspace.co.in/api/";

const apiConstants: { [key: string]: APIConfig } = {
    getUserListRandom: {
        "type": "GET",
        "access": "public",
        "url": "public/getRandomUserList"
    }
}

export { baseURL, apiConstants }