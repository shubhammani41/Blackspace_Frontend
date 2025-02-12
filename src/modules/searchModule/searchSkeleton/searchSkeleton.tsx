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
                        <ArrowDropDownIcon className="headerIcoClamp2535" style={{ color: currentTheme.data.theme.palette?.text?.secondary }} />
                    </div>}>
                    <div className="pinIconContainer invisibile">
                        <PushPinRoundedIcon style={{ color: '#aaaaaa' }} className="headerIcoClamp2030"></PushPinRoundedIcon>
                    </div>
                    <Card className="w100per ml-neg30">
                        <div className="df js ac gp30px ps-1">
                            <Skeleton variant="circular" className="avatar100" width={100} height={100} animation="wave" />
                            <div className="profileSummaryContainer" style={{ overflow: "hidden" }}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            </div>
                        </div>
                    </Card>
                </AccordionSummary>
            </Accordion>
        </div>
    )
}

export { SearchSkeleton }