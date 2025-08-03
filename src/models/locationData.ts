export interface Country {
    name: string;
    code: string;
    dial_code: string;
}

export interface State {
    name: string;
    state_code: string;
}

export interface CountriesResponse {
    error: boolean,
    msg: string,
    data: Country[]
}

export interface StatesResponse {
    error: boolean;
    msg: string;
    data: {
        name: string;
        iso3: string;
        states: State[];
    }
}

export interface CitiesResponse {
    error: boolean;
    msg: string;
    data: string[];
}