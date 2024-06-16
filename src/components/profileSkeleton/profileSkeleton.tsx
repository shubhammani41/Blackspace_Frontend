import React from "react";
import "./profileSkeleton.scss";
import { Skeleton } from "@mui/material";

const ProfileSkeleton: React.FC = ()=>{
    return (
        <div className="skeleton-container">
            <div className="df js ac gp30px mrg">
                <Skeleton variant="circular" width={100} height={100} animation="wave" />
                <div className="skeleton-avatar-title">
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </div>
            </div>
            <Skeleton variant="rounded" height={160} animation="wave" />
        </div>
    )
}

export {ProfileSkeleton}