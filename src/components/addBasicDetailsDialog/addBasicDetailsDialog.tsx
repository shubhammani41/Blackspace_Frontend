import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import useAddBasicDetailsDialogStore from "./store/addBasicDetailsDialogStotre"
import useThemeStore from "../themeToggleBtn/store/themeStore";
import moment, { Moment } from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import apiFunctions from "../../constants/apiFunctions";
import useUserLoginDataStore from "../../store/userLoginDetailsStore";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import styles from './addBasicDetailsDialog.module.scss';
import { useCallback, useEffect, useState } from "react";
import { Country, State } from "../../models/locationData";
import useLoaderStore from "../globalLoader/store/globalLoaderStore";
import { useForm } from "react-hook-form";
import { UserData } from "../../models/userData";
const AddBasicDetailsDialog: React.FC = () => {
    const addBasicDetailsDialogStore = useAddBasicDetailsDialogStore();
    const userLoginDataStore = useUserLoginDataStore();
    const currentTheme = useThemeStore();
    const defaultDate: Moment | null = moment();
    const {
        register: basicDetailForm,
        getValues: getBasicDetailFormValues,
        setValue: setBasicDetailFormValues,
        formState: { errors: basicDetailFormErrors },
        trigger: basicDetailFormTrigger } = useForm({
            mode: "onChange",
            defaultValues: {
                'userName': '',
                'firstName': '',
                'lastName': '',
                'gender': '',
                'countryName': '',
                'stateName': '',
                'cityName': '',
                'dob': new Date()
            }
        });
    const saveBasicDetailsByUserLoginId = useCallback(async () => {
        if (Object.keys(basicDetailFormErrors).length === 0) {
            const gender = getBasicDetailFormValues().gender as 'MALE' | 'FEMALE' | 'OTHER' | undefined;
            const payload: UserData = { ...getBasicDetailFormValues(), gender: gender, userId: userLoginDataStore.data.userDetails?.userLoginDetails.userDetails?.userId }
            if (userLoginDataStore.data.userDetails?.userLoginDetails.userDetails?.userId) {
                apiFunctions.saveBasicDetailsByUserLoginId(payload).then(res => {
                    userLoginDataStore.updateUserData({
                        userLoginDetails: userLoginDataStore.data.userDetails?.userLoginDetails!,
                        userProfileDetails: res.data
                    })
                    addBasicDetailsDialogStore.closeDialog();
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }, [getBasicDetailFormValues, basicDetailFormErrors, userLoginDataStore.data, basicDetailFormTrigger])
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
        basicDetailFormTrigger();
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
                    required
                    {...basicDetailForm("userName", { required: "Username is required" })}
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
                    required
                    {...basicDetailForm("firstName", { required: "First name is required" })}
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
                    required
                    {...basicDetailForm("lastName", { required: "Last name is required" })}
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
                <input
                    required
                    type="hidden"
                    {...basicDetailForm("dob", { required: "Date of birth is required" })}
                />
                <DesktopDatePicker className="thinInput date mb-2"
                    label="Select Date of birth *"
                    defaultValue={moment()}
                    onChange={(date: Moment | null) => { setBasicDetailFormValues("dob", date?.toDate() ?? new Date(), { shouldValidate: true }); basicDetailFormTrigger("dob"); }}
                    slotProps={{
                        textField: {
                            variant: "filled",
                            fullWidth: true,
                        },
                    }}
                />
                <InputLabel id="gender">Choose gender *</InputLabel>
                <input
                    required
                    type="hidden"
                    {...basicDetailForm("gender", { required: "Gender is required" })}
                />
                <Select className="w100per thinInput select mb-2"
                    {...basicDetailForm("gender", { required: "Gender is required" })}
                    onChange={(event: SelectChangeEvent) => { setBasicDetailFormValues("gender", event.target.value, { shouldValidate: true }); basicDetailFormTrigger("gender"); }}
                    labelId="gender"
                    label="Gender"
                    variant="filled"
                    defaultValue={''}
                >
                    <MenuItem value={'MALE'}>Male</MenuItem>
                    <MenuItem value={'FEMALE'}>Female</MenuItem>
                </Select>
                <input
                    required
                    type="hidden"
                    {...basicDetailForm("countryName", { required: "Country name is required" })}
                />
                <InputLabel id="country">Country *</InputLabel>
                <Select className="w100per thinInput select mb-2"
                    {...basicDetailForm("countryName", { required: "Country name is required" })}
                    onChange={(event: SelectChangeEvent) => { countryChange(event); setBasicDetailFormValues("countryName", event.target.value, { shouldValidate: true }); basicDetailFormTrigger("countryName"); }}
                    labelId="country"
                    label="Country"
                    variant="filled"
                    defaultValue={''}
                >
                    {countryList.map((country, i) => {
                        return <MenuItem key={"country_" + i} value={country.name}>{country.name} ({country.code})</MenuItem>
                    }
                    )}
                </Select>
                <input
                    required
                    type="hidden"
                    {...basicDetailForm("stateName")}
                />
                <InputLabel id="state">State</InputLabel>
                <Select className="w100per thinInput select mb-2"
                    onChange={(event: SelectChangeEvent) => { stateChange(event); setBasicDetailFormValues("stateName", event.target.value, { shouldValidate: true }); basicDetailFormTrigger("stateName"); }}
                    labelId="state"
                    label="State"
                    variant="filled"
                    defaultValue={''}
                >
                    {stateList.map((state, i) => {
                        return <MenuItem key={"state" + i} value={state.name}>{state.name} ({state.state_code})</MenuItem>
                    }
                    )}
                </Select>
                <input
                    required
                    type="hidden"
                    {...basicDetailForm("cityName")}
                />
                <InputLabel id="city">City</InputLabel>
                <Select className="w100per thinInput select mb-2"
                    {...basicDetailForm("cityName")}
                    onChange={(event: SelectChangeEvent) => { cityChange(event); setBasicDetailFormValues("cityName", event.target.value, { shouldValidate: true }); basicDetailFormTrigger("cityName"); }}
                    labelId="city"
                    label="City"
                    variant="filled"
                    defaultValue={''}
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