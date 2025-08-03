import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import useAddBasicDetailsDialogStore from "./store/addBasicDetailsDialogStotre"
import useThemeStore from "../themeToggleBtn/store/themeStore";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import apiFunctions from "../../constants/apiFunctions";
import useUserLoginDataStore from "../../store/userLoginDetailsStore";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import styles from './addBasicDetailsDialog.module.scss';
import { useCallback, useEffect, useState } from "react";
import { Country, State } from "../../models/locationData";
import useLoaderStore from "../globalLoader/store/globalLoaderStore";
const AddBasicDetailsDialog: React.FC = () => {
    const addBasicDetailsDialogStore = useAddBasicDetailsDialogStore();
    const userLoginDataStore = useUserLoginDataStore();
    const currentTheme = useThemeStore();
    const saveBasicDetailsByUserLoginId = async () => {
        if (userLoginDataStore.data.userDetails?.userLoginDetails.userDetails?.userId) {
            apiFunctions.saveBasicDetailsByUserLoginId({ firstName: "name" }).then(res => {
                addBasicDetailsDialogStore.closeDialog();
            }).catch(err => {
                console.log(err);
            })
        }
    }
    const loaderStore = useLoaderStore();

    const [countryList, setCountryList] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const fetchCountryList = () => {
        loaderStore.openLoader();
        apiFunctions.fetchCountriesWithCodes().then(res => {
            loaderStore.closeLoader();
            setCountryList(res.data);
        }).catch(err => {
            loaderStore.closeLoader();
            setCountryList([]);
        })
    }
    const countryChange = (event: SelectChangeEvent) => {
        setSelectedCountry(event.target.value);
        setSelectedState('');
        setSelectedCity('');
        setCityList([]);
        fetchStateList(event.target.value);
    };

    const [stateList, setStateList] = useState<State[]>([]);
    const [selectedState, setSelectedState] = useState<string>('');
    const fetchStateList = (state: string) => {
        loaderStore.openLoader();
        apiFunctions.fetchStatesOfCountry(state).then(res => {
            loaderStore.closeLoader();
            setStateList(res.data.states);
        }).catch(err => {
            loaderStore.closeLoader();
            setStateList([]);
        })
    }
    const stateChange = useCallback((event: SelectChangeEvent) => {
        setSelectedState(event.target.value);
        setSelectedCity('');
        fetchCityList(selectedCountry, event.target.value);
    }, [selectedCountry]);

    const [cityList, setCityList] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const fetchCityList = (country: string, state: string) => {
        loaderStore.openLoader();
        apiFunctions.fetchCitiesOfStateOfCountry(country, state).then(res => {
            loaderStore.closeLoader();
            setCityList(res.data);
        }).catch(err => {
            loaderStore.closeLoader();
            setCityList([]);
        })
    }
    const cityChange = (event: SelectChangeEvent) => {
        setSelectedCity(event.target.value);
    };


    useEffect(() => {
        fetchCountryList();
    }, [])
    return <div>
        <Dialog className="fullwidthMobile"
            open={addBasicDetailsDialogStore.data.dialogState}
            onClose={addBasicDetailsDialogStore.closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className={styles.addBasicDetailsDialogBackdrop} />
            <DialogTitle>
                <div className={styles.dialogHeader}>
                    <p className={styles.headerTitle} style={{ color: currentTheme.data.theme.palette?.text?.secondary }}>
                        Mind telling us more about yourself ?
                    </p>
                    <CloseRoundedIcon className={styles.dialogIcoClamp2830} onClick={addBasicDetailsDialogStore.closeDialog}></CloseRoundedIcon>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="userName"
                    label="User Name"
                    variant="filled"
                    placeholder="e.g. myUniqueUserName1"
                    className='w100per thinInput mb-2'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">

                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="firstName"
                    label="First Name"
                    variant="filled"
                    placeholder="e.g. Shubham"
                    className='w100per thinInput mb-2'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">

                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="lastName"
                    label="Last Name"
                    variant="filled"
                    placeholder="e.g. Tripathi"
                    className='w100per thinInput mb-2'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">

                            </InputAdornment>
                        ),
                    }}
                />
                <DesktopDatePicker className="thinInput date mb-2"
                    label="Select Date"
                    defaultValue={moment()}
                    slotProps={{
                        textField: {
                            variant: "filled",
                            fullWidth: true,
                        },
                    }}
                />
                <InputLabel id="gender">Choose gender</InputLabel>
                <Select className="w100per thinInput select mb-2"
                    labelId="gender"
                    label="Gender"
                    variant="filled"
                    defaultValue={''}
                >
                    <MenuItem value={'MALE'}>Male</MenuItem>
                    <MenuItem value={'FEMALE'}>Female</MenuItem>
                </Select>
                <InputLabel id="country">Country</InputLabel>
                <Select className="w100per thinInput select mb-2"
                    labelId="country"
                    label="Country"
                    variant="filled"
                    defaultValue={''}
                    onChange={countryChange}
                >
                    {countryList.map((country, i) => {
                        return <MenuItem key={"country_" + i} value={country.name}>{country.name} ({country.code})</MenuItem>
                    }
                    )}
                </Select>
                <InputLabel id="state">State</InputLabel>
                <Select className="w100per thinInput select mb-2"
                    labelId="state"
                    label="State"
                    variant="filled"
                    defaultValue={''}
                    onChange={stateChange}
                >
                    {stateList.map((state, i) => {
                        return <MenuItem key={"state" + i} value={state.name}>{state.name} ({state.state_code})</MenuItem>
                    }
                    )}
                </Select>
                <InputLabel id="city">City</InputLabel>
                <Select className="w100per thinInput select mb-2"
                    labelId="city"
                    label="City"
                    variant="filled"
                    defaultValue={''}
                    onChange={cityChange}
                >
                    {cityList.map((city, i) => {
                        return <MenuItem key={"city" + i} value={city}>{city}</MenuItem>
                    }
                    )}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" size="small" onClick={saveBasicDetailsByUserLoginId}>
                    Update
                </Button>
                <Button color="primary" size="small" onClick={addBasicDetailsDialogStore.closeDialog}>
                    skip
                </Button>
            </DialogActions>
        </Dialog>
    </div>
}

export { AddBasicDetailsDialog }