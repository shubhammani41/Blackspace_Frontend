import { Avatar, Button, Card, CardActions, CardContent, Tooltip, Typography } from "@mui/material";
import style from "./profileComponent.module.scss";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { AppValues } from "../../../constants/appConstants";
import { UserData } from "../../../models/userData";
import { SearchSkeleton } from "../../searchModule/searchSkeleton/searchSkeleton";
import React from "react";
import { UserExperienceDetails } from "../../../models/userExperience";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import useThemeStore from "../../../components/themeToggleBtn/store/themeStore";
import apiFunctions from "../../../constants/apiFunctions";
import { MainLayoutComponent } from "../../../components/layoutComponents/mainLayoutComponent/mainLayoutComponent";
import { TabComponent, TabsComponent } from "../../../components/tabsComponent/tabsComponent";
import { ProfileDetailsComponent } from "../profileDetailsComponent/profileDetailsComponent";
import { ProfilePostsComponent } from "../profilePostsComponent/profilePostsComponent";
import { PostDetails } from "../../../models/postData";
import { ViewType } from "../../../components/galleryComponent/galleryComponent";

export interface ProfileComponentProps {
    postDetailView?: boolean;
}

const ProfileComponent: React.FC<ProfileComponentProps> = (props: ProfileComponentProps) => {
    const [searchParams] = useSearchParams();
    const [postIndex, setPostIndex] = useState(0);
    const [userDataLoading, setUserDataLoading] = useState<boolean>(false);
    const defaultTimeout: number = AppValues.defaultLoadingTimer;
    const [devData, setDevData] = useState<UserData>();
    const [expData, setExpData] = useState<UserExperienceDetails[]>();
    const currentTheme = useThemeStore();
    const [profilePosts, setProfilePosts] = useState<PostDetails[]>([]);
    useEffect(() => {
        if (devData?.userId) {
            apiFunctions.fetchProfilePublicPosts(12, 0, devData.userId).then((res) => {
                if (res.data.data) {
                    setProfilePosts(res.data.data);
                }
            })
        }
    }, [devData]);

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
        const userName = searchParams.get('userName');
        const postIndex = searchParams.get('postIndex');
        if (userName) {
            fetchUserData(userName);
        }
        if (postIndex) {
            const index = Number(postIndex);
            setPostIndex(isNaN(index) ? 0 : index);
        }
    }, [searchParams, fetchUserData]);

    return (
        <MainLayoutComponent>
            <div className="mb-3">
                {
                    !props.postDetailView ?
                        (userDataLoading ? <SearchSkeleton></SearchSkeleton> :
                            <React.Fragment>
                                {devData != null ? <React.Fragment>
                                    <div className='df js ac f100'>
                                        <p className='headerl' style={{ color: currentTheme.data.theme.palette?.text?.secondary }}>
                                            Profile
                                        </p>
                                    </div>
                                    <div className="roundedContainer f100 mb20">
                                        <Card>
                                            <div className={"df jsb as m-2 " + style.profileMainInfoContainer}>
                                                <div className="df js ac gp30px">
                                                    <Avatar className="avatar100" alt={devData?.firstName || ""} src={devData?.profilePictureUrl || ""} />
                                                    <div>
                                                        <Typography sx={{ color: 'text.primary' }} gutterBottom variant="h5" component="div">
                                                            {devData?.firstName ? devData?.firstName : ""} {devData?.lastName ? devData?.lastName : ""}
                                                        </Typography>
                                                        <Typography sx={{ color: 'text.primary' }} variant="body2" color="text.secondary">
                                                            {devData?.positionName}
                                                        </Typography>
                                                        {devData.userExperience?.filter(exp => exp.isCurrentOrganization).map((obj, index) => {
                                                            return (<Typography key={'exp_' + index} className="ellipsis" variant="body2" color="text.secondary">
                                                                {obj?.organizationName ? ('@' + obj?.organizationName) : ''}
                                                            </Typography>)
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <CardContent>
                                                {devData?.websiteUrl ? <Typography className="w90per" variant="body2" color="text.secondary">
                                                    Socials: {devData.websiteUrl}
                                                </Typography> : null}
                                                <Typography className="w90per" variant="body2" color="text.secondary">
                                                    Experience: {devData?.experience} years
                                                </Typography>
                                                <Typography className="w90per" variant="body2" color="text.secondary">
                                                    Location: {devData?.cityName ? devData?.cityName + "," : ""} {devData?.stateName ? devData.stateName + "," : ""} {devData?.cityName ? devData.countryName + "," : ""}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Tooltip title="Download">
                                                    <Button variant="contained" size="small">
                                                        <DownloadRoundedIcon></DownloadRoundedIcon>&nbsp;Download
                                                    </Button>
                                                </Tooltip>
                                            </CardActions>
                                        </Card>
                                    </div>
                                </React.Fragment> : <></>}
                                <div className={`${style.postTabContainer}`}>
                                    <TabsComponent>
                                        <TabComponent index={0} label="Posts">
                                            <ProfilePostsComponent profilePosts={profilePosts} accountDetails={{ userName: devData?.userName, userId: devData?.userId, profilePictureUrl: devData?.profilePictureUrl }}></ProfilePostsComponent>
                                        </TabComponent>
                                        <TabComponent index={1} label="Details">
                                            <div className="mx-3">
                                                <ProfileDetailsComponent devData={devData} expData={expData}></ProfileDetailsComponent>
                                            </div>
                                        </TabComponent>
                                    </TabsComponent>
                                </div>
                            </React.Fragment>
                        ) :
                        <div className={`${style.postTabContainer} ${style.detailPostTabContainer}`}>
                            <ProfilePostsComponent
                                profilePosts={profilePosts}
                                accountDetails={{ userName: devData?.userName, userId: devData?.userId, profilePictureUrl: devData?.profilePictureUrl }}
                                postIndex={postIndex}
                                viewMode={ViewType.DETAILED}
                            ></ProfilePostsComponent>
                        </div>
                }

            </div>
        </MainLayoutComponent>
    )
}

export { ProfileComponent }