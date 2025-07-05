import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { PostDetails } from '../../models/postData';
import { GalleryMediaDetailedView } from '../galleryMediaDetailedView/galleryMediaDetailedView';
import { GalleryMediaPreview } from '../galleryMediaPreview/galleryMediaPreview';
import style from './galleryComponent.module.scss';
import { useEffect, useState } from 'react';
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
}

const GalleryComponent: React.FC<GalleryComponentProps> = (props: GalleryComponentProps) => {
    const { galleryItems } = props;
    const [viewMode, setViewMode] = useState<ViewType>(props.viewType ? props.viewType : ViewType.MINI);
    const setView = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: ViewType,
    ) => {
        setViewMode(newAlignment);
    };

    useEffect(() => {
        setViewMode(props.viewType ? props.viewType : ViewType.MINI)
    }, [props.viewType])
    return (
        <div>
            <ToggleButtonGroup className='mb-2'
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
            <div className="row row-cols-3 row-cols-sm-6 g-1">
                {galleryItems.map((item, index) => {
                    return (
                        <div key={'gallery_item_' + index} className="col">
                            <div className={style.galleryPreviewContainer}>
                                {
                                    (!props.viewType || props.viewType === ViewType.MINI) ?
                                        <GalleryMediaPreview previewItems={item}></GalleryMediaPreview> :
                                        <GalleryMediaDetailedView previewItems={item}></GalleryMediaDetailedView>
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}

export { GalleryComponent }