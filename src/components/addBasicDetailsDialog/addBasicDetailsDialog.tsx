import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import useAddBasicDetailsDialogStore from "./store/addBasicDetailsDialogStotre"
import useThemeStore from "../themeToggleBtn/store/themeStore";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import apiFunctions from "../../constants/apiFunctions";
import useUserLoginDataStore from "../../store/userLoginDetailsStore";

const AddBasicDetailsDialog: React.FC = () => {
    const addBasicDetailsDialogStore = useAddBasicDetailsDialogStore();
    const userLoginDataStore = useUserLoginDataStore();
    const currentTheme = useThemeStore();
    const saveBasicDetailsByUserLoginId = async()=>{
        if(userLoginDataStore.data.userDetails?.userLoginDetails.userDetails?.userId){
            apiFunctions.saveBasicDetailsByUserLoginId({firstName:"name"}).then(res=>{
                addBasicDetailsDialogStore.closeDialog();
            }).catch(err=>{
                console.log(err);
            })
        }
    }
    return <div>
        <Dialog
            open={addBasicDetailsDialogStore.data.dialogState}
            onClose={addBasicDetailsDialogStore.closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="addBasicDetailsDialogBackdrop" />
            <DialogTitle>
                <p className='p0m0 header f100 df jc ac' style={{ color: currentTheme.data.theme.palette?.text?.secondary }}>
                    Mind telling us more about yourself ?
                </p>
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
                    >
                    <MenuItem value={'MALE'}>Male</MenuItem>
                    <MenuItem value={'FEMALE'}>Female</MenuItem>
                </Select>
                <InputLabel id="country">Country</InputLabel>
                <Select className="w100per thinInput select mb-2"
                    labelId="country"
                    label="Country"
                    variant="filled"
                    >
                    <MenuItem value={1}>USA</MenuItem>
                    <MenuItem value={2}>India</MenuItem>
                </Select>
                <InputLabel id="state">State</InputLabel>
                <Select className="w100per thinInput select mb-2"
                    labelId="state"
                    label="State"
                    variant="filled"
                    >
                    <MenuItem value={1}>Uttar Pradesh</MenuItem>
                    <MenuItem value={2}>Delhi</MenuItem>
                </Select>
                <InputLabel id="city">City</InputLabel>
                <Select className="w100per thinInput select mb-2"
                    labelId="city"
                    label="City"
                    variant="filled"
                    >
                    <MenuItem value={1}>Gorakhpur</MenuItem>
                    <MenuItem value={2}>Noida</MenuItem>
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