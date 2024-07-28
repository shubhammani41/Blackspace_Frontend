import './themeToggleBtn.scss';
import whiteMoon from '../../assets/images/white-moon.svg';
import yellowSun from '../../assets/images/yellow-sun.svg';
import useThemeStore, { ThemeMode } from './store/themeStore';
import { ReactElement, useMemo } from 'react';

const ThemeToggleBtn: React.FC = () => {
    const currentTheme = useThemeStore();
    const toggle = () => {
        currentTheme.toggleTheme();
    }
    const themeMenu = useMemo<ReactElement>(() => {
        const menu = currentTheme.data.mode === ThemeMode.Light ? <div className='df jc ac btnContainer'><img className='toggleImg' src={yellowSun}></img></div> :
            <div className='df jc ac btnContainer'><img className='toggleImg' src={whiteMoon}></img></div>
        return menu;
    }, [currentTheme]);

    return (
        <div onClick={toggle} className='themeToggleBtn'>
            {themeMenu}
            Toggle Theme
        </div>
    );
}

export { ThemeToggleBtn };