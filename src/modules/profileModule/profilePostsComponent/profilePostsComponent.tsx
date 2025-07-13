import { useNavigate } from 'react-router-dom';
import { GalleryComponent, ViewType } from '../../../components/galleryComponent/galleryComponent';
import { MediaType, mockPosts, PostDetails } from '../../../models/postData';
import style from './profilePostsComponent.module.scss';

export interface ProfilePostsProps {
    profilePosts: PostDetails[];
    postIndex?: number;
    viewMode?: ViewType;
}

const ProfilePostsComponent: React.FC<ProfilePostsProps> = (props: ProfilePostsProps) => {
    const navigate = useNavigate();
    const onClickMiniItem = (item: PostDetails, itemRefs: (HTMLDivElement | null)[], index: number) => {
        navigate(`/profile/profilePosts?userName=${props.profilePosts[0].userName}&postIndex=${index}`);
    }
    return (
        <div>
            <GalleryComponent
                galleryItems={props.profilePosts}
                onClickMiniItem={onClickMiniItem} postIndex={props.postIndex ? props.postIndex : 0}
                viewType={props.viewMode ? props.viewMode : ViewType.MINI}></GalleryComponent>
        </div>
    )
}

export { ProfilePostsComponent }