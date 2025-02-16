import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Button, Typography } from '@mui/material';
import './sideBarInner.scss';
import useThemeStore from '../../themeToggleBtn/store/themeStore';

const SideBarInner: React.FC = () => {
    const currentTheme = useThemeStore();
    return (
        <div className="sidebarInner" style={{backgroundColor: currentTheme.data.theme.palette?.background?.paper}}>
            <div className="df ac jc fw flxcol sideBarInnerItemsContainer">
                <div className="df js ac sideBarInnerItems">
                    <Button className="mw0px dsBlock">
                        <DnsRoundedIcon className="sideBarIcoClamp2535"></DnsRoundedIcon>
                    </Button>
                    <Typography variant="body2">Profiles</Typography>
                </div>
                <div className="df js ac sideBarInnerItems">
                    <Button className="mw0px dsBlock">
                        <PushPinRoundedIcon className="sideBarIcoClamp2535"></PushPinRoundedIcon>
                    </Button>
                    <Typography variant="h5">Pins</Typography>
                </div>
                <div className="df js ac sideBarInnerItems">
                    <Button className="mw0px dsBlock">
                        <ArticleRoundedIcon className="sideBarIcoClamp2535"></ArticleRoundedIcon>
                    </Button>
                    <Typography variant="body2">Posts</Typography>
                </div>
                <div className="df js ac sideBarInnerItems">
                    <Button className="mw0px dsBlock">
                        <EmailRoundedIcon className="sideBarIcoClamp2535"></EmailRoundedIcon>
                    </Button>
                    <Typography variant="body2">Mail</Typography>
                </div>
                <div className="df js ac sideBarInnerItems">
                    <Button className="mw0px dsBlock">
                        <SettingsOutlinedIcon className="sideBarIcoClamp2535"></SettingsOutlinedIcon>
                    </Button>
                    <Typography variant="body2">Settings</Typography>
                </div>
            </div>
        </div>
    )
}

export { SideBarInner }