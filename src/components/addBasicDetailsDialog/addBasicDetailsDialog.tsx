import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, SimplePaletteColorOptions, TextField } from "@mui/material"
import useAddBasicDetailsDialogStore from "./store/addBasicDetailsDialogStotre"
import useThemeStore from "../themeToggleBtn/store/themeStore";
import SearchIcon from '@mui/icons-material/Search';

const AddBasicDetailsDialog: React.FC = () => {
    const addBasicDetailsDialogStore = useAddBasicDetailsDialogStore();
    const currentTheme = useThemeStore();
    return <div>
        <Dialog
            open={addBasicDetailsDialogStore.data.dialogState}
            onClose={addBasicDetailsDialogStore.closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="addBasicDetailsDialogBackdrop" />
            <DialogTitle>
                Add Basic Details
            </DialogTitle>
            <DialogContent>
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
                    className='w100per thinInput'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">

                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" size="small" onClick={addBasicDetailsDialogStore.closeDialog}>
                    skip
                </Button>
            </DialogActions>
        </Dialog>
    </div>
}

export { AddBasicDetailsDialog }