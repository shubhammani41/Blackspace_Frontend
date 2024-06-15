import './themeToggleBtn.scss';
import whiteMoon from '../../assets/images/white-moon.svg';
import yellowSun from '../../assets/images/yellow-sun.svg';
import { ThemeState } from './stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeOptions } from '@mui/material';
import { ThemeMode, switchTheme } from './reducers/themeReducer';

const ThemeToggleBtn: React.FC = () => {
    const theme = useSelector((state:{ theme: ThemeOptions | any }) => state.theme);
    const dispatch = useDispatch();
    const toggleTheme = () => {
        //chaneg redux state here
        dispatch(switchTheme(ThemeMode.Toggle)); 
    }
    return (
        <div>
            <input onClick={toggleTheme} type="checkbox" className="checkbox" id="checkbox" checked={theme.mode===ThemeMode.Dark}></input>
            <label htmlFor="checkbox" className="checkbox-label">
                <img className='w15 h15' src={whiteMoon}></img>
                <img className='w15 h15' src={yellowSun}></img>
                <span className="ball"></span>
            </label>
        </div>
    );
}

export { ThemeToggleBtn };