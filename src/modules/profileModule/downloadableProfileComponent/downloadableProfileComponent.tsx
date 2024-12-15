import { Card, CardContent, createTheme, ThemeProvider, Typography } from "@mui/material";
import "./downloadableProfileComponent.scss";
import { useCallback, useEffect, useState } from "react";
import { AppValues } from "../../../constants/appConstants";
import { UserData } from "../../../models/userData";
import { ProfileSkeleton } from "../../../components/profileSkeleton/profileSkeleton";
import React from "react";
import { UserExperienceDetails } from "../../../models/userExperience";
import moment from "moment";
import { themeObjLight } from "../../../constants/themeConstants";
import apiFunctions from "../../../constants/apiFunctions";

export interface DownloadableProfileComponentProp {
    userName: string;
    setIsPDFLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    setUserFullName: React.Dispatch<React.SetStateAction<string>>;
}

const DownloadableProfileComponent: React.FC<DownloadableProfileComponentProp> = (props: DownloadableProfileComponentProp) => {
    const [userName] = useState<string>(props.userName);
    const [userDataLoading, setUserDataLoading] = useState<boolean>(false);
    const defaultTimeout: number = AppValues.defaultLoadingTimer;
    const [devData, setDevData] = useState<UserData>();
    const [expData, setExpData] = useState<UserExperienceDetails[]>([]);

    const fetchUserData = useCallback(async (userName: string) => {
        if (userName && userName.trim() !== '') {
            setUserDataLoading(true);
            const response1: { data: UserData } = await apiFunctions.fetchUserDetailsByUserName(userName);
            if (response1?.data?.userId) {
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
        props.setIsPDFLoaded(false);
        if (userName) {
            fetchUserData(userName);
        }
    }, [userName, fetchUserData]);

    useEffect(() => {
        if (devData && expData && !userDataLoading) {
            props.setIsPDFLoaded(true);
        }
    })

    return (
        <ThemeProvider theme={createTheme(themeObjLight)}>
            <div className="p40">
                <div className="downloadableProfileMainInfo df js ac fw">
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
                                            {/* {devData?.profilePictureUrl?<Avatar className="avatar100" alt={devData?.firstName || ""} src={devData?.profilePictureUrl || ""} />:<></>} */}
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
                                            {/* <Typography className="w90per" variant="body2" color="text.secondary">
                                                Email: {devData?.email}
                                            </Typography>
                                            <Typography className="w90per" variant="body2" color="text.secondary">
                                                Phone: {devData?.callingCode ? devData.callingCode + ' ' : ''}{devData?.phoneNumber}
                                            </Typography> */}
                                            {devData?.websiteUrl ? <Typography className="w90per" variant="body2" color="text.secondary">
                                                Socials: {devData.websiteUrl}
                                            </Typography> : null}
                                            <Typography className="w90per" variant="body2" color="text.secondary">
                                                Experience: {devData?.experience} years
                                            </Typography>
                                            <Typography className="w90per" variant="body2" color="text.secondary">
                                                Skills: {devData?.skills?.map((skill, index) =>
                                                    <Typography key={"skill_" + index} className="w90per" variant="body2" color="text.secondary">
                                                        &#x2022; {skill.skillName}
                                                    </Typography>)
                                                }
                                            </Typography>
                                            <Typography className="w90per" variant="body2" color="text.secondary">
                                                Location: {devData?.cityName ? devData?.cityName + "," : ""} {devData?.stateName ? devData.stateName + "," : ""} {devData?.cityName ? devData.countryName + "," : ""}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            </React.Fragment> : <></>}

                            {(devData && devData?.skills !== null) ? <React.Fragment>
                                <div className='df js ac f100'>
                                    <p className='headerl'>
                                        Skills
                                    </p>
                                </div>
                                <div className="matrix-card-container fullSizeCard f100 mb40">
                                    <Card>
                                        <CardContent>
                                            <Typography className="w90per" variant="body2" color="text.secondary">
                                                {devData?.skills?.map((skill, index) =>
                                                    <Typography key={"skill_" + index} className="w90per" variant="body2" color="text.secondary">
                                                        &#x2022; {skill.skillName}
                                                    </Typography>)
                                                }
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
        </ThemeProvider>
    )
}

export { DownloadableProfileComponent }