import { Avatar, Button, Card, CardActions, CardContent, CardMedia, createTheme, ThemeProvider, Tooltip, Typography } from "@mui/material";
import "./downloadableProfileComponent.scss";
import { useLocation, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AppValues, transformUserData } from "../../../constants/appConstants";
import axiosInstance from "../../../config/axiosConfig";
import { apiConstants } from "../../../constants/apiConstants";
import { UserData } from "../../../models/userData";
import { ProfileSkeleton } from "../../../components/profileSkeleton/profileSkeleton";
import React from "react";
import { UserExperience } from "../../../models/userExperience";
import moment from "moment";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import useThemeStore from "../../../components/themeToggleBtn/store/themeStore";

export interface DownloadableProfileComponentProp {
    userName: string;
    setIsPDFLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    setUserFullName: React.Dispatch<React.SetStateAction<string>>;
}

const DownloadableProfileComponent: React.FC<DownloadableProfileComponentProp> = (props: DownloadableProfileComponentProp) => {
    const [userName, setUserName] = useState<string>(props.userName);
    const [userDataLoading, setUserDataLoading] = useState<boolean>(false);
    const defaultTimeout: number = AppValues.defaultLoadingTimer;
    const [devData, setDevData] = useState<UserData>();
    const [expData, setExpData] = useState<UserExperience[]>([]);
    const { data } = useThemeStore();

    const transformDevData = useMemo(() => {
        return transformUserData;
    }, [devData]);

    const fetchUserData = useCallback(async (userName: string) => {
        if (userName && userName.trim() != '') {
            setUserDataLoading(true);
            const url1 = apiConstants.getUserDataByUserName.url + `?userName=${userName.trim()}`;
            const response1: { data: UserData } = await axiosInstance.get(url1);
            if (response1 && response1.data) {
                props.setUserFullName(response1.data.firstName + (response1.data.lastName ? " " + response1.data.lastName : ""));
                const url2 = apiConstants.getUserExperienceByUserId.url + `?userId=${response1.data.userId}`;
                const response2: { data: UserExperience[] } = await axiosInstance.get(url2);
                setTimeout(() => {
                    setDevData(transformDevData([response1.data])[0]);
                    if (response2 && response2.data) {
                        setExpData(response2.data ? response2.data : []);
                    }
                }, defaultTimeout)
            }
            setTimeout(() => { setUserDataLoading(false) }, defaultTimeout);
        }
    }, []);

    useEffect(() => {
        props.setIsPDFLoaded(false);
        if (userName) {
            fetchUserData(userName);
        }
    }, [userName]);

    useEffect(() => {
        if (devData && expData && !userDataLoading) {
            props.setIsPDFLoaded(true);
        }
    })

    return (
        <ThemeProvider theme={createTheme(data.theme)}>
            <div className="mainContainer df jc ac">
                <div className="profileMainInfo df js ac fw">
                    {userDataLoading ? <ProfileSkeleton></ProfileSkeleton> :
                        <React.Fragment>
                            {devData != null ? <React.Fragment>
                                <div className='df js ac f100'>
                                    <p className='headerl'>
                                        Profile
                                    </p>
                                </div>
                                <div className="matrix-card-container fullSizeCard f100 mb40">
                                    <Card>
                                        <div className="df js ac gp30px m15">
                                            <Avatar className="avatar100" alt={devData?.firstName || ""} src={devData?.profilePictureUrl || ""} />
                                            <div className="w80per">
                                                <Typography sx={{ color: 'text.primary' }} className="w90per ellipsis" gutterBottom variant="h5" component="div">
                                                    {devData?.firstName ? devData?.firstName : ""} {devData?.lastName ? devData?.lastName : ""}
                                                </Typography>
                                                <Typography sx={{ color: 'text.primary' }} className="w90per ellipsis" variant="body2" color="text.secondary">
                                                    {devData?.positionName}
                                                </Typography>
                                            </div>
                                        </div>
                                        <CardContent>
                                            <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                Email: {devData?.email}
                                            </Typography>
                                            <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                Phone: {devData?.callingCode ? devData.callingCode + ' ' : ''}{devData?.phoneNumber}
                                            </Typography>
                                            {devData?.websiteUrl ? <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                Socials: {devData.websiteUrl}
                                            </Typography> : null}
                                            <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                Experience: {devData?.experience} years
                                            </Typography>
                                            <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                Skills: {devData?.skills}
                                            </Typography>
                                            <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                Location: {devData?.cityName ? devData?.cityName + "," : ""} {devData?.stateName ? devData.stateName + "," : ""} {devData?.cityName ? devData.countryName + "," : ""}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Tooltip title="Download">
                                                <Button variant="contained" size="small" className="icon40Btn">
                                                    <DownloadRoundedIcon></DownloadRoundedIcon>
                                                </Button>
                                            </Tooltip>
                                        </CardActions>
                                    </Card>
                                </div>
                            </React.Fragment> : <></>}

                            {(devData != null && devData.skills != null && devData.skills != '') ? <React.Fragment>
                                <div className='df js ac f100'>
                                    <p className='headerl'>
                                        Skills
                                    </p>
                                </div>
                                <div className="matrix-card-container fullSizeCard f100 mb40">
                                    <Card>
                                        <CardContent>
                                            <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                {devData.skills}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            </React.Fragment> : <></>}


                            <React.Fragment>
                                {(expData != null && expData.length) ?
                                    <React.Fragment>
                                        <div className='df js ac f100'>
                                            <p className='headerl'>
                                                Experience
                                            </p>
                                        </div>
                                        {expData?.map((expObj, index) => {
                                            return (
                                                <div className="matrix-card-container fullSizeCard f100 mb20" key={index}>
                                                    <Card>
                                                        <div className="df jsb ac mt15r15b5l15 fw">
                                                            <Typography sx={{ color: 'text.primary' }} className="w50per ellipsis" gutterBottom variant="h5" component="div">
                                                                {expObj?.organizationDetails.organizationName}
                                                            </Typography>
                                                            <div className="df js ac fw">
                                                                <Typography sx={{ color: 'text.primary' }} className="w180p ellipsis" variant="body2" color="text.secondary">
                                                                    {expObj?.fromDate ? moment(expObj.fromDate).format('DD MMMM YYYY') : <></>}
                                                                </Typography>
                                                                {(!expObj?.currentOrganization && expObj?.toDate) ? <Typography sx={{ color: 'text.primary' }} className="w180p ellipsis" variant="body2" color="text.secondary">
                                                                    &nbsp;{"- " + (expObj?.toDate ? moment(expObj.toDate).format('DD MMMM YYYY') : <></>)}
                                                                </Typography> : null}
                                                            </div>
                                                        </div>
                                                        <CardContent>
                                                            <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                                Responsibilities & Roles:
                                                            </Typography>
                                                            {expObj?.description1 ? <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                                &#x2022; {expObj.description1}</Typography> : null}
                                                            {expObj?.description2 ? <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                                &#x2022; {expObj.description2}</Typography> : null}
                                                            {expObj?.description3 ? <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                                &#x2022; {expObj.description3}</Typography> : null}
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            )
                                        })}
                                    </React.Fragment> : <div></div>}
                            </React.Fragment>
                        </React.Fragment>}
                </div>
            </div>
        </ThemeProvider>
    )
}

export { DownloadableProfileComponent }