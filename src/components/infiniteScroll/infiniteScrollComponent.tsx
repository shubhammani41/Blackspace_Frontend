import InfiniteScroll from 'react-infinite-scroller';
import './infiniteScrollComponent.scss';
import { ReactNode, useCallback, useEffect } from 'react';
import ArrowDropDownCircleRoundedIcon from '@mui/icons-material/ArrowDropDownCircleRounded';
import { Button, Tooltip } from '@mui/material';

export interface InfiniteScrollComponentProps {
    children?: ReactNode | ReactNode[];
    hasMore?: boolean;
    onScrollEnd?: () => any;
}
const InfiniteScrollComponent: React.FC<InfiniteScrollComponentProps> = (props: InfiniteScrollComponentProps) => {
    const { children, onScrollEnd, hasMore } = props;

    const scrollEnd = useCallback(() => {
        if (onScrollEnd) {
            onScrollEnd();
        }
    }, [onScrollEnd]);

    const handleScroll = useCallback(() => {
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
            scrollEnd();
        }
    }, [scrollEnd])

    useEffect(() => {
        window.removeEventListener('scroll', handleScroll);
        if (hasMore) {
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [hasMore, handleScroll]);
    return (
        <>
            <InfiniteScroll
                pageStart={0}
                loadMore={() => { return false }}
                hasMore={false}
                useWindow={true}
                threshold={0}>
                {children}
            </InfiniteScroll>
            {props.hasMore ? <div className="loadMoreBtnContainer m-3" onClick={onScrollEnd}>
                <Tooltip title="Load more">
                    <Button variant='text'>
                        <ArrowDropDownCircleRoundedIcon className="headerIcoClamp2830"></ArrowDropDownCircleRoundedIcon>
                    </Button>
                </Tooltip>
            </div> : <></>}
        </>
    )
}

export { InfiniteScrollComponent }