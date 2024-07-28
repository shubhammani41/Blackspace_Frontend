import './themeToggleBtn.scss';
import redPill from '../../assets/images/red_pill.svg';
import bluePill from '../../assets/images/blue_pill.svg';
import useThemeStore, { ThemeMode } from './store/themeStore';
import { ReactElement, useMemo } from 'react';

const MatrixEasterEggToggleBtn: React.FC = () => {
    const currentTheme = useThemeStore();
    const toggle = () => {
        currentTheme.setRedTheme();
    }
    const themeMenu = useMemo<ReactElement>(() => {
        return <div className='df jc ac btnContainer'>
            <img className='toggleImg matrixPillIcon' src={redPill}></img>
            <img className='toggleImg matrixPillIcon' src={bluePill}></img>
            </div>
    }, [currentTheme]);

    return (
        <div onClick={toggle} className='themeToggleBtn'>
            {themeMenu}
            Easter Egg
        </div>
    );
}

export { MatrixEasterEggToggleBtn };