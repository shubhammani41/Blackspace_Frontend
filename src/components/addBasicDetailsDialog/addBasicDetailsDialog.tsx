import { Button, Dialog, DialogActions, DialogContent } from "@mui/material"
import useAddBasicDetailsDialogStore from "./store/addBasicDetailsDialogStotre"

const AddBasicDetailsDialog: React.FC = () => {
    const addBasicDetailsDialogStore = useAddBasicDetailsDialogStore();
    return <div>
        <Dialog
            open={addBasicDetailsDialogStore.data.dialogState}
            onClose={addBasicDetailsDialogStore.closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="signinDialogBackdrop" />
            <DialogContent>
                Add Basic Details
            </DialogContent>
            <DialogActions>
                <Button variant="contained" size="small" onClick={addBasicDetailsDialogStore.closeDialog}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    </div>
}

export { AddBasicDetailsDialog }