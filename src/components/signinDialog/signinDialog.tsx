import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import useSigninDialogStore from "./store/signinDialogStore";
import './signinDialog.scss';
import { LoginUIComponent } from "../../modules/AuthModule/LoginComponent/LoginUIComponent";

const SigninDialog: React.FC = () => {
    const signinDialogStore = useSigninDialogStore();
    const onSuccess = ()=>{
        signinDialogStore.closeDialog();
    }
    const onFail = (err: any)=>{
        console.log(err);
    }
    return (
        <div>
            <Dialog
                open={signinDialogStore.data.dialogState}
                onClose={signinDialogStore.closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="signinDialogBackdrop" />
                <DialogContent>
                    <LoginUIComponent onSuccess={onSuccess} onFail={onFail}></LoginUIComponent>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="small" onClick={signinDialogStore.closeDialog}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export { SigninDialog }