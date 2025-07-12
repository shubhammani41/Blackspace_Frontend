import { PostDetails } from '../../models/postData';
import { GalleryAccountDetails, GalleryMediaDetailedView } from '../galleryMediaDetailedView/galleryMediaDetailedView';
import { GalleryMediaPreview } from '../galleryMediaPreview/galleryMediaPreview';
import style from './galleryComponent.module.scss';
import { useEffect, useRef, useState } from 'react';

export enum ViewType {
    "MINI",
    "DETAILED"
}

export interface GalleryComponentProps {
    galleryItems: PostDetails[];
    viewType?: ViewType;
    toggleEnabled?: boolean;
    accountDetails: GalleryAccountDetails;
    postIndex?: number;
    onClickMiniItem?: (item: PostDetails, itemRefs: (HTMLDivElement | null)[], index: number) => void
    onClickDetailedItem?: (item: PostDetails, itemRefs: (HTMLDivElement | null)[], index: number) => void
}

const GalleryComponent: React.FC<GalleryComponentProps> = (props: GalleryComponentProps) => {
    const itemRefs = useRef([] as (HTMLDivElement | null)[]);
    const { galleryItems } = props;

    const onClickMiniItem = (item: PostDetails, itemRefs: (HTMLDivElement | null)[], index: number) => {
        if (props.onClickMiniItem) {
            props.onClickMiniItem(item, itemRefs, index);
        }
    }

    const onClickDetailedItem = (item: PostDetails, itemRefs: (HTMLDivElement | null)[], index: number) => {
        if (props.onClickDetailedItem) {
            props.onClickDetailedItem(item, itemRefs, index);
        }
    }

    const scrollToIndex = (index: number) => {
        itemRefs.current[index]?.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    useEffect(() => {
        if (props.viewType === ViewType.DETAILED && props.postIndex && props.postIndex > 0) {
            scrollToIndex(props.postIndex);
        }
    }, [props.postIndex, props.viewType, props.galleryItems])

    return (
        (!props.viewType) ?
            <div className={`row row-cols-3 row-cols-sm-6 g-1 ${props.viewType}`}>
                {galleryItems.map((item, index) => {
                    return (
                        <div key={'gallery_item_mini' + index} className="col">
                            <div className={style.galleryPreviewContainer} onClick={() => onClickMiniItem(item, itemRefs.current, index)}>
                                <GalleryMediaPreview previewItems={item}></GalleryMediaPreview>
                            </div>
                        </div>
                    );
                })}
            </div> :
            <div className={style.detailedView}>
                {galleryItems.map((item, index) => {
                    return (
                        <div key={'gallery_item_detail' + index} className={`${style.fullWidth} ${props.viewType}`} ref={(el) => (itemRefs.current[index] = el)}>
                            <div className={style.galleryDetailedPreviewContainer} onClick={() => onClickDetailedItem(item, itemRefs.current, index)}>
                                <GalleryMediaDetailedView previewItems={item} accountDetails={props.accountDetails}></GalleryMediaDetailedView>
                            </div>
                        </div>
                    );
                })}
            </div>

    )
}

export { GalleryComponent }