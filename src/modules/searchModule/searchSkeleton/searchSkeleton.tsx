import React from "react";
import styles from "./searchSkeleton.module.scss";
import { Accordion, Skeleton } from "@mui/material";
import useThemeStore from "../../../components/themeToggleBtn/store/themeStore";
import { AccordionSummary, Card } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SearchSkeleton: React.FC = () => {
    const currentTheme = useThemeStore();
    return (
        <div className="col-12">
            <Accordion style={{ borderRadius: '0px' }}>
                <AccordionSummary
                    aria-controls="panel2-content"
                    expandIcon={<div className={`${styles.expandIconContainer} invisibile`}>
                        <ArrowDropDownIcon className="headerIcoClamp2830" style={{ color: currentTheme.data.theme.palette?.text?.secondary }} />
                    </div>}>
                    <Card className={styles.w100per}>
                        <div className={'df js ac gp30px ps-1 ' + styles.card_content_container}>
                            <div className={styles.avatarSkeletonContainer}>
                                <Skeleton variant="circular" className={styles.avatarSkeleton100} width={100} height={100} animation="wave" />
                            </div>
                            <div className={styles.profileSummaryContainer} style={{ overflow: "hidden" }}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            </div>
                        </div>
                    </Card>
                    <div className={styles.rightBtn}>

                    </div>
                </AccordionSummary>
            </Accordion>
        </div>
    )
}

export { SearchSkeleton }