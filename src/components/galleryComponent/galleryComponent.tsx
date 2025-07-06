import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { PostDetails } from '../../models/postData';
import { GalleryAccountDetails, GalleryMediaDetailedView } from '../galleryMediaDetailedView/galleryMediaDetailedView';
import { GalleryMediaPreview } from '../galleryMediaPreview/galleryMediaPreview';
import style from './galleryComponent.module.scss';
import { useEffect, useRef, useState } from 'react';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ViewAgendaRoundedIcon from '@mui/icons-material/ViewAgendaRounded';

export enum ViewType {
    "DETAILED",
    "MINI"
}

export interface GalleryComponentProps {
    galleryItems: PostDetails[];
    viewType?: ViewType;
    toggleEnabled?: boolean;
    accountDetails: GalleryAccountDetails
}

const GalleryComponent: React.FC<GalleryComponentProps> = (props: GalleryComponentProps) => {
    const itemRefs = useRef([] as (HTMLDivElement | null)[]);
    const [detailViewItemIndex, setDetailViewItemIndex] = useState(0);
    const { galleryItems } = props;
    const [viewMode, setViewMode] = useState<ViewType>(props.viewType ? props.viewType : ViewType.MINI);
    const setView = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: ViewType,
    ) => {
        setViewMode(newAlignment);
    };

    const scrollDetailModeInView = (index: number) => {
        setViewMode(ViewType.DETAILED);
        setDetailViewItemIndex(index);
    }

    useEffect(() => {
        if (viewMode === ViewType.DETAILED && detailViewItemIndex!==0) {
            itemRefs.current[detailViewItemIndex]?.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    }, [viewMode, detailViewItemIndex])

    useEffect(() => {
        setViewMode(props.viewType ? props.viewType : ViewType.MINI)
    }, [props.viewType])
    return (
        <div>
            <ToggleButtonGroup className='mb-2 ms-2'
                value='mini'
                exclusive
                onChange={setView}
                aria-label="text alignment">
                <ToggleButton value={ViewType.MINI} aria-label="mini" className={style.headerIcoClamp2830}>
                    <GridViewRoundedIcon />
                </ToggleButton>
                <ToggleButton value={ViewType.DETAILED} aria-label="detailed" className={style.headerIcoClamp2830}>
                    <ViewAgendaRoundedIcon />
                </ToggleButton>
            </ToggleButtonGroup>
            {
                (viewMode === ViewType.MINI) ?
                    <div className="row row-cols-3 row-cols-sm-6 g-1">
                        {galleryItems.map((item, index) => {
                            return (
                                <div key={'gallery_item_mini' + index} className="col">
                                    <div className={style.galleryPreviewContainer} onClick={() => scrollDetailModeInView(index)}>
                                        <GalleryMediaPreview previewItems={item}></GalleryMediaPreview>
                                    </div>
                                </div>
                            );
                        })}
                    </div> :
                    <div className={style.detailedView}>
                        {galleryItems.map((item, index) => {
                            return (
                                <div key={'gallery_item_detail' + index} className={`${style.fullWidth}`} ref={(el) => (itemRefs.current[index] = el)}>
                                    <div className={style.galleryPreviewContainer}>
                                        <GalleryMediaDetailedView previewItems={item} accountDetails={props.accountDetails}></GalleryMediaDetailedView>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            }
        </div>

    )
}

export { GalleryComponent }