import { AccordionDetails, AccordionSummary, Avatar, Button, Card, CardActions, CardContent, Chip, InputAdornment, Paper, TextField, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import styles from './searchComponent.module.scss';
import { UserData, UserSkill } from "../../../models/userData";
import SearchIcon from '@mui/icons-material/Search';
import { AppText, AppValues, useDebounce } from "../../../constants/appConstants";
import { useNavigate } from "react-router-dom";
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import useThemeStore from "../../../components/themeToggleBtn/store/themeStore";
import Accordion from '@mui/material/Accordion';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import apiFunctions from "../../../constants/apiFunctions";
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import { MainLayoutComponent } from "../../../components/layoutComponents/mainLayoutComponent/mainLayoutComponent";
import { InfiniteScrollComponent } from "../../../components/infiniteScroll/infiniteScrollComponent";
import { s3BaseUrl } from "../../../constants/sensitiveConstants";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import useLoaderStore from "../../../components/globalLoader/store/globalLoaderStore";

const SearchComponent: React.FC = () => {
    const defaultPageSize: number = 6;
    const defaultPageNumber: number = 0;
    const defaultSearchKeyWord: string = "";
    const defaultTimeout: number = AppValues.defaultLoadingTimer;
    const noProfileSearchMessage: string = "Sorry! No profiles found.";
    const defaultSearchMessage: string = "Search results will appear here."
    const errorSearchMessage: string = AppText.errorMessage;
    const navigate = useNavigate();
    const [devDataList, setDevData] = useState<UserData[]>([]);
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);
    const [pageNumber, setPageNumber] = useState<number>(defaultPageNumber);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [searchKeyWord, setSearchKeyWord] = useState<string>(defaultSearchKeyWord);
    const [searchMessage, setSearchMessage] = useState<string>('');
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const currentTheme = useThemeStore();
    const globalLoaderStore = useLoaderStore();

    const goToProfile = (event: React.MouseEvent, userName: string) => {
        event.preventDefault();
        event.stopPropagation();
        if (userName && userName.trim() !== '') {
            navigate(`/profile/viewProfile?userName=${userName}`);
        }
    }

    const fetchUserData = useCallback(async (pageSize: number, pageNumber: number, searchKeyWord: string = '') => {
        if (!searchKeyWord) {
            setTotalElements(0);
            setDevData([]);
            setHasMore(false);
            return;
        }
        if ((pageNumber === 0) || (pageNumber * pageSize < totalElements)) {
            globalLoaderStore.openLoader();
            await apiFunctions.fetchUserList(pageSize, pageNumber, searchKeyWord).then(res => {
                globalLoaderStore.closeLoader();
                if (res?.data?.data && res.data.data.length > 0) {
                    setTotalElements(res.data.totalElements);
                    setTimeout(() => {
                        setDevData(prev => [...prev, ...res.data.data]);
                    }, defaultTimeout);
                    setSearchMessage('');
                    setHasMore(true);
                } else {
                    setTotalElements(0);
                    setDevData([]);
                    setSearchMessage(noProfileSearchMessage);
                    setHasMore(false);
                }
            }).catch(err => {
                globalLoaderStore.closeLoader();
                setDevData([]);
                setSearchMessage(errorSearchMessage);
                setHasMore(false);
            })
        }
        else {
            setHasMore(false);
        }
    }, [defaultTimeout, errorSearchMessage, totalElements]);

    const debouncedSearch = useDebounce(fetchUserData, defaultTimeout);
    const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setDevData([]);
        setSearchKeyWord(event?.target?.value ?? '');
        setPageNumber(defaultPageNumber);
        setPageSize(defaultPageSize);
        setTotalElements(0);
        debouncedSearch(pageSize, defaultPageNumber, event?.target?.value ?? '');
    }, [pageSize, debouncedSearch]);

    const onSCrollEnd = useCallback(() => {
        fetchUserData(pageSize, pageNumber + 1, searchKeyWord);
        setPageNumber(pageNumber + 1);
    }, [pageNumber, pageSize, searchKeyWord, fetchUserData]);

    const handleExpansion = useCallback((event: React.MouseEvent, panel: string) => {
        event.stopPropagation();
        setExpanded(panel === expanded ? false : panel);
    }, [expanded]);

    const pinProfile = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        const pin = event.currentTarget;
        if (pin && pin.classList.contains(styles.pinned)) {
            pin.classList.remove(styles.pinned);
        }
        else {
            pin.classList.add(styles.pinned);
        }
    }

    useEffect(() => {
        if (!searchKeyWord) {
            setSearchMessage(defaultSearchMessage);
        }
    }, [searchKeyWord])

    useEffect(() => {
        setDevData([]);
        fetchUserData(pageSize, pageNumber);
    }, []);

    return (
        <MainLayoutComponent>
            <div className="mb-3">
                <TextField
                    id="searchDev"
                    helperText="Search developer profile"
                    variant="filled"
                    placeholder="e.g. Shubham Tripathi"
                    className={styles.w100per}
                    onChange={onSearch}
                    InputLabelProps={{
                        style: { color: currentTheme.data.theme.palette?.text?.primary },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon className={styles.searchIconContainer} style={{ color: currentTheme.data.theme.palette?.text?.secondary }}></SearchIcon>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            {devDataList.length > 0 ?
                <InfiniteScrollComponent onScrollEnd={onSCrollEnd} hasMore={hasMore}>
                    <Paper id="searchInfiniteScrollContainer" className={`roundedContainer ${styles.profileSearchContainer}`}>
                        {devDataList.map((devData, index) => {
                            return (
                                <div className="col-12" key={"dev_" + devData.userId}>
                                    <Accordion style={{ borderRadius: '0px' }} expanded={expanded === "accordian_" + index} onClick={(event) => { goToProfile(event, devData.userName || '') }}>
                                        <AccordionSummary
                                            expandIcon={<div className={styles.expandIconContainer}>
                                                <ArrowDropDownIcon className="headerIcoClamp2830" style={{ color: currentTheme.data.theme.palette?.text?.secondary }} onClick={(event) => handleExpansion(event, "accordian_" + index)} />
                                            </div>}
                                            aria-controls="panel2-content"
                                            id={"accordian_" + devData.userId}
                                        >
                                            <Card className="w100per">
                                                <div className={'df js ac gp30px ps-1 ' + styles.card_content_container}>
                                                    <div className={styles.avatarContainer}>
                                                        {devData.profilePictureUrl ?
                                                            <Avatar className={styles.avatar100} alt={devData.firstName || ""} src={s3BaseUrl + devData.profilePictureUrl || ""} /> :
                                                            <div className={styles.avatar100}>
                                                                <p>{devData.firstName || ""}</p>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className={styles.profileSummaryContainer} style={{ overflow: "hidden" }}>
                                                        <Typography sx={{ color: 'text.primary' }} className="ellipsis" gutterBottom variant="h5" component="div">
                                                            <VerifiedRoundedIcon className="verifiedTick" style={{ position: 'relative', top: '-2px' }}></VerifiedRoundedIcon>
                                                            {devData.firstName ? devData.firstName : ""} {devData.lastName ? devData.lastName : ""}
                                                        </Typography>
                                                        <Typography sx={{ color: 'text.primary' }} className="ellipsis" variant="body2" color="text.secondary">
                                                            {devData.positionName}
                                                        </Typography>
                                                        {devData.userExperience?.filter(exp => exp.isCurrentOrganization).map((obj, index) => {
                                                            return (<Typography className="ellipsis" variant="body2" color="text.secondary" key={'exp_' + index}>
                                                                {obj?.organizationName ? ('@' + obj?.organizationName) : ''}
                                                            </Typography>)
                                                        })}
                                                        <Typography className="ellipsis" variant="body2" color="text.secondary">
                                                            Location: {devData.cityName ? devData.cityName + "," : ""} {devData.stateName ? devData.stateName + "," : ""} {devData.cityName ? devData.countryName + "," : ""}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Card>
                                            <div className={styles.bkMarkBtnContainer}>
                                                <Button variant="text" className={styles.pinIconContainer} onClick={pinProfile}>
                                                    <BookmarkRoundedIcon style={{ color: '#aaaaaa' }} className="headerIcoClamp2426"></BookmarkRoundedIcon>
                                                </Button>
                                            </div>
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
                                                        <Button variant="contained" size="small">
                                                            <PersonAddRoundedIcon></PersonAddRoundedIcon>&nbsp;Follow
                                                        </Button>
                                                    </Tooltip>
                                                    <Tooltip title="Download">
                                                        <Button variant="contained" size="small">
                                                            <BlockRoundedIcon></BlockRoundedIcon>&nbsp;Block
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
                        })}
                    </Paper>
                </InfiniteScrollComponent>
                : <></>
            }
            {devDataList.length < 1 ?
                <div className="df jc ac fw">
                    <Typography className="ellipsis df jc ac" variant="body2" color="text.secondary">
                        {searchMessage}
                    </Typography>
                </div> : null
            }
        </MainLayoutComponent>
    );
}

export { SearchComponent };