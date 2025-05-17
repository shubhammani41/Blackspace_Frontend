import React, { useState } from 'react';
import style from './profileDetailsComponent.module.scss';
import { Card, CardContent, SimplePaletteColorOptions, Typography } from '@mui/material';
import { UserData } from '../../../models/userData';
import { UserExperienceDetails } from '../../../models/userExperience';
import useThemeStore from '../../../components/themeToggleBtn/store/themeStore';
import moment from 'moment';

export interface ProfileDetailsComponentProps{
    devData?: UserData;
    expData?: UserExperienceDetails[];
}

const ProfileDetailsComponent: React.FC<ProfileDetailsComponentProps> = (props:ProfileDetailsComponentProps) => {
    const {devData, expData} = props;
    const currentTheme = useThemeStore();
    return (
        <div>
            {(devData && devData?.skills !== null) ? <React.Fragment>
                <div className='df js ac f100'>
                    <p className='headerl' style={{ color: currentTheme.data.theme.palette?.text?.secondary }}>
                        Skills
                    </p>
                </div>
                <div className="fullSizeCard roundedContainer f100 mb20">
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
                            <p className='headerl' style={{ color: currentTheme.data.theme.palette?.text?.secondary }}>
                                Experience
                            </p>
                        </div>
                        <div className="fullSizeCard roundedContainer f100 mb20">
                            <Card>
                                <CardContent>
                                    {expData?.map((expObj, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="df jsb ac fw">
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
                                                <Typography className="w90per" variant="body2" color="text.secondary">
                                                    Responsibilities & Roles:
                                                </Typography>
                                                {expObj?.description1 ? <Typography className="w90per" variant="body2" color="text.secondary">
                                                    &#x2022; {expObj.description1}</Typography> : null}
                                                {expObj?.description2 ? <Typography className="w90per" variant="body2" color="text.secondary">
                                                    &#x2022; {expObj.description2}</Typography> : null}
                                                {expObj?.description3 ? <Typography className="w90per" variant="body2" color="text.secondary">
                                                    &#x2022; {expObj.description3}</Typography> : null}
                                                {index < expData.length - 1 ? <hr style={{ color: (currentTheme.data.theme.palette?.secondary as SimplePaletteColorOptions).main }}></hr> : <></>}
                                            </div>
                                        )
                                    })}

                                </CardContent>
                            </Card>
                        </div>
                    </React.Fragment> : <div></div>}
            </React.Fragment>{(devData && devData?.skills !== null) ? <React.Fragment>
                <div className='df js ac f100'>
                    <p className='headerl' style={{ color: currentTheme.data.theme.palette?.text?.secondary }}>
                        Skills
                    </p>
                </div>
                <div className="fullSizeCard roundedContainer f100 mb20">
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
                            <p className='headerl' style={{ color: currentTheme.data.theme.palette?.text?.secondary }}>
                                Experience
                            </p>
                        </div>
                        <div className="fullSizeCard roundedContainer f100 mb20">
                            <Card>
                                <CardContent>
                                    {expData?.map((expObj, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="df jsb ac fw">
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
                                                <Typography className="w90per" variant="body2" color="text.secondary">
                                                    Responsibilities & Roles:
                                                </Typography>
                                                {expObj?.description1 ? <Typography className="w90per" variant="body2" color="text.secondary">
                                                    &#x2022; {expObj.description1}</Typography> : null}
                                                {expObj?.description2 ? <Typography className="w90per" variant="body2" color="text.secondary">
                                                    &#x2022; {expObj.description2}</Typography> : null}
                                                {expObj?.description3 ? <Typography className="w90per" variant="body2" color="text.secondary">
                                                    &#x2022; {expObj.description3}</Typography> : null}
                                                {index < expData.length - 1 ? <hr style={{ color: (currentTheme.data.theme.palette?.secondary as SimplePaletteColorOptions).main }}></hr> : <></>}
                                            </div>
                                        )
                                    })}

                                </CardContent>
                            </Card>
                        </div>
                    </React.Fragment> : <div></div>}
            </React.Fragment>
        </div>
    )
}

export { ProfileDetailsComponent }