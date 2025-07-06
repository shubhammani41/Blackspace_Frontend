import { GalleryComponent } from '../../../components/galleryComponent/galleryComponent';
import { GalleryAccountDetails } from '../../../components/galleryMediaDetailedView/galleryMediaDetailedView';
import { MediaType, mockPosts, PostDetails } from '../../../models/postData';
import style from './profilePostsComponent.module.scss';

export interface ProfilePostsProps {
    profilePosts: PostDetails[];
    accountDetails: GalleryAccountDetails
}

const ProfilePostsComponent: React.FC<ProfilePostsProps> = (props: ProfilePostsProps) => {
    // const { profilePosts } = props;
    return (
        <div className="mt-2">
            <GalleryComponent galleryItems={props.profilePosts} accountDetails={props.accountDetails}></GalleryComponent>
        </div>
    )
}

export { ProfilePostsComponent }