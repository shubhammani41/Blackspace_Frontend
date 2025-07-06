import { useNavigate } from 'react-router-dom';
import { GalleryComponent, ViewType } from '../../../components/galleryComponent/galleryComponent';
import { GalleryAccountDetails } from '../../../components/galleryMediaDetailedView/galleryMediaDetailedView';
import { MediaType, mockPosts, PostDetails } from '../../../models/postData';
import style from './profilePostsComponent.module.scss';

export interface ProfilePostsProps {
    profilePosts: PostDetails[];
    accountDetails: GalleryAccountDetails;
    postIndex?: number;
    viewMode?: ViewType;
}

const ProfilePostsComponent: React.FC<ProfilePostsProps> = (props: ProfilePostsProps) => {
    const navigate = useNavigate();
    const onClickMiniItem = (item: PostDetails, itemRefs: (HTMLDivElement | null)[], index: number) => {
        navigate(`/profile/profilePosts?userName=${props.accountDetails.userName}&postIndex=${index}`);
    }
    return (
        <div className="mt-2">
            <GalleryComponent
                galleryItems={props.profilePosts}
                accountDetails={props.accountDetails}
                onClickMiniItem={onClickMiniItem} postIndex={props.postIndex ? props.postIndex : 0}
                viewType={props.viewMode ? props.viewMode : ViewType.MINI}></GalleryComponent>
        </div>
    )
}

export { ProfilePostsComponent }