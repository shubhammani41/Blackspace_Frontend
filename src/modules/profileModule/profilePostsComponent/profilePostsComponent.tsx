import { GalleryComponent } from '../../../components/galleryComponent/galleryComponent';
import { mockPosts, PostDetails } from '../../../models/postData';
import style from './profilePostsComponent.module.scss';

export interface ProfilePostsProps {
    profilePosts: PostDetails[];
}

const ProfilePostsComponent: React.FC<ProfilePostsProps> = (props: ProfilePostsProps) => {
    // const { profilePosts } = props;
    return (
        <div className="mt-4">
            <GalleryComponent galleryItems={props.profilePosts.map(({ postContents: [first] }) => ({
                mediaLink: first.mediaLink,
                mediaType: first.mediaType,
                thumbnailLink: first.thumbnailLink,
            }))}></GalleryComponent>
        </div>
    )
}

export { ProfilePostsComponent }