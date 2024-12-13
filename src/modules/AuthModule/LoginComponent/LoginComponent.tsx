
import { LoginUIComponent } from "../../../components/loginUIComponent/LoginUIComponent";
import "./LoginComponent.scss";
import { Card, CardContent } from '@mui/material';

const LoginComponent = () => {
    const onFail = (err: any) => {
        console.log(err);
    }
    return (
        <div className='row gx-0'>
            <div className="col-xxl-4 col-xl-4 col-lg-3 col-sm-2 col-1">
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-6 col-sm-8 col-10 loginCardContainer">
                <Card className='pb5'>
                    <CardContent className="pb3px pt3px">
                        <LoginUIComponent onFail={onFail} redirectURL="/home"></LoginUIComponent>
                    </CardContent>
                </Card>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-3 col-sm-2 col-1">
            </div>
        </div>
    );
};

export { LoginComponent };
