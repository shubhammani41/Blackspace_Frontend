import { MediaType } from '../../models/profilePosts';
import { GalleryMediaPreview } from '../galleryMediaPreview/galleryMediaPreview';
import style from './galleryComponent.module.scss';

export interface GalleryItem {
    mediaType: MediaType;
    mediaLink: string;
    thumbnailLink: string;
}
export interface GalleryComponentProps {
    galleryItems: GalleryItem[];
}

const GalleryComponent: React.FC<GalleryComponentProps> = (props: GalleryComponentProps) => {
    const { galleryItems } = props;
    return (
        <div className="row row-cols-3 row-cols-sm-4 row-cols-lg-5 g-1">
            {galleryItems.map((item, index) => {
                return (
                    <div key={'gallery_item_' + index} className="col">
                        <div className={style.galleryPreviewContainer}>
                            <GalleryMediaPreview mediaType={item.mediaType} mediaLink={item.mediaLink} thumbnailLink={item.thumbnailLink}></GalleryMediaPreview>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export {GalleryComponent}