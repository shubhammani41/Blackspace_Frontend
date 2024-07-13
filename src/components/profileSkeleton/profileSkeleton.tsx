import React from "react";
import "./profileSkeleton.scss";
import { Skeleton } from "@mui/material";

const ProfileSkeleton: React.FC = ()=>{
    return (
        <div className="skeleton-container">
            <div className="df js ac gp30px mb3px">
                <Skeleton variant="circular" className="avatar100 mb3px" width={100} height={100} animation="wave" />
                <div className="skeleton-avatar-title mb3px">
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </div>
            </div>
            <Skeleton className="mb3px" variant="rounded" height={120} animation="wave" />
        </div>
    )
}

export {ProfileSkeleton}