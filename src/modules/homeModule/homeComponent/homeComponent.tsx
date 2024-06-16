import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Skeleton, TablePagination, TextField, Typography } from "@mui/material";
import React, { RefObject, useEffect, useState } from "react";
import clubbedToDeath from '../../../assets/audio/clubbedToDeath.mp3';
import './homeComponent.scss';
import { UserData } from "../../../models/userData";
import axiosInstance from "../../../config/axiosConfig";
import { ProfileSkeleton } from "../../../components/profileSkeleton/profileSkeleton";
import SearchIcon from '@mui/icons-material/Search';
import { apiConstants } from "../../../constants/apiConstants";

const HomeComponent: React.FC = () => {
    const audioRef: RefObject<HTMLAudioElement> = React.createRef();
    const [devDataList, setDevData] = useState<UserData[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [devListLoading, setDevListLoading] = useState<boolean>(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageNumber(newPage);
        fetchUserData(rowsPerPage, newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPageNumber(0);
        fetchUserData(parseInt(event.target.value), 0);
    };

    let fetchTimer = setTimeout(() => { }, 500);

    const searchFn = (event: any) => {
        const { value } = event.target;
        if (value.length >= 3) {
            clearTimeout(fetchTimer);
            timerFunc(value);
        } else if (value === '') {
            clearTimeout(fetchTimer);
            timerFunc(value);
        }
        else {
            clearTimeout(fetchTimer);
        }
    }

    const timerFunc = (value: string) => {
        fetchTimer = setTimeout(() => {
            fetchUserData(5, 0, value);
        }, 500);
    }

    const fetchUserData = async (rowsPerPage: number, pageNumber: number, searchKeyWord: string = '') => {
        setDevListLoading(true);
        try {
            let url = "";
            if (searchKeyWord && searchKeyWord !== '') {
                url = apiConstants.searchUserByKeyWord.url + `?pageSize=${rowsPerPage}&pageNumber=${pageNumber}&searchKeyWord=${searchKeyWord}`;
            }
            else {
                url = apiConstants.getUserListRandom.url + `?pageSize=${rowsPerPage}&pageNumber=${pageNumber}`;
            }
            let response: any = await axiosInstance.get(url);
            response = response.data.data;
            setTotalElements(response.totalElements);
            setDevData(response.data.map((obj: any) => {
                return { ...obj, skills: JSON.parse(obj.skills).map((sk: any) => sk.skill_name).join(",") }
            }));
        } catch (error) {
            //test
        }

        setTimeout(() => { setDevListLoading(false) }, 1000);
    };

    useEffect(() => {
        fetchUserData(rowsPerPage, pageNumber);
    }, []);

    return (
        <div className="mainContainer">
            {/* <div className="app-background-image-container">
                <img className="app-background-image" src={matrixrain} />
            </div> */}
            <div className='df jc ac app-header'>
                <p className='header'>
                    Welcome to Black Space.
                </p>
            </div>
            <div className='df jc ac mb40 searchBarContainer'>
                <SearchIcon className="searchIconContainer"></SearchIcon>
                <TextField
                    id="searchDev"
                    label="Search developer profile"
                    variant="filled"
                    placeholder="e.g. Shubham Tripathi"
                    className='searchBar'
                    onChange={searchFn}
                />
            </div>
            <div className="matrix-card-list">
                {devListLoading ?
                    <div className="df jc ac fw gp50px w90vw">
                        {Array(3).fill(1).map((val, index) => {
                            return (<ProfileSkeleton key={"profileSkeleton_" + index}></ProfileSkeleton>)
                        })}
                    </div> :
                    <div className="df jc ac fw gp50px w90vw">
                        {devDataList.length > 0 ?
                            devDataList.map((devData) => {
                                return (
                                    <div className="matrix-card-container" key={"dev_" + devData.userId}>
                                        <Card>
                                            {/* <CardMedia
                                            component="img"
                                            alt={"Image not found"}
                                            height="140"
                                            src={devData.profilePictureUrl ? devData.profilePictureUrl : "defaultImageUrl"}
                                        /> */}
                                            <div className="df js ac gp30px m15">
                                                <Avatar className="avatar100" alt={devData.firstName || ""} src={devData.profilePictureUrl || ""} />
                                                <div>
                                                    <Typography sx={{ color: 'text.primary' }} className="w300p ellipsis" gutterBottom variant="h5" component="div">
                                                        {devData.firstName ? devData.firstName : ""} {devData.lastName ? devData.lastName : ""}
                                                    </Typography>
                                                    <Typography sx={{ color: 'text.primary' }} className="w300p ellipsis" variant="body2" color="text.secondary">
                                                        {devData.positionName}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <CardContent>
                                                <Typography className="w300p ellipsis" variant="body2" color="text.secondary">
                                                    Experience: {devData.experience} years
                                                </Typography>
                                                <Typography className="w300p ellipsis" variant="body2" color="text.secondary">
                                                    Technology: {devData.skills}
                                                </Typography>
                                                <Typography className="w300p ellipsis" variant="body2" color="text.secondary">
                                                    Location: {devData.cityName ? devData.cityName + "," : ""} {devData.stateName ? devData.stateName + "," : ""} {devData.cityName ? devData.countryName + "," : ""}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">View</Button>
                                            </CardActions>
                                        </Card>
                                    </div>
                                )
                            }) :
                            <div className="df jc ac">
                                <Typography className="w300p ellipsis df jc ac" variant="body2" color="text.secondary">
                                    No profiles found
                                </Typography>
                            </div>
                        }

                    </div>}
            </div>
            {!devListLoading ?
                <div className="df jc ac fw gp50px paginator-container">
                    <table>
                        <tbody>
                            <tr>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    count={totalElements}
                                    rowsPerPage={rowsPerPage}
                                    page={pageNumber}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </tr>
                        </tbody>
                    </table>
                </div>
                : null}
            <audio ref={audioRef} loop controls={false} autoPlay={true}>
                <source src={clubbedToDeath} type="audio/mp3" />
            </audio>
        </div>
    );
}

export { HomeComponent };