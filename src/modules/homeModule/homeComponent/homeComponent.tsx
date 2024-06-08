import { Button, Card, CardActions, CardContent, CardMedia, TablePagination, TextField, Typography } from "@mui/material";
import React, { RefObject, useEffect, useState } from "react";
import clubbedToDeath from '../../../assets/audio/clubbedToDeath.mp3';
import './homeComponent.scss';
import { UserData } from "../../../models/userData";
import axiosInstance from "../../../config/axiosConfig";

const HomeComponent: React.FC = () => {
    const audioRef: RefObject<HTMLAudioElement> = React.createRef();
    const [devDataList, setDevData] = useState<UserData[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const searchFn = () => {
        // audioRef.current?.play();
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('public/getRandomUserList?pageSize=10&pageNumber=0');
                console.log(response.data.data.data)
                setDevData(response.data.data.data.map((obj:any)=>{
                    return { ...obj, skills: JSON.parse(obj.skills).map((sk:any)=>sk.skill_name).join(",")}
                }));
            } catch (error) {
                //test
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {/* <div className="app-background-image-container">
                <img className="app-background-image" src={matrixrain} />
            </div> */}
            <div className='df jc ac app-header'>
                <p className='header'>
                    Welcome to Black Space.
                </p>
            </div>
            <div className='df jc ac mb40'>
                <TextField
                    id="searchDev"
                    label="Search developer profile"
                    variant="outlined"
                    placeholder="e.g. Shubham Tripathi"
                    className='searchBar'
                    onChange={searchFn}
                />
            </div>
            <div className="matrix-card-list">
                <div className="df jc ac fw gp50px w90vw">
                    {devDataList.map((devData) => {
                        return (
                            <div className="matrix-card-container">
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={"Image not found"}
                                        height="140"
                                        src={devData.profilePictureUrl?devData.profilePictureUrl:"defaultImageUrl"}
                                    />
                                    <CardContent>
                                        <Typography className="w300p ellipsis" gutterBottom variant="h5" component="div">
                                            {devData.firstName?devData.firstName:""} {devData.lastName?devData.lastName:""}
                                        </Typography>
                                        <Typography className="w300p ellipsis" variant="body2" color="text.secondary">
                                            {devData.positionName}
                                        </Typography>
                                        <Typography className="w300p ellipsis" variant="body2" color="text.secondary">
                                            Experience: {devData.experience} years
                                        </Typography>
                                        <Typography className="w300p ellipsis" variant="body2" color="text.secondary">
                                            Technology: {devData.skills}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">View</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={devDataList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <audio ref={audioRef} loop controls={false} autoPlay={true}>
                <source src={clubbedToDeath} type="audio/mp3" />
            </audio>
        </div>
    );
}

export { HomeComponent };