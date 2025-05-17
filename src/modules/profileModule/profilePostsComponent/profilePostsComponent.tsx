import { GalleryComponent } from '../../../components/galleryComponent/galleryComponent';
import { mockPosts, PostDetails } from '../../../models/profilePosts';
import style from './profilePostsComponent.module.scss';

export interface ProfilePostsProps {
    profilePosts: PostDetails[];
}

const ProfilePostsComponent: React.FC<ProfilePostsProps> = (props: ProfilePostsProps) => {
    let { profilePosts } = props;
    profilePosts = mockPosts;
    return (
        <div className="mt-4">
            <GalleryComponent galleryItems={profilePosts.map(({ postContent: [first] }) => ({
                mediaLink: first.mediaLink,
                mediaType: first.mediaType,
                thumbnailLink: first.thumbnailLink,
            }))}></GalleryComponent>
        </div>
    )
}

export { ProfilePostsComponent }