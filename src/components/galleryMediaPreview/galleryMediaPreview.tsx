import style from './galleryMediaPreview.module.scss';
import React from "react";
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import { MediaType } from '../../models/postData';
import { s3BaseUrl } from '../../constants/sensitiveConstants';

export interface GalleryMediaPreviewProps {
    mediaType: MediaType;
    mediaLink: string;
    thumbnailLink?: string;
}

const GalleryMediaPreview: React.FC<GalleryMediaPreviewProps> = (props: GalleryMediaPreviewProps) => {
    const { mediaType, mediaLink, thumbnailLink } = props;
    if (mediaType === MediaType.IMAGE) {
        return (
            <img
                src={s3BaseUrl + (thumbnailLink || mediaLink)}
                alt="media"
                className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
            />
        );
    }
    if (mediaType === MediaType.VIDEO) {
        return (
            <>
                {thumbnailLink ? (
                    <img
                        src={s3BaseUrl + thumbnailLink}
                        alt="video thumbnail"
                        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                    />
                ) : (
                    <video
                        src={s3BaseUrl + mediaLink}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                    />
                )}
                <PlayCircleRoundedIcon className={style.galleryPlayIcon}
                />
            </>
        );
    }
    return null;
};

export { GalleryMediaPreview };
