import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Skeleton, TablePagination, TextField, Typography } from "@mui/material";
import React, { ReactElement, RefObject, useEffect, useMemo, useRef, useState } from "react";
import clubbedToDeath from '../../../assets/audio/clubbedToDeath.mp3';
import './homeComponent.scss';
import { UserData } from "../../../models/userData";
import axiosInstance from "../../../config/axiosConfig";
import { ProfileSkeleton } from "../../../components/profileSkeleton/profileSkeleton";
import SearchIcon from '@mui/icons-material/Search';
import { apiConstants } from "../../../constants/apiConstants";
import InfiniteScroll from 'react-infinite-scroller';
import { throttle, debounce } from 'lodash';

const HomeComponent: React.FC = () => {
    const defaultPageSize: number = 6;
    const defaultPageNumber: number = 0;
    const defaultSearchKeyWord: string = "";
    const defaultSearchMessage: string = "Hold on a sec.";
    const successSearchMessage: string = "There you go.";
    const defaultTimeout: number = 500;
    const noProfileSearchMessage: string = "Sorry! No profiles found.";
    const errorSearchMessage: string = "Opps! Something went wrong.";
    const audioRef: RefObject<HTMLAudioElement> = React.createRef();
    const [devDataList, setDevData] = useState<UserData[]>([]);
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);
    const [pageNumber, setPageNumber] = useState<number>(defaultPageNumber);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [devListLoading, setDevListLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [searchKeyWord, setSearchKeyWord] = useState<string>(defaultSearchKeyWord);
    const [searchMessage, setSearchMessage] = useState<string>();

    const profileSkeletonList:ReactElement[] = useMemo(() => {
        return Array(3).fill(1).map((val, index) => {
            return (<ProfileSkeleton key={"profileSkeleton_" + index}></ProfileSkeleton>)
        })
    }, [])

    const tranformDevDataList = (data: UserData[]): UserData[] => {
        return data.map((obj: any) => {
            return { ...obj, skills: JSON.parse(obj.skills).map((sk: any) => sk.skill_name).join(",") }
        });
    }

    const searchFn = (event: any) => {
        setSearchKeyWord(event.target.value);
        if(event.target.value=='' || event.target.value.length>2){
            setDevData([]);
            setPageNumber(defaultPageNumber);
            setPageSize(defaultPageSize);
            fetchUserData(defaultPageSize, defaultPageNumber, event.target.value);
        }
    }

    const debouncedSearchFn = useMemo(() => {
        return debounce(searchFn, defaultTimeout);
    }, [])



    const fetchUserData = async (pageSize: number, pageNumber: number, searchKeyWord: string = '') => {
        setDevListLoading(true);
        try {
            let url = "";
            if (searchKeyWord && searchKeyWord !== '') {
                url = apiConstants.searchUserByKeyWord.url + `?pageSize=${pageSize}&pageNumber=${pageNumber}&searchKeyWord=${searchKeyWord}`;
            }
            else {
                url = apiConstants.getUserListRandom.url + `?pageSize=${pageSize}&pageNumber=${pageNumber}`;
            }
            let response: any = await axiosInstance.get(url);
            if (response?.data) {
                setTotalElements(response.totalElements);
                setTimeout(() => {
                    setDevData(prev => [...prev, ...tranformDevDataList(response.data)]);
                }, defaultTimeout);
            } else {
                setDevData([]);
                setSearchMessage(noProfileSearchMessage);
                setHasMore(false);
            }

        } catch (error) {
            setDevData([]);
            setSearchMessage(errorSearchMessage);
            setHasMore(false);
        }

        setTimeout(() => { setDevListLoading(false) }, defaultTimeout);
    };

    const loadMore = () => {
        let pageNumberLatest = defaultPageNumber;
        let pageSizeLatest = defaultPageSize;
        let searchLatest = "";
        setPageNumber(prevPageNumber => {
            pageNumberLatest = prevPageNumber + 1;
            setPageSize(prevPageSize => {
                pageSizeLatest = prevPageSize;
                setSearchKeyWord(searchPrev => {
                    searchLatest = searchPrev;
                    fetchUserData(pageSizeLatest, pageNumberLatest, searchLatest);
                    return searchLatest;
                });
                return pageSizeLatest;
            });
            return pageNumberLatest;
        });
        setHasMore(false);
    }

    const debouncedLoadMore = useMemo(() => {
        return debounce(loadMore, defaultTimeout)
    }, [])

    const handleScroll = () => {
        let pageNumberLatest = defaultPageNumber;
        let pageSizeLatest = defaultPageSize;
        let totalElementsLatest = 0;
        setPageNumber(prevPageNumber => {
            pageNumberLatest = prevPageNumber;
            setPageSize(prevPageSize => {
                pageSizeLatest = prevPageSize;
                setTotalElements(prevTotal => {
                    totalElementsLatest = prevTotal;

                    console.log(pageNumberLatest, pageSizeLatest, totalElementsLatest)
                    if (pageNumberLatest * pageSizeLatest <= totalElementsLatest && pageSizeLatest <= totalElementsLatest) {
                        setHasMore(true);
                    }

                    return totalElementsLatest;
                });
                return pageSizeLatest;
            });
            return pageNumberLatest;
        });
    }

    useEffect(() => {
        fetchUserData(pageSize, pageNumber);
        window.addEventListener('scrollend', handleScroll);
    }, []);

    useEffect(() => {
        return () => {
            window.removeEventListener('scrollend', handleScroll);
            debouncedSearchFn.cancel();
            debouncedLoadMore.cancel();
        }
    }, []);

    return (
        <div className="mainContainer">
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
                    onChange={debouncedSearchFn}
                />
            </div>
            <div className="matrix-card-list">
                <InfiniteScroll className="mb40"
                    pageStart={defaultPageNumber}
                    loadMore={debouncedLoadMore}
                    hasMore={hasMore}
                    useWindow={true} // Set to true to use window scroll, false to use a specific container
                    threshold={0}>
                    <div className="df jc ac fw gp50px w90vw">
                        {devDataList.length > 0 ?
                            devDataList.map((devData) => {
                                return (
                                    <div className="matrix-card-container" key={"dev_" + devData.userId}>
                                        <Card>
                                            <div className="df js ac gp30px m15">
                                                <Avatar className="avatar100" alt={devData.firstName || ""} src={devData.profilePictureUrl || ""} />
                                                <div>
                                                    <Typography sx={{ color: 'text.primary' }} className="w300p ellipsis" gutterBottom variant="h5" component="div">
                                                        {devData.firstName ? devData.firstName : ""} {devData.lastName ? devData.lastName : ""}
                                                    </Typography>
                                                    <Typography sx={{ color: 'text.primary' }} className="w180 ellipsis" variant="body2" color="text.secondary">
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
                                    {searchMessage}
                                </Typography>
                            </div>
                        }
                    </div>
                </InfiniteScroll>
                {devListLoading ?
                    <div className="df jc ac fw gp50px w90vw">
                        {profileSkeletonList}
                    </div> : null

                }
            </div>
            <audio ref={audioRef} loop controls={false} autoPlay={true}>
                <source src={clubbedToDeath} type="audio/mp3" />
            </audio>
        </div>
    );
}

export { HomeComponent };