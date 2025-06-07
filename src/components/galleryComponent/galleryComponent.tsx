import { PostDetails } from '../../models/postData';
import { GalleryMediaPreview } from '../galleryMediaPreview/galleryMediaPreview';
import style from './galleryComponent.module.scss';

export interface GalleryComponentProps {
    galleryItems: PostDetails[];
}

const GalleryComponent: React.FC<GalleryComponentProps> = (props: GalleryComponentProps) => {
    const { galleryItems } = props;
    return (
        <div className="row row-cols-3 row-cols-sm-6 g-1">
            {galleryItems.map((item, index) => {
                return (
                    <div key={'gallery_item_' + index} className="col">
                        <div className={style.galleryPreviewContainer}>
                            <GalleryMediaPreview previewItems={item}></GalleryMediaPreview>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export {GalleryComponent}