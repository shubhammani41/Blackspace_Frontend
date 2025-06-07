import { GalleryComponent } from '../../../components/galleryComponent/galleryComponent';
import { MediaType, mockPosts, PostDetails } from '../../../models/postData';
import style from './profilePostsComponent.module.scss';

export interface ProfilePostsProps {
    profilePosts: PostDetails[];
}

const ProfilePostsComponent: React.FC<ProfilePostsProps> = (props: ProfilePostsProps) => {
    // const { profilePosts } = props;
    return (
        <div className="mt-4">
            <GalleryComponent galleryItems={props.profilePosts}></GalleryComponent>
        </div>
    )
}

export { ProfilePostsComponent }