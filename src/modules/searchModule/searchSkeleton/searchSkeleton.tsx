import React from "react";
import "./searchSkeleton.scss";
import { Accordion, Skeleton } from "@mui/material";
import useThemeStore from "../../../components/themeToggleBtn/store/themeStore";
import { AccordionSummary, Card } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';

const SearchSkeleton: React.FC = () => {
    const currentTheme = useThemeStore();
    return (
        <div className="col-12">
            <Accordion style={{ borderRadius: '0px' }}>
                <AccordionSummary
                    aria-controls="panel2-content"
                    expandIcon={<div className="expandIconContainer invisibile">
                        <ArrowDropDownIcon className="headerIcoClamp2830" style={{ color: currentTheme.data.theme.palette?.text?.secondary }} />
                    </div>}>
                    <Card className="w100per">
                        <div className="df js ac gp30px ps-1">
                            <div className="avatarSkeletonContainer">
                                <Skeleton variant="circular" className="avatarSkeleton100" width={100} height={100} animation="wave" />
                            </div>
                            <div className="profileSummaryContainer" style={{ overflow: "hidden" }}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            </div>
                        </div>
                    </Card>
                    <div className="rightBtn">

                    </div>
                </AccordionSummary>
            </Accordion>
        </div>
    )
}

export { SearchSkeleton }