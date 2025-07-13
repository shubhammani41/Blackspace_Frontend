import style from './galleryMediaDetailedView.module.scss';
import React, { useCallback, useEffect, useRef, useState } from "react";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
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
    const [mediaIndex, setMediaIndex] = useState(0);
    const mediaRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [currentTouchX, setCurrentTouchX] = useState<number>(0);
    const [currentTouchXScroll, setCurrentTouchXScroll] = useState<number>(0);
    const [currentTouchYScroll, setCurrentTouchYScroll] = useState<number>(0);
    const [shouldAllowScrollX, setshouldAllowScrollX] = useState<boolean>(true);
    const [shouldAllowScrollY, setshouldAllowScrollY] = useState<boolean>(true);
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
    const slideToNext = () => {
        if (mediaRefs?.current[0]?.classList) {
            mediaRefs.current[0].classList.add(`${style.smoothScroll}`);
        }
        setMediaIndex(prev => {
            if (prev === props?.previewItems?.postContents?.length - 1) {
                return prev;
            }
            return prev + 1;
        });
    }
    const slideToPrevious = () => {
        if (mediaRefs?.current[0]?.classList) {
            mediaRefs.current[0].classList.add(`${style.smoothScroll}`);
        }
        setMediaIndex(prev => {
            if (prev === 0) {
                return prev;
            }
            return prev - 1;
        });
    }

    const playMedia = (e: React.MouseEvent<SVGSVGElement>) => {
        const parentEl = (e.currentTarget as SVGSVGElement).parentElement;
        const videoEl = parentEl?.firstChild as HTMLVideoElement;
        const playBtn = parentEl?.children[1] as SVGSVGElement;
        const pauseBtn = parentEl?.children[2] as SVGSVGElement;
        videoEl.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = '';
    }

    const pauseMedia = (e: React.MouseEvent<SVGSVGElement>) => {
        const parentEl = (e.currentTarget as SVGSVGElement).parentElement;
        const videoEl = parentEl?.firstChild as HTMLVideoElement;
        const playBtn = parentEl?.children[1] as SVGSVGElement;
        const pauseBtn = parentEl?.children[2] as SVGSVGElement;
        videoEl.pause();
        playBtn.style.display = '';
        pauseBtn.style.display = 'none';
    }

    const setCorrectMediaInPos = useCallback(() => {
        if (mediaRefs?.current[0]) {
            mediaRefs.current[0].classList.add(`${style.smoothScroll}`);
            const eleWidth = Number(window.getComputedStyle(mediaRefs.current[0]).width.split('px')[0]);
            const marginLeft = Number(window.getComputedStyle(mediaRefs.current[0]).marginLeft.split('px')[0]);
            const thresholdLeftScrollMin = eleWidth * (mediaIndex + 0.25);
            const thresholdRightScrollMin = eleWidth * ((mediaIndex - 1) + 0.75);
            if (Math.abs(marginLeft) > thresholdLeftScrollMin) {
                mediaRefs.current[0].classList.add(`${style.smoothScroll}`);
                setMediaIndex(prev => prev + 1);
                setshouldAllowScrollX(false);
            }
            else if (Math.abs(marginLeft) < thresholdRightScrollMin) {
                mediaRefs.current[0].classList.add(`${style.smoothScroll}`);
                setMediaIndex(prev => prev - 1);
                setshouldAllowScrollX(false);
            }
            else {
                const finalMarginVal = eleWidth * mediaIndex * (-1);
                mediaRefs.current[0].style.marginLeft = finalMarginVal + 'px';
            }
        }
    }, [mediaIndex]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setCurrentTouchX(e?.touches[0]?.clientX ?? 0);
        setCurrentTouchYScroll(e?.touches[0]?.clientY ?? 0);
        setCurrentTouchXScroll(e?.touches[0]?.clientX ?? 0);
    };

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (e?.touches[0].clientY && shouldAllowScrollY) {
            const touchDiffY = e.touches[0].clientY - currentTouchYScroll;
            if (Math.abs(touchDiffY) > 10) {
                setshouldAllowScrollX(false);
            }
            setCorrectMediaInPos();
        }
        if (e?.touches[0].clientX && shouldAllowScrollX) {
            const touchDiffX = e.touches[0].clientX - currentTouchXScroll;
            if (Math.abs(touchDiffX) > 10) {
                setshouldAllowScrollY(false);
            }
        }
        if (currentTouchX && e?.touches[0]?.clientX && shouldAllowScrollX && mediaRefs.current[0] && shouldAllowScrollX) {
            const touchDiffX = e.touches[0].clientX - currentTouchX;
            const marginLeft = Number(window.getComputedStyle(mediaRefs.current[0]).marginLeft.split('px')[0]);
            const eleWidth = Number(window.getComputedStyle(mediaRefs.current[0]).width.split('px')[0]);
            const calMargin = marginLeft + touchDiffX;
            const minMargin = eleWidth * ((mediaIndex < (mediaRefs.current.length - 1)) ? mediaIndex + 1 : (mediaRefs.current.length - 1)) * (-1);
            const maxMargin = eleWidth * (mediaIndex ? mediaIndex - 1 : 0) * (-1);
            let finalMarginVal = Math.min(Math.max(calMargin, minMargin), maxMargin);
            mediaRefs.current[0].classList.remove(`${style.smoothScroll}`);
            mediaRefs.current[0].style.marginLeft = finalMarginVal + 'px';
            setCurrentTouchX(e.touches[0].clientX);
        }
    }, [currentTouchX, mediaIndex, shouldAllowScrollX, currentTouchYScroll, setCorrectMediaInPos]);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        setCorrectMediaInPos();
        setCurrentTouchX(0);
        setCurrentTouchXScroll(0);
        setCurrentTouchYScroll(0);
        setshouldAllowScrollX(true);
        setshouldAllowScrollY(true);
    }, [setCorrectMediaInPos]);

    useEffect(() => {
        const handleTouchMove = (e: TouchEvent) => {
            if (!shouldAllowScrollY) {
                e.preventDefault();
            }
        };
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        return () => {
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [shouldAllowScrollY]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry) {
                        const videoEl = entry.target.firstChild as HTMLVideoElement;
                        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.6;

                        if (isVisible) {
                            videoEl.play();
                            (entry.target.children[1] as SVGSVGElement).style.display = 'none';
                            (entry.target.children[2] as SVGSVGElement).style.display = '';
                        } else {
                            videoEl.pause();
                            (entry.target.children[1] as SVGSVGElement).style.display = '';
                            (entry.target.children[2] as SVGSVGElement).style.display = 'none';
                        }
                    }
                });
            },
            { threshold: 0.6 }
        );

        mediaRefs.current.forEach((el) => {
            if (el && el.firstChild instanceof HTMLVideoElement) observer.observe(el);
        });

        return () => {
            mediaRefs.current.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);
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
                            <span style={{ color: 'white' }}>
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
                    props.previewItems.postContents.map((media, index) => {
                        return ((media.mediaType === MediaType.IMAGE) ?
                            <div key={'media_' + index} className={style.mediaContainer}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                style={{
                                    marginLeft: index === 0 ? `-${mediaIndex * 100}%` : undefined
                                }}
                                ref={(el) => (mediaRefs.current[index] = el)}>
                                <img
                                    src={s3BaseUrl + (media.thumbnailLink || media.mediaLink)}
                                    alt="media"
                                    className="top-0 start-0 w-100 h-100 object-fit-cover"
                                />

                            </div> :
                            (media.mediaType === MediaType.VIDEO) ?
                                <div key={'media_' + index} className={style.mediaContainer}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    style={{
                                        marginLeft: index === 0 ? `-${mediaIndex * 100}%` : undefined
                                    }}
                                    ref={(el) => (mediaRefs.current[index] = el)}>
                                    {media.thumbnailLink ? (
                                        <img
                                            src={s3BaseUrl + media.thumbnailLink}
                                            alt="video thumbnail"
                                            className="top-0 start-0 w-100 h-100 object-fit-cover"
                                        />
                                    ) : (
                                        <video
                                            loop
                                            muted
                                            playsInline
                                            controls
                                            preload="metadata"
                                            className="top-0 start-0 w-100 h-100 object-fit-cover"
                                        >
                                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                                        </video>
                                    )}
                                    <PlayArrowRoundedIcon className={`${style.galleryPlayIcon}`} onClick={playMedia} />
                                    <PauseRoundedIcon className={`${style.galleryPlayIcon}`} onClick={pauseMedia} />
                                </div> :
                                <></>)
                    })
                }
            </div>
            {mediaIndex > 0 ?
                <div className={style.leftArrowContainer}>
                    <ArrowBackIosRoundedIcon className={style.IcoClamp2830} style={{ color: 'white' }} onClick={slideToPrevious}></ArrowBackIosRoundedIcon>
                </div> : <></>}
            {mediaIndex < props?.previewItems?.postContents.length - 1 ?
                <div className={style.rightArrowContainer}>
                    <ArrowForwardIosRoundedIcon className={style.IcoClamp2830} style={{ color: 'white' }} onClick={slideToNext}></ArrowForwardIosRoundedIcon>
                </div> : <></>}
            <div className={style.countCircleContainer}>
                {
                    props.previewItems.postContents.length < 10 ?
                        Array.from({ length: props.previewItems.postContents.length }, (_, i) => <div key={'count_circle_' + i} className={`${style.countCircle} ${i === mediaIndex ? style.activeCicle : ''}`}></div>) :
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
