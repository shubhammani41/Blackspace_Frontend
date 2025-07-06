import style from './galleryMediaDetailedView.module.scss';
import React from "react";
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import { MediaType, PostDetails } from '../../models/postData';
import { s3BaseUrl } from '../../constants/sensitiveConstants';

export interface GalleryAccountDetails{
    userName?: string;
    userId?: number;
    profilePictureUrl?: string;
}
export interface GalleryMediaDetailedViewProps {
    previewItems: PostDetails;
    accountDetails: GalleryAccountDetails;
}

const GalleryMediaDetailedView: React.FC<GalleryMediaDetailedViewProps> = (props: GalleryMediaDetailedViewProps) => {
    if (props.previewItems.postContents[0].mediaType === MediaType.IMAGE) {
        return (
            <div>
                <img
                    src={s3BaseUrl + (props.previewItems.postContents[0].thumbnailLink || props.previewItems.postContents[0].mediaLink)}
                    alt="media"
                    className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                />
                <div className={style.countCircleContainer}>
                    {
                        props.previewItems.postContents.length < 10 ?
                        Array.from({ length: props.previewItems.postContents.length }, (_, i) => <div key={'count_circle_'+i} className={style.countCircle}></div>) :
                        Array.from({ length: 9 }, (_, i) => <div key={'count_circle_'+i} className={style.countCircle}></div>)
                    }
                </div>
            </div>
        );
    }
    if (props.previewItems.postContents[0].mediaType === MediaType.VIDEO) {
        return (
            <div>
                {props.previewItems.postContents[0].thumbnailLink ? (
                    <img
                        src={s3BaseUrl + props.previewItems.postContents[0].thumbnailLink}
                        alt="video thumbnail"
                        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                    />
                ) : (
                    <video
                        src={s3BaseUrl + props.previewItems.postContents[0].mediaLink}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                    />
                )}
                 <div className={style.countCircleContainer}>
                    {
                        props.previewItems.postContents.length < 10 ?
                        Array.from({ length: props.previewItems.postContents.length }, (_, i) => <div key={'count_circle_'+i} className={style.countCircle}></div>) :
                        Array.from({ length: 9 }, (_, i) => <div key={'count_circle_'+i} className={style.countCircle}></div>)
                    }
                </div>
                <PlayCircleRoundedIcon className={style.galleryPlayIcon}
                />
            </div>
        );
    }
    return null;
};

export { GalleryMediaDetailedView };
