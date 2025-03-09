import './menuBarBottom.scss';
import useThemeStore from "../themeToggleBtn/store/themeStore";
import { MenuBarInner } from "./menuBarInner/menuBarInner";
import { useEffect, useState } from "react";

const MenuBarBottom: React.FC = () => {

    const currentTheme = useThemeStore();
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    useEffect(() => {
            const handleScroll = () => {
                const currentScrollY = window.scrollY;
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
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
        <div className={"menuBarBottomContainer row gx-0 px-2" + (isHidden ? " bottomBarHidden" : "")} style={{ "backgroundColor": currentTheme.data.theme.palette?.background?.default }}>
            <div className="col-lg-2 col-sm-1 d-sm-block d-none">
            </div>
            <div className="col-lg-8 col-sm-10 col-12">
                <div className="menuBarBottomContainerInner df js as d-md-none" style={{ "backgroundColor": currentTheme.data.theme.palette?.background?.paper }}>
                    <MenuBarInner mode="horizontal"></MenuBarInner>
                </div>
            </div>
            <div className="col-lg-2 col-sm-1 d-sm-block d-none">
            </div>
        </div>
    )
}

export { MenuBarBottom };