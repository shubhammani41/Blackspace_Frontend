import './mainLayoutComponent.scss';
import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { MenuBarInner } from '../../menuBarBottom/menuBarInner/menuBarInner';
import useThemeStore from '../../themeToggleBtn/store/themeStore';
import { MenuBarRight } from '../../menuBarRight/menuBarRight';

export interface MainLayoutComponentProps {
    children: ReactNode[] | ReactNode;
    desktopSideBarEnabled?: boolean;
}

const MainLayoutComponent: React.FC<MainLayoutComponentProps> = (props: MainLayoutComponentProps) => {
    const currentTheme = useThemeStore();

    return (
        <div className="mainContainer">
            <div className="row gx-0 px-2">
                <div className="col-xl-1 d-lg-block d-none">
                </div>
                <div className="col-xl-10 col-sm-12 mb-2 row gx-0">
                    {props.desktopSideBarEnabled === false ?
                        <div className="col-12 mainContentContainer">
                            <div className="mb-3">
                                {props.children}
                            </div>
                        </div> :
                        <>
                            <div className="col-4 col-md-4 d-none d-sm-block">
                                <div className="roundedContainer stickyMenu me-3">
                                    <div className="px-3 pt-3 pb-2">
                                        <Typography className="headerml" variant="body2">Menu</Typography>
                                        <div className="m-0" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper }}>
                                            <hr className="m-0 mt-3"></hr>
                                        </div>
                                    </div>
                                    <MenuBarInner mode="vertical"></MenuBarInner>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-md-5 col-12 col-sm-8 mainContentContainer">
                                {props.children}
                            </div>
                            <div className="col-xxl-4 col-md-3 d-none d-md-block">
                                <div className='menuBottomContainer'>
                                    <div className="roundedContainer stickyMenuBottom ms-3">
                                        <div className="px-3 pt-3 pb-2">
                                            <Typography className="headerml" variant="body2">Chat</Typography>
                                            <div className="m-0" style={{ backgroundColor: currentTheme.data.theme.palette?.background?.paper }}>
                                                <hr className="m-0 mt-3"></hr>
                                            </div>
                                        </div>
                                        <MenuBarRight mode="vertical"></MenuBarRight>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                </div>
                <div className="col-xl-1 d-lg-block d-none">
                </div>
            </div>
        </div>
    )
}

export { MainLayoutComponent }