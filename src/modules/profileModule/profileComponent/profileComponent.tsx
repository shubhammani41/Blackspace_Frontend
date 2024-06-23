import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import "./profileComponent.scss";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AppValues, transformUserData } from "../../../constants/appConstants";
import axiosInstance from "../../../config/axiosConfig";
import { apiConstants } from "../../../constants/apiConstants";
import { UserData } from "../../../models/userData";

const ProfileComponent: React.FC = () => {
    const { userName } = useParams<{ userName: string }>();
    const [userDataLoading, setUserDataLoading] = useState<boolean>(false);
    const defaultTimeout: number = AppValues.defaultLoadingTimer;
    const [devData, setDevData] = useState<UserData>();

    const transformDevData = useMemo(() => {
        return transformUserData;
    }, [devData]);

    const fetchUserData = async (userName: string) => {
        if (userName && userName.trim() != '') {
            setUserDataLoading(true);
            const url = apiConstants.getUserDataByUserName.url + `?userName=${userName.trim()}`;
            const response: any = await axiosInstance.get(url);
            if (response && response.data) {
                setDevData(transformDevData([response.data])[0]);
            }
            setTimeout(() => { setUserDataLoading(false) }, defaultTimeout);
        }
    }

    useEffect(() => {
        if (userName) {
            fetchUserData(userName);
        }
    }, [userName]);

    useEffect(() => {
        console.log(devData)
    }, [devData])

    return (
        <div className="profileContainer df jc ac">
            <div className="profileMainInfo df js ac fw">
                <div className='df js ac f100'>
                    <p className='headerl'>
                        Profile
                    </p>
                </div>
                <div className="matrix-card-container fullSizeCard f100 mb40">
                    <Card>
                        <div className="df js ac gp30px m15">
                            <Avatar className="avatar100" alt={devData?.firstName || ""} src={devData?.profilePictureUrl || ""} />
                            <div>
                                <Typography sx={{ color: 'text.primary' }} className="w80vw ellipsis" gutterBottom variant="h5" component="div">
                                    {devData?.firstName ? devData?.firstName : ""} {devData?.lastName ? devData?.lastName : ""}
                                </Typography>
                                <Typography sx={{ color: 'text.primary' }} className="w80vw ellipsis" variant="body2" color="text.secondary">
                                    {devData?.positionName}
                                </Typography>
                            </div>
                        </div>
                        <CardContent>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Email: {devData?.email} years
                            </Typography>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Phone: {devData?.callingCode ? devData.callingCode + ' ' : ''}{devData?.phoneNumber}
                            </Typography>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Socials: {devData?.twitterUrl ? devData.twitterUrl + ', ' : ''}{devData?.websiteUrl ? devData.websiteUrl : ''}
                            </Typography>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Experience: {devData?.experience} years
                            </Typography>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Skills: {devData?.skills}
                            </Typography>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Location: {devData?.cityName ? devData?.cityName + "," : ""} {devData?.stateName ? devData.stateName + "," : ""} {devData?.cityName ? devData.countryName + "," : ""}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Download</Button>
                        </CardActions>
                    </Card>
                </div>

                <div className='df js ac f100'>
                    <p className='headerl'>
                        Experience
                    </p>
                </div>
                <div className="matrix-card-container fullSizeCard f100 mb40">
                    <Card>
                        <CardContent>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Email: {devData?.email} years
                            </Typography>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Phone: {devData?.callingCode ? devData.callingCode + ' ' : ''}{devData?.phoneNumber}
                            </Typography>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Socials: {devData?.twitterUrl ? devData.twitterUrl + ', ' : ''}{devData?.websiteUrl ? devData.websiteUrl : ''}
                            </Typography>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Experience: {devData?.experience} years
                            </Typography>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Skills: {devData?.skills}
                            </Typography>
                            <Typography className="w80vw ellipsis" variant="body2" color="text.secondary">
                                Location: {devData?.cityName ? devData?.cityName + "," : ""} {devData?.stateName ? devData.stateName + "," : ""} {devData?.cityName ? devData.countryName + "," : ""}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export { ProfileComponent }