import { ReactNode } from 'react';
import './mainBarLayoutComponent.scss';
import { AppBar } from '@mui/material';

export interface MainBarLayoutComponentProps {
    children: ReactNode[] | ReactNode;
    position?: 'TOP'|'BOTTOM';
}

const MainBarLayoutComponent: React.FC<MainBarLayoutComponentProps> = (props: MainBarLayoutComponentProps) => {
    return (
        <AppBar className={''+(props.position==='BOTTOM'?'bottom':'')} sx={{ backgroundColor: 'transparent', padding: '0px', paddingRight: '0px !important', paddingTop: '8px' }}>
            <div className="row gx-0 px-2">
                <div className="col-lg-1 d-lg-block d-none">
                </div>
                <div className="col-lg-10 col-sm-12">
                    {props.children}
                </div>
                <div className="col-lg-1 d-lg-block d-none">
                </div>
            </div>
        </AppBar>)
}

export { MainBarLayoutComponent }