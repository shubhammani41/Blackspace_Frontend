import { AccordionDetails, AccordionSummary, Avatar, Box, Button, Card, CardActions, CardContent, Chip, SimplePaletteColorOptions, TextField, Tooltip, Typography } from "@mui/material";
import React, { ReactElement, ReactNode, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import clubbedToDeath from '../../../assets/audio/clubbedToDeath.mp3';
import './homeComponent.scss';
import { UserData } from "../../../models/userData";
import axiosInstance from "../../../config/axiosConfig";
import { ProfileSkeleton } from "../../../components/profileSkeleton/profileSkeleton";
import SearchIcon from '@mui/icons-material/Search';
import { apiConstants } from "../../../constants/apiConstants";
import InfiniteScroll from 'react-infinite-scroller';
import { debounce } from 'lodash';
import { AppText, AppValues, transformUserData } from "../../../constants/appConstants";
import { useNavigate } from "react-router-dom";
import VisibilityRoundedIcon from '@mui/icons-material/Visibility';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { DownloadableProfileComponent } from "../../profileModule/downloadableProfileComponent/downloadableProfileComponent";
import { createRoot, Root } from "react-dom/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import morpheus from "../../../assets/images/morpheus.png";
import useThemeStore, { ThemeMode } from "../../../components/themeToggleBtn/store/themeStore";
import ArrowDropDownCircleRoundedIcon from '@mui/icons-material/ArrowDropDownCircleRounded';
import Accordion from '@mui/material/Accordion';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const HomeComponent: React.FC = () => {
    const defaultPageSize: number = 6;
    const defaultPageNumber: number = 0;
    const defaultSearchKeyWord: string = "";
    const defaultTimeout: number = AppValues.defaultLoadingTimer;
    const noProfileSearchMessage: string = "Sorry! No profiles found.";
    const errorSearchMessage: string = AppText.errorMessage;
    const navigate = useNavigate();
    const [devDataList, setDevData] = useState<UserData[]>([]);
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);
    const [pageNumber, setPageNumber] = useState<number>(defaultPageNumber);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [devListLoading, setDevListLoading] = useState<boolean>(false);
    const [isPDFLoaded, setIsPDFLoaded] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [searchKeyWord, setSearchKeyWord] = useState<string>(defaultSearchKeyWord);
    const [searchMessage, setSearchMessage] = useState<string>('');
    const [userFullName, setUserFullName] = useState<string>('');
    const container = useRef<HTMLElement>();
    const root = document.getElementById('root');
    const downloadContainer = useRef<Root>();
    const pinRef = useRef(null);

    const currentTheme = useThemeStore();
    const setRedTheme = () => {
        currentTheme.setRedTheme();
    }
    const setBlueTheme = () => {
        currentTheme.setBlueTheme();
    }

    const profileSkeletonList: ReactElement[] = useMemo(() => {
        return Array(4).fill(1).map((val, index) => {
            return (<ProfileSkeleton key={"profileSkeleton_" + index}></ProfileSkeleton>)
        })
    }, [])

    const goToProfile = (userName: string) => {
        if (userName && userName.trim() !== '') {
            navigate(`/profile/${userName}`);
        }
    }

    const transformDevDataList = useMemo(() => {
        return transformUserData;
    }, []);

    const fetchUserData = useCallback(async (pageSize: number, pageNumber: number, searchKeyWord: string = '') => {
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
            if (response?.data?.data) {
                setTotalElements(response.data.totalElements);
                setTimeout(() => {
                    setDevData(prev => [...prev, ...transformDevDataList(response.data.data)]);
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
    }, [defaultTimeout, errorSearchMessage, transformDevDataList])

    const searchFn = useCallback((event: any) => {
        setSearchKeyWord(event.target.value);
        if (event.target.value === '' || event.target.value.length > 2) {
            setDevData([]);
            setPageNumber(defaultPageNumber);
            setPageSize(defaultPageSize);
            fetchUserData(defaultPageSize, defaultPageNumber, event.target.value);
        }
    }, [fetchUserData])

    const debouncedSearchFn = useMemo(() => {
        return debounce(searchFn, defaultTimeout);
    }, [defaultTimeout, searchFn])

    const loadMore = useMemo(() => {
        return () => {
            setPageNumber(prevPageNumber => {
                setHasMore(prevHasMore => {
                    if (prevHasMore) {
                        fetchUserData(pageSize, prevPageNumber + 1, searchKeyWord);
                    }
                    return false;
                });
                return prevPageNumber + 1;
            })
        }
    }, [searchKeyWord, fetchUserData, pageSize]);

    const debouncedLoadMore = useMemo(() => {
        return debounce(loadMore, defaultTimeout)
    }, [loadMore, defaultTimeout])

    const handleScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log(pageNumber, pageSize, totalElements);
            if (pageNumber * pageSize <= totalElements && pageSize <= totalElements) {
                setHasMore(true);
            } else {
                setHasMore(false);
            }
        }
    }, [pageNumber, pageSize, totalElements]);

    const downloadProfile = (userName: string) => {
        if (root) {
            container.current = document.createElement('div');
            root.appendChild(container.current);
            downloadContainer.current = createRoot(container.current);
            downloadContainer.current.render(<DownloadableProfileComponent userName={userName} setIsPDFLoaded={setIsPDFLoaded} setUserFullName={setUserFullName} />);
        }
    };

    const generateAndDownloadPdf = useCallback(() => {
        if (container?.current && root) {
            html2canvas(container.current as HTMLElement, {
                allowTaint: true, useCORS: true, width: 1000, // Set the width of the canvas
                height: 1414
            }).then((canvas) => {
                var imgData = canvas.toDataURL('image/png');
                console.log(imgData)
                var imgWidth = 400;
                var pageHeight = 480;
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight;
                const pdf = new jsPDF({
                    orientation: "p", // Portrait orientation
                    unit: "mm", // Units in millimeters
                    format: [imgWidth, pageHeight], // Custom page size
                });
                var position = 0;

                pdf.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                pdf.save(`${userFullName}-CV-${moment().format("YYYYDDMM")}.pdf`);
                if (downloadContainer?.current) { downloadContainer.current.unmount(); }
                if (container?.current) { root.removeChild(container.current); }
            });
        }
    }, [container, root, userFullName]);

    const pinProfile = (event: any) => {
        const pin = event.currentTarget;
        if (pin && pin.classList.contains("pinned")) {
            pin.classList.remove("pinned");
        }
        else {
            pin.classList.add("pinned");
        }
    }

    useEffect(() => {
        if (isPDFLoaded) {
            generateAndDownloadPdf();
            setIsPDFLoaded(false);
        }
    }, [isPDFLoaded])

    useEffect(() => {
        console.log(hasMore);
    }, [hasMore])

    useEffect(() => {
        window.removeEventListener('scrollend', handleScroll);
        window.addEventListener('scrollend', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        setDevData([]);
        fetchUserData(pageSize, pageNumber);
        return () => {
            window.removeEventListener('scrollend', handleScroll);
            debouncedSearchFn.cancel();
            debouncedLoadMore.cancel();
        }
    }, []);

    return (
        <div className="mainContainer">
            {(currentTheme.data.mode === ThemeMode.Blue || currentTheme.data.mode === ThemeMode.Red) ?
                <div className='df jc ac app-header fw'>
                    <div className="f100 df jc ac">
                        <img className="morpheusThemer" src={morpheus}></img>
                    </div>
                    <div className="f100 df jc ac">
                        <button className="redPillThemeBtn" onClick={setRedTheme}></button>
                        <button className="bluePillThemeBtn" onClick={setBlueTheme}></button>
                    </div>
                    <p className='header f100 df jc ac' style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                        Welcome, Neo. Choose a pill.
                    </p>
                </div> :
                <div className='df jc ac app-header fw'>
                    <p className='header f100 df jc ac' style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}>
                        Welcome to Blackspace.
                    </p>
                </div>
            }
            <div className='df jc ac mb40 searchBarContainer'>
                <SearchIcon className="searchIconContainer"></SearchIcon>
                <TextField
                    id="searchDev"
                    label="Search developer profile"
                    variant="filled"
                    placeholder="e.g. Shubham Tripathi"
                    className='searchBar'
                    onChange={debouncedSearchFn}
                    InputLabelProps={{
                        style: { color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main },
                    }}
                />
            </div>
            <div className="matrix-card-list">
                <InfiniteScroll className="mb40"
                    pageStart={defaultPageNumber}
                    loadMore={debouncedLoadMore}
                    hasMore={hasMore}
                    useWindow={true} // Set to true to use window scroll, false to use a specific container
                    threshold={0}>
                    <div className="w50vw">
                        <div className="row">
                            {devDataList.length > 0 ?
                                devDataList.map((devData, index) => {
                                    return (
                                        <div className="col-12" key={"dev_" + devData.userId}>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ArrowDropDownIcon style={{ color: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }} />}
                                                    aria-controls="panel2-content"
                                                    id="panel2-header"
                                                >
                                                    <Card className="w100per">
                                                        <div className="df js ac gp30px">
                                                            <Avatar className="avatar100" alt={devData.firstName || ""} src={devData.profilePictureUrl || ""} />
                                                            <div className="w80per">
                                                                <Typography sx={{ color: 'text.primary' }} className="w90per ellipsis" gutterBottom variant="h5" component="div">
                                                                    <VerifiedRoundedIcon sx={{ color: 'secondary.main' }} style={{ position: 'relative', top: '-2px' }}></VerifiedRoundedIcon>
                                                                    {devData.firstName ? devData.firstName : ""} {devData.lastName ? devData.lastName : ""}
                                                                </Typography>
                                                                <Typography sx={{ color: 'text.primary' }} className="w90per ellipsis" variant="body2" color="text.secondary">
                                                                    {devData.positionName}
                                                                </Typography>
                                                                <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                                    Location: {devData.cityName ? devData.cityName + "," : ""} {devData.stateName ? devData.stateName + "," : ""} {devData.cityName ? devData.countryName + "," : ""}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                    <div className="pinIconContainer">
                                                        <PushPinRoundedIcon className="headerIcoClamp2535" onClick={pinProfile}></PushPinRoundedIcon>
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Card>
                                                        <CardContent className="pb3px pt3px">
                                                            <Typography className="w90per ellipsis" variant="body2" color="text.secondary">
                                                                Experience: {devData.experience}+ years
                                                            </Typography>
                                                            {devData?.skills?.map((skill: String, index: number) => {
                                                                return <Chip className="lightGrayChip" label={skill} key={index} />
                                                            })}
                                                        </CardContent>
                                                        <CardActions className="pt3px">
                                                            <Tooltip title="View">
                                                                <Button variant="contained" size="small" className="icon40Btn" onClick={() => { goToProfile(devData.userName) }}>
                                                                    <VisibilityRoundedIcon></VisibilityRoundedIcon>
                                                                </Button>
                                                            </Tooltip>
                                                            <Tooltip title="Download">
                                                                <Button variant="contained" size="small" className="icon40Btn" onClick={() => { downloadProfile(devData.userName) }}>
                                                                    <DownloadRoundedIcon></DownloadRoundedIcon>
                                                                </Button>
                                                            </Tooltip>
                                                        </CardActions>
                                                    </Card>
                                                </AccordionDetails>
                                            </Accordion>
                                            {(index!=devDataList.length-1)?<div className="m-0" style= {{ backgroundColor: currentTheme.data.theme.palette?.background?.paper}}>
                                                <hr className="m-0 ms-5 me-5"></hr>
                                            </div>:null}
                                            
                                        </div>
                                    )
                                }) :
                                <div className="df jc ac">
                                    <Typography className="ellipsis df jc ac" variant="body2" color="text.secondary">
                                        {searchMessage}
                                    </Typography>
                                </div>
                            }
                        </div>
                    </div>
                </InfiniteScroll>
                {devListLoading ?
                    <div className="df jc ac fw gp50px w90vw">
                        {profileSkeletonList}
                    </div> : null

                }
            </div>
            {(pageNumber * pageSize <= totalElements && pageSize <= totalElements) ?
                <div className="df jc ac fw" onClick={handleScroll}>
                    <Tooltip title="Load more">
                        <ArrowDropDownCircleRoundedIcon className="headerIcoClamp2535"></ArrowDropDownCircleRoundedIcon>
                    </Tooltip>
                </div> : null}
        </div>
    );
}

export { HomeComponent };