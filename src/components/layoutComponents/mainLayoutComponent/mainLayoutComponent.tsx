import './mainLayoutComponent.scss';
import { ReactNode } from 'react';
import { MenuBarBottom } from '../../menuBarBottom/menuBarBottom';
import { Typography } from '@mui/material';
import { MenuBarInner } from '../../menuBarBottom/menuBarInner/menuBarInner';
import useThemeStore from '../../themeToggleBtn/store/themeStore';

export interface MainLayoutComponentProps {
    children: ReactNode[] | ReactNode;
    mobileBottomBarEnabled?: boolean;
    desktopSideBarEnabled?: boolean;
}

const MainLayoutComponent: React.FC<MainLayoutComponentProps> = (props: MainLayoutComponentProps) => {
    const currentTheme = useThemeStore();

    return (
        <div className="mainContainer">
            {props.mobileBottomBarEnabled === false ? <></> : <MenuBarBottom></MenuBarBottom>}
            <div className="row gx-0 px-2">
                <div className="col-xxl-3 col-xl-2 col-lg-1 d-lg-block d-none">
                </div>
                <div className="col-xxl-6 col-xl-8 col-lg-10 col-sm-12 mb-2 row gx-0">
                    {props.desktopSideBarEnabled === false ?
                        <div className="col-12 mainContentContainer">
                            <div className="mb-3">
                                {props.children}
                            </div>
                        </div> :
                        <>
                            <div className="col-4 d-none d-md-block">
                                <div className="roundedContainer stickyMenu me-3" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper }}>
                                    <div className="px-3 pt-2">
                                        <Typography className="headerml" variant="body2">Menu</Typography>
                                    </div>
                                    <MenuBarInner mode="vertical"></MenuBarInner>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 mainContentContainer">
                                {props.children}
                            </div>
                        </>
                    }

                </div>
                <div className="col-xxl-3 col-xl-2 col-lg-1 d-lg-block d-none">
                </div>
            </div>
        </div>
    )
}

export { MainLayoutComponent }