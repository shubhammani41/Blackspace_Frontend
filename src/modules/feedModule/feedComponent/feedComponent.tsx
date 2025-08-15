import { useCallback, useEffect, useState } from 'react';
import { MainLayoutComponent } from '../../../components/layoutComponents/mainLayoutComponent/mainLayoutComponent';
import useThemeStore from '../../../components/themeToggleBtn/store/themeStore';
import apiFunctions from '../../../constants/apiFunctions';
import { ProfilePostsComponent } from '../../profileModule/profilePostsComponent/profilePostsComponent';
import style from './feedComponent.module.scss';
import { PostDetails } from '../../../models/postData';
import { AppText } from '../../../constants/appConstants';
import { ViewType } from '../../../components/galleryComponent/galleryComponent';
import { InfiniteScrollComponent } from '../../../components/infiniteScroll/infiniteScrollComponent';
import useLoaderStore from '../../../components/globalLoader/store/globalLoaderStore';

const FeedComponent: React.FC = () => {
    const defaultPageSize: number = 6;
    const defaultPageNumber: number = 0;
    const noPostMessage = "All caught up."
    const currentTheme = useThemeStore();
    const [profilePosts, setProfilePosts] = useState<PostDetails[]>([]);
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);
    const [pageNumber, setPageNumber] = useState<number>(defaultPageNumber);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [postSearchMsg, setPostSearchMsg] = useState("");
    const errorSearchMessage: string = AppText.errorMessage;
    const loaderStore = useLoaderStore();

    const fetchPublicPosts = useCallback(async (pageSize: number, pageNumber: number) => {
        loaderStore.openLoader();
        apiFunctions.fetchPublciFeed(pageSize, pageNumber).then((res) => {
            loaderStore.closeLoader();
            if (res.data.data) {
                setTotalElements(res.data.totalElements);
                setPostSearchMsg('');
                ((pageNumber + 1) * pageSize < res.data.totalElements) ? setHasMore(true) : setHasMore(false);
                setProfilePosts(prev=>[...prev, ...res.data.data]);
            }
            else {
                setTotalElements(0);
                setProfilePosts([]);
                setPostSearchMsg(noPostMessage);
                setHasMore(false);
            }
        }).catch(err => {
            loaderStore.closeLoader();
            setTotalElements(0);
            setProfilePosts([]);
            setPostSearchMsg(errorSearchMessage);
            setHasMore(false);
        })
    }, [totalElements]);

    const onSCrollEnd = useCallback(() => {
        fetchPublicPosts(pageSize, pageNumber + 1,);
        setPageNumber(pageNumber + 1);
    }, [pageNumber, pageSize, fetchPublicPosts]);

    useEffect(() => {
        fetchPublicPosts(defaultPageSize, defaultPageNumber);
    }, [])
    return (
        <MainLayoutComponent>
            <div>
                <div className={`${style.postTabContainer} ${style.detailPostTabContainer}`}>
                    <InfiniteScrollComponent onScrollEnd={onSCrollEnd} hasMore={hasMore}>
                        <ProfilePostsComponent
                            profilePosts={profilePosts}
                            postIndex={0}
                            viewMode={ViewType.DETAILED}
                        ></ProfilePostsComponent>
                    </InfiniteScrollComponent>
                </div>
            </div>
        </MainLayoutComponent>
    )
}

export { FeedComponent };