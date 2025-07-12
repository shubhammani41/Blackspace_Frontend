import style from './galleryMediaDetailedView.module.scss';
import React from "react";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { MediaType, PostDetails } from '../../models/postData';
import { s3BaseUrl } from '../../constants/sensitiveConstants';
import { Avatar, Button, Typography } from '@mui/material';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { timeAgo } from '../../constants/appConstants';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';

export interface GalleryAccountDetails {
    userName?: string;
    userId?: number;
    profilePictureUrl?: string;
}
export interface GalleryMediaDetailedViewProps {
    previewItems: PostDetails;
    accountDetails: GalleryAccountDetails;
}

const GalleryMediaDetailedView: React.FC<GalleryMediaDetailedViewProps> = (props: GalleryMediaDetailedViewProps) => {
    const pinProfile = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        const pin = event.currentTarget;
        if (pin && pin.classList.contains(style.pinned)) {
            pin.classList.remove(style.pinned);
        }
        else {
            pin.classList.add(style.pinned);
        }
    }
    return (
        <div>
            <div className={'df js ac gp30px ps-1 ' + style.card_content_container}>
                <div className={style.card_content_left}>
                    <div className={style.avatarContainer}>
                        {props?.accountDetails?.profilePictureUrl ?
                            <Avatar className={style.avatar100} alt={props.accountDetails.userName || ""} src={s3BaseUrl + props.accountDetails.profilePictureUrl || ""} /> :
                            <></>
                        }
                    </div>
                    <div className={style.profileSummaryContainer} style={{ overflow: "hidden" }}>
                        <Typography sx={{ color: 'text.primary' }} className={"ellipsis " + style.postDetailTop} gutterBottom variant="h5" component="div">
                            <VerifiedRoundedIcon className="verifiedTick" style={{ position: 'relative', top: '-2px' }}></VerifiedRoundedIcon>
                            <span style={{color: 'white'}}>
                                {props?.accountDetails?.userName ? props.accountDetails.userName : ""}
                            </span>
                        </Typography>
                    </div>
                </div>
                <div className={style.card_content_right}>
                    <MoreVertIcon className={style.IcoClamp2830}></MoreVertIcon>
                </div>
            </div>
            <div className={style.carouselMediaContainer}>
                {
                    props.previewItems.postContents.map((media) => {
                        return ((media.mediaType === MediaType.IMAGE) ?
                            <div className={style.mediaContainer}>
                                <img
                                    src={s3BaseUrl + (media.thumbnailLink || media.mediaLink)}
                                    alt="media"
                                    className="top-0 start-0 w-100 h-100 object-fit-cover"
                                />

                            </div> :
                            (media.mediaType === MediaType.VIDEO) ?
                                <div className={style.mediaContainer}>
                                    {media.thumbnailLink ? (
                                        <img
                                            src={s3BaseUrl + media.thumbnailLink}
                                            alt="video thumbnail"
                                            className="top-0 start-0 w-100 h-100 object-fit-cover"
                                        />
                                    ) : (
                                        <video
                                            src={s3BaseUrl + media.mediaLink}
                                            muted
                                            autoPlay
                                            loop
                                            playsInline
                                            preload="metadata"
                                            className="top-0 start-0 w-100 h-100 object-fit-cover"
                                        />
                                    )}
                                    <PlayArrowRoundedIcon className={style.galleryPlayIcon}
                                    />
                                </div> :
                                <></>)
                    })
                }
            </div>
            <div className={style.leftArrowContainer}>
                <ArrowBackIosRoundedIcon className={style.IcoClamp2830} style={{color: 'white'}}></ArrowBackIosRoundedIcon>
            </div>
            <div className={style.rightArrowContainer}>
                <ArrowForwardIosRoundedIcon className={style.IcoClamp2830} style={{color: 'white'}}></ArrowForwardIosRoundedIcon>
            </div>
            <div className={style.countCircleContainer}>
                {
                    props.previewItems.postContents.length < 10 ?
                        Array.from({ length: props.previewItems.postContents.length }, (_, i) => <div key={'count_circle_' + i} className={style.countCircle}></div>) :
                        Array.from({ length: 9 }, (_, i) => <div key={'count_circle_' + i} className={style.countCircle}></div>)
                }
            </div>
            <div className={style.postDetailsBottom}>
                <div className={style.postBottonActionContainer}>
                    <div className={style.actionLeftContainer}>
                        <div className={style.postReactionsContainer}>
                            <div className={`${style.reactionsIco} ${style.IcoClamp2830}`} style={{ zIndex: 3 }}>👍</div>
                            <div className={`${style.reactionsIco} ${style.IcoClamp2830}`} style={{ zIndex: 2 }}>❤️</div>
                            <div className={`${style.reactionsIco} ${style.IcoClamp2830}`} style={{ zIndex: 1 }}>😂</div>
                            {'2k+'}
                        </div>
                        <div className={style.commentActionContainer}>
                            <ChatBubbleOutlineRoundedIcon className={style.IcoClamp2830}></ChatBubbleOutlineRoundedIcon>
                            {'500+'}
                        </div>
                        <div className={style.commentActionContainer}>
                            <SendOutlinedIcon className={style.IcoClamp2830}></SendOutlinedIcon>
                        </div>
                    </div>
                    <div className={style.actionRightContainer}>
                        <Button variant="text" className={style.pinIconContainer} onClick={pinProfile}>
                            <BookmarkRoundedIcon style={{ color: '#aaaaaa' }} className="headerIcoClamp2426"></BookmarkRoundedIcon>
                        </Button>
                    </div>
                </div>
                <div>
                    <Typography sx={{ color: 'text.primary' }} className={style.postDetailTop} gutterBottom variant="h5" component="div">
                        <span className={style.postCaptionUserName}>{props?.accountDetails?.userName}</span> {props?.previewItems?.postCaption}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }} className={style.postDetailTop}>
                        {timeAgo(props?.previewItems?.createdDate)}
                    </Typography>
                </div>
            </div>
        </div>
    )
};

export { GalleryMediaDetailedView };
