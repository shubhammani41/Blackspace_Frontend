import { Avatar, Typography } from "@mui/material";
import './header.scss';
import profile from '../../assets/images/profile.svg';
// import { useLocation } from "react-router-dom";

const AppHeader: React.FC = () => {
    // const location = useLocation();

    return (
        <div className="df js ac">
            <div className="df js ac">
                <Typography className="w300p ellipsis" variant="body2" color="text.secondary">
                    HOME 
                    {/* {location?.pathname ? ("> " + location.pathname) : ""} */}
                </Typography>
            </div>
            <div className="df je ac">
                <Avatar className="avatar24" alt="" src={profile} />
            </div>
        </div>
    )
}

export { AppHeader };