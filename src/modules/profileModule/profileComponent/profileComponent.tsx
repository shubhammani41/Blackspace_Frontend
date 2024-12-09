import { Avatar, Button, Card, CardActions, CardContent, SimplePaletteColorOptions, Tooltip, Typography } from "@mui/material";
import "./profileComponent.scss";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { AppValues } from "../../../constants/appConstants";
import { UserData } from "../../../models/userData";
import { ProfileSkeleton } from "../../../components/profileSkeleton/profileSkeleton";
import React from "react";
import { UserExperienceDetails } from "../../../models/userExperience";
import moment from "moment";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import useThemeStore from "../../../components/themeToggleBtn/store/themeStore";
import apiFunctions from "../../../constants/apiFunctions";

const ProfileComponent: React.FC = () => {
    const { userName } = useParams<{ userName: string }>();
    const [userDataLoading, setUserDataLoading] = useState<boolean>(false);
    const defaultTimeout: number = AppValues.defaultLoadingTimer;
    const [devData, setDevData] = useState<UserData>();
    const [expData, setExpData] = useState<UserExperienceDetails[]>();
    const currentTheme = useThemeStore();

    const fetchUserData = useCallback(async (userName: string) => {
        if (userName && userName.trim() !== '') {
            setUserDataLoading(true);
            const response1: { data: UserData } = await apiFunctions.fetchUserDetailsByUserName(userName);
            if (response1?.data) {
                apiFunctions.fetchUserExperienceDetails(response1.data.userId).then((response2: { data?: UserExperienceDetails[] }) => {
                    if (response2?.data) {
                        setTimeout(() => {
                            setDevData([response1.data][0]);
                            if (response2 && response2.data) {
                                setExpData(response2.data);
                            }
                        }, defaultTimeout)
                    }
                    else {
                        setTimeout(() => {
                            setDevData([response1.data][0]);
                        }, defaultTimeout)
                    }
                }).catch(err => {
                    setTimeout(() => {
                        setDevData([response1.data][0]);
                    }, defaultTimeout)
                });

            }
            setTimeout(() => { setUserDataLoading(false) }, defaultTimeout);
        }
    }, [defaultTimeout]);

    useEffect(() => {
        if (userName) {
            fetchUserData(userName);
        }
    }, [userName, fetchUserData]);

    return (
        <div className="mainContainer df jc ac">
            <div className="profileMainInfo df js ac fw">
                {userDataLoading ? <ProfileSkeleton></ProfileSkeleton> :
                    <React.Fragment>
                        {devData != null ? <React.Fragment>
                            <div className='df js ac f100'>
                                <p className='headerl' style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                                    Profile
                                </p>
                            </div>
                            <div className="matrix-card-container fullSizeCard f100 mb40">
                                <Card>
                                    <div className="df js ac gp30px m15">
                                        <Avatar className="avatar100" alt={devData?.firstName || ""} src={devData?.profilePictureUrl || ""} />
                                        <div className="w80per">
                                            <Typography sx={{ color: 'text.primary' }} className="w90per" gutterBottom variant="h5" component="div">
                                                {devData?.firstName ? devData?.firstName : ""} {devData?.lastName ? devData?.lastName : ""}
                                            </Typography>
                                            <Typography sx={{ color: 'text.primary' }} className="w90per" variant="body2" color="text.secondary">
                                                {devData?.positionName}
                                            </Typography>
                                        </div>
                                    </div>
                                    <CardContent>
                                        {/*<Typography className="w90per" variant="body2" color="text.secondary">
                                            Email: {devData?.email}
                                        </Typography>
                                        <Typography className="w90per" variant="body2" color="text.secondary">
                                            Phone: {devData?.callingCode ? devData.callingCode + ' ' : ''}{devData?.phoneNumber}
                                        </Typography>*/}
                                        {devData?.websiteUrl ? <Typography className="w90per" variant="body2" color="text.secondary">
                                            Socials: {devData.websiteUrl}
                                        </Typography> : null}
                                        <Typography className="w90per" variant="body2" color="text.secondary">
                                            Experience: {devData?.experience} years
                                        </Typography>
                                        <Typography className="w90per" variant="body2" color="text.secondary">
                                            Skills: {devData?.skills?.map(skill => skill.skillName).join(', ')}
                                        </Typography>
                                        <Typography className="w90per" variant="body2" color="text.secondary">
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

                        {(devData && devData?.skills !== null) ? <React.Fragment>
                            <div className='df js ac f100'>
                                <p className='headerl' style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                                    Skills
                                </p>
                            </div>
                            <div className="fullSizeCard f100 mb40">
                                <Card>
                                    <CardContent>
                                        {devData?.skills?.map((skill, index) =>
                                            <Typography key={"skill_" + index} className="w90per" variant="body2" color="text.secondary">
                                                &#x2022; {skill.skillName}
                                            </Typography>)
                                        }
                                    </CardContent>
                                </Card>
                            </div>
                        </React.Fragment> : <></>}


                        <React.Fragment>
                            {(expData != null && expData.length) ?
                                <React.Fragment>
                                    <div className='df js ac f100'>
                                        <p className='headerl' style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                                            Experience
                                        </p>
                                    </div>
                                    {expData?.map((expObj, index) => {
                                        return (
                                            <div className="fullSizeCard f100 mb20" key={index}>
                                                <Card>
                                                    <div className="df jsb ac mt15r15b5l15 fw">
                                                        <Typography sx={{ color: 'text.primary' }} className="w50per" gutterBottom variant="h5" component="div">
                                                            {expObj?.organizationDetails?.organizationName ? expObj.organizationDetails.organizationName : (expObj.organizationName || "")}
                                                        </Typography>
                                                        <div className="df js ac fw">
                                                            <Typography sx={{ color: 'text.primary' }} className="w180p" variant="body2" color="text.secondary">
                                                                {expObj?.fromDate ? moment(expObj.fromDate).format('DD MMMM YYYY') : <></>}
                                                            </Typography>
                                                            {(!expObj?.isCurrentOrganization && expObj?.toDate) ? <Typography sx={{ color: 'text.primary' }} className="w180p" variant="body2" color="text.secondary">
                                                                &nbsp;{"- " + (expObj?.toDate ? moment(expObj.toDate).format('DD MMMM YYYY') : <></>)}
                                                            </Typography> : null}
                                                        </div>
                                                    </div>
                                                    <CardContent>
                                                        <Typography className="w90per" variant="body2" color="text.secondary">
                                                            Responsibilities & Roles:
                                                        </Typography>
                                                        {expObj?.description1 ? <Typography className="w90per" variant="body2" color="text.secondary">
                                                            &#x2022; {expObj.description1}</Typography> : null}
                                                        {expObj?.description2 ? <Typography className="w90per" variant="body2" color="text.secondary">
                                                            &#x2022; {expObj.description2}</Typography> : null}
                                                        {expObj?.description3 ? <Typography className="w90per" variant="body2" color="text.secondary">
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
    )
}

export { ProfileComponent }