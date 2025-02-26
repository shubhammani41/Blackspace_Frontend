import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Button, Typography } from '@mui/material';
import './menuBarInner.scss';
import useThemeStore from '../../themeToggleBtn/store/themeStore';
import FlameSvg from '../../../assets/images/flame.svg.svg';
import AddBoxIcon from '@mui/icons-material/AddBox';

export interface MenuBarInnerProps {
    mode: 'vertical'|'horizontal'
}

const MenuBarInner: React.FC<MenuBarInnerProps> = (props:MenuBarInnerProps) => {
    const currentTheme = useThemeStore();
    return (
        <div className={"menuBarInner" + ( props.mode==="horizontal"? " horizontal" : "vertical")} style={{backgroundColor: currentTheme.data.theme.palette?.background?.paper}}>
            <div className="df ac jc fw menuBarInnerItemsContainer p-2">
                <div className="df js ac menuBarInnerItems">
                    <Button className="mw0px dsBlock">
                        <DnsRoundedIcon className="menuBarInnerIcoClamp2535"></DnsRoundedIcon>
                    </Button>
                    <Typography className='menuItemLabel' variant="body2">Profiles</Typography>
                </div>
                <div className="df js ac menuBarInnerItems">
                    <Button className="mw0px dsBlock">
                        <img src={FlameSvg} alt='Trending' className="menuBarInnerIcoClamp2535"></img>
                    </Button>
                    <Typography className='menuItemLabel' variant="h5">Trending</Typography>
                </div>
                <div className="df js ac menuBarInnerItems">
                    <Button className="mw0px dsBlock">
                        <AddBoxIcon className="menuBarInnerIcoClamp2535"></AddBoxIcon>
                    </Button>
                    <Typography className='menuItemLabel' variant="body2">Add Post</Typography>
                </div>
                <div className="df js ac menuBarInnerItems">
                    <Button className="mw0px dsBlock">
                        <EmailRoundedIcon className="menuBarInnerIcoClamp2535"></EmailRoundedIcon>
                    </Button>
                    <Typography className='menuItemLabel' variant="body2">Mail</Typography>
                </div>
                <div className="df js ac menuBarInnerItems">
                    <Button className="mw0px dsBlock">
                        <SettingsOutlinedIcon className="menuBarInnerIcoClamp2535"></SettingsOutlinedIcon>
                    </Button>
                    <Typography className='menuItemLabel' variant="body2">Settings</Typography>
                </div>
            </div>
        </div>
    )
}

export { MenuBarInner }