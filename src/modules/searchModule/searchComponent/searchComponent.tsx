import { AccordionDetails, AccordionSummary, Avatar, Button, Card, CardActions, CardContent, Chip, InputAdornment, SimplePaletteColorOptions, TextField, Tooltip, Typography } from "@mui/material";
import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import clubbedToDeath from '../../../assets/audio/clubbedToDeath.mp3';
import './searchComponent.scss';
import { UserData, UserSkill } from "../../../models/userData";
import { SearchSkeleton } from "../searchSkeleton/searchSkeleton";
import SearchIcon from '@mui/icons-material/Search';
import InfiniteScroll from 'react-infinite-scroller';
import { debounce } from 'lodash';
import { AppText, AppValues } from "../../../constants/appConstants";
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
import apiFunctions from "../../../constants/apiFunctions";

const SearchComponent: React.FC = () => {
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
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const currentTheme = useThemeStore();
    const setRedTheme = () => {
        currentTheme.setRedTheme();
    }
    const setBlueTheme = () => {
        currentTheme.setBlueTheme();
    }

    const profileSkeletonList: ReactElement[] = useMemo(() => {
        return Array(3).fill(1).map((val, index) => {
            return (<SearchSkeleton key={"profileSkeleton_" + index}></SearchSkeleton>)
        })
    }, [])

    const goToProfile = (userName: string) => {
        if (userName && userName.trim() !== '') {
            navigate(`/profile/${userName}`);
        }
    }

    const fetchUserData = useCallback(async (pageSize: number, pageNumber: number, searchKeyWord: string = '') => {
        // if (searchKeyWord) {
            setDevListLoading(true);
            apiFunctions.fetchUserList(pageSize, pageNumber, searchKeyWord).then(res => {
                if (res?.data?.data && res.data.data.length > 0) {
                    setTotalElements(res.data.totalElements);
                    setTimeout(() => {
                        setDevData(prev => [...prev, ...res.data.data]);
                    }, defaultTimeout);
                } else {
                    setTotalElements(0);
                    setDevData([]);
                    setSearchMessage(noProfileSearchMessage);
                    setHasMore(false);
                }
            }).catch(err => {
                setDevData([]);
                setSearchMessage(errorSearchMessage);
                setHasMore(false);
            })

            setTimeout(() => { setDevListLoading(false) }, defaultTimeout);
        // }
    }, [defaultTimeout, errorSearchMessage])

    const searchFn = useCallback((event: any) => {
        setSearchKeyWord(event.target.value);
        setDevData([]);
        setPageNumber(defaultPageNumber);
        setPageSize(defaultPageSize);
        setSearchMessage('');
        setTotalElements(0);
        if (event.target.value.length > 2) {
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

    const handleExpansion =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log(pageNumber, pageSize, totalElements);
            if ((pageNumber + 1) * pageSize <= totalElements && pageSize <= totalElements) {
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
        event.stopPropagation();
        event.preventDefault();
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
            {/* {(currentTheme.data.mode === ThemeMode.Blue || currentTheme.data.mode === ThemeMode.Red) ?
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
            } */}
            <div className="row gx-0">
                <div className="col-xxl-3 col-xl-3 col-lg-2 col-sm-1 col-1"></div>
                <div className="col-xxl-6 col-xl-6 col-lg-8 col-sm-10 col-10 mb-4">
                    <TextField
                        id="searchDev"
                        label="Search developer profile"
                        variant="filled"
                        placeholder="e.g. Shubham Tripathi"
                        className='w100per'
                        onChange={debouncedSearchFn}
                        InputLabelProps={{
                            style: { color: currentTheme.data.theme.palette?.text?.secondary },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon className="searchIconContainer" style={{ color: currentTheme.data.theme.palette?.text?.secondary }}></SearchIcon>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="col-xxl-3 col-xl-3 col-lg-2 col-sm-1 col-1"></div>
            </div>
            <div className="row gx-0">
                <div className="col-xxl-4 col-xl-4 col-lg-3 col-sm-2 col-1">
                </div>
                {devListLoading || (!devListLoading && devDataList.length > 0) ?
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-sm-8 col-10 roundedContainer mb-2">
                        <InfiniteScroll
                            pageStart={defaultPageNumber}
                            loadMore={debouncedLoadMore}
                            hasMore={hasMore}
                            useWindow={true} // Set to true to use window scroll, false to use a specific container
                            threshold={0}>
                            {devDataList.length > 0 ?
                                devDataList.map((devData, index) => {
                                    return (
                                        <div className="col-12" key={"dev_" + devData.userId}>
                                            <Accordion style={{ borderRadius: '0px' }} expanded={expanded === "accordian_" + devData.userId} onChange={handleExpansion("accordian_" + devData.userId)}>
                                                <AccordionSummary
                                                    expandIcon={<div className="expandIconContainer">
                                                        <ArrowDropDownIcon className="headerIcoClamp2535" style={{ color: currentTheme.data.theme.palette?.text?.secondary }} />
                                                    </div>}
                                                    aria-controls="panel2-content"
                                                    id={"accordian_" + devData.userId}
                                                >

                                                    <div className="pinIconContainer">
                                                        <PushPinRoundedIcon style={{ color: '#aaaaaa' }} className="headerIcoClamp2030" onClick={pinProfile}></PushPinRoundedIcon>
                                                    </div>
                                                    <Card className="w100per ml-neg30">
                                                        <div className="df js ac gp30px ps-1" style={{ minHeight: '85px' }}>
                                                            <Avatar className="avatar100" alt={devData.firstName || ""} src={devData.profilePictureUrl || ""} />
                                                            <div className="profileSummaryContainer" style={{ overflow: "hidden" }}>
                                                                <Typography sx={{ color: 'text.primary' }} className="ellipsis" gutterBottom variant="h5" component="div">
                                                                    <VerifiedRoundedIcon className="verifiedTick" style={{ position: 'relative', top: '-2px' }}></VerifiedRoundedIcon>
                                                                    {devData.firstName ? devData.firstName : ""} {devData.lastName ? devData.lastName : ""}
                                                                </Typography>
                                                                <Typography sx={{ color: 'text.primary' }} className="ellipsis" variant="body2" color="text.secondary">
                                                                    {devData.positionName}
                                                                </Typography>
                                                                {devData.userExperience?.filter(exp => exp.isCurrentOrganization).map(obj => {
                                                                    return (<Typography className="ellipsis" variant="body2" color="text.secondary">
                                                                        {obj?.organizationName ? ('@' + obj?.organizationName) : ''}
                                                                    </Typography>)
                                                                })}
                                                                <Typography className="ellipsis" variant="body2" color="text.secondary">
                                                                    Location: {devData.cityName ? devData.cityName + "," : ""} {devData.stateName ? devData.stateName + "," : ""} {devData.cityName ? devData.countryName + "," : ""}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Card>
                                                        <CardContent className="p-0">
                                                            <Typography className="ellipsis" variant="body2" color="text.secondary">
                                                                Experience: {devData.experience}+ years
                                                            </Typography>
                                                            {devData?.skills?.map((skill: UserSkill, index: number) => {
                                                                return <Chip sx={{ color: currentTheme.data.theme.palette?.text?.disabled }} label={skill.skillName} key={'skill_' + index} />
                                                            })}
                                                        </CardContent>
                                                        <CardActions className="px-0 py-2">
                                                            <Tooltip title="View">
                                                                <Button variant="contained" size="small" onClick={() => { goToProfile(devData.userName || '') }}>
                                                                    <VisibilityRoundedIcon></VisibilityRoundedIcon>&nbsp;View
                                                                </Button>
                                                            </Tooltip>
                                                            <Tooltip title="Download">
                                                                <Button variant="contained" size="small" onClick={() => { downloadProfile(devData.userName || '') }}>
                                                                    <DownloadRoundedIcon></DownloadRoundedIcon>&nbsp;Download
                                                                </Button>
                                                            </Tooltip>
                                                        </CardActions>
                                                    </Card>
                                                </AccordionDetails>
                                            </Accordion>
                                            {(index !== devDataList.length - 1) ? <div className="m-0" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper }}>
                                                <hr className="m-0 ms-5 me-5"></hr>
                                            </div> : null}

                                        </div>
                                    )
                                }) :
                                null
                            }
                        </InfiniteScroll>
                        {devListLoading ? profileSkeletonList : null}
                    </div> : <></>
                }

                <div className="col-xxl-4 col-xl-4 col-lg-3 col-sm-2 col-1">
                </div>
            </div>
            {!devListLoading && devDataList.length < 1 ?
                <div className="df jc ac fw">
                    <Typography className="ellipsis df jc ac" variant="body2" color="text.secondary">
                        {searchMessage}
                    </Typography>
                </div> : null
            }
            {((pageNumber + 1) * pageSize <= totalElements && pageSize <= totalElements) ?
                <div className="df jc ac fw" onClick={handleScroll}>
                    <Tooltip title="Load more">
                        <ArrowDropDownCircleRoundedIcon className="headerIcoClamp2535"></ArrowDropDownCircleRoundedIcon>
                    </Tooltip>
                </div> : null}
        </div>
    );
}

export { SearchComponent };