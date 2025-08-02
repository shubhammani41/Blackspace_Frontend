import { ReactNode } from 'react';
import './mainBarLayoutComponent.scss';
import { AppBar } from '@mui/material';
import useThemeStore from '../../themeToggleBtn/store/themeStore';

export interface MainBarLayoutComponentProps {
    children: ReactNode[] | ReactNode;
    position?: 'TOP'|'BOTTOM';
}

const MainBarLayoutComponent: React.FC<MainBarLayoutComponentProps> = (props: MainBarLayoutComponentProps) => {
    const themeStore = useThemeStore();
    return (
        <AppBar className={''+(props.position==='BOTTOM'?'bottom':'')} sx={{ backgroundColor: themeStore.data.theme.palette?.background?.paper, padding: '0px', paddingRight: '0px !important', paddingTop: '8px' }}>
            <div className="row gx-0">
                <div className="col-xl-1 d-lg-block d-none">
                </div>
                <div className="col-xl-10 col-sm-12">
                    {props.children}
                </div>
                <div className="col-xl-1 d-lg-block d-none">
                </div>
            </div>
        </AppBar>)
}

export { MainBarLayoutComponent }