import './menuBarBottom.scss';
import useThemeStore from "../themeToggleBtn/store/themeStore";
import { MenuBarInner } from "./menuBarInner/menuBarInner";
import { useEffect, useState } from "react";
import { MainBarLayoutComponent } from '../layoutComponents/mainBarLayoutComponent/mainBarLayoutComponent';

const MenuBarBottom: React.FC = () => {

    const currentTheme = useThemeStore();
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 10) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={"menuBarBottomContainer row gx-0 px-2" + (isHidden ? " bottomBarHidden" : "")} style={{ "backgroundColor": 'transparent' }}>
            <MainBarLayoutComponent position='BOTTOM'>
                <div className="menuBarBottomContainerInner df js as d-sm-none" style={{ "backgroundColor": currentTheme.data.theme.palette?.background?.paper }}>
                    <MenuBarInner mode="horizontal"></MenuBarInner>
                </div>
            </MainBarLayoutComponent>
        </div>
    )
}

export { MenuBarBottom };