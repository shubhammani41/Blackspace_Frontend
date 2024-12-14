import { Button, Dialog, DialogActions, DialogContent, DialogTitle, SimplePaletteColorOptions } from "@mui/material"
import useSigninDialogStore from "./store/signinDialogStore";
import './signinDialog.scss';
import { LoginUIComponent } from "../loginUIComponent/LoginUIComponent";
import useThemeStore from "../themeToggleBtn/store/themeStore";

const SigninDialog: React.FC = () => {
    const signinDialogStore = useSigninDialogStore();
    const onSuccess = () => {
        signinDialogStore.closeDialog();
    }
    const onFail = (err: any) => {
        console.log(err);
    }
    const currentTheme = useThemeStore();
    return (
        <div>
            <Dialog
                open={signinDialogStore.data.dialogState}
                onClose={signinDialogStore.closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="signinDialogBackdrop" />
                <DialogTitle>
                    <div>
                        <div className='df jc ac fw'>
                            <p className='p0m0 header textwrapNone f100 df jc ac' style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                                Welcome to Blackspace,
                            </p>
                        </div>
                        <div className='df jc ac fw'>
                            <p className='p0m00150 header f100 df jc ac' style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                                Sign In.
                            </p>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <LoginUIComponent onSuccess={onSuccess} onFail={onFail}></LoginUIComponent>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" size="small" onClick={signinDialogStore.closeDialog}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export { SigninDialog }