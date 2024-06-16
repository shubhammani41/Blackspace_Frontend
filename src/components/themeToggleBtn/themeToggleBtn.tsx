import './themeToggleBtn.scss';
import whiteMoon from '../../assets/images/white-moon.svg';
import yellowSun from '../../assets/images/yellow-sun.svg';
import useThemeStore, { ThemeMode } from './store/themeStore';

const ThemeToggleBtn: React.FC = () => {
    const { data, toggleTheme } = useThemeStore();
    const bgImage:string = 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))';
    const toggle = () => {
        //chaneg redux state here
        toggleTheme();
    }
    return (
        <div onClick={toggle} className='themeToggleBtn'>
            {data.mode === ThemeMode.Light ? 
                <div className='df jc ac btnContainer'><img className='toggleImg' src={yellowSun}></img></div> : 
                <div className='df jc ac btnContainer'><img className='toggleImg' src={whiteMoon}></img></div>
            }
            Toggle Theme
        </div>
    );
}

export { ThemeToggleBtn };