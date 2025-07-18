import { useNavigate } from 'react-router-dom';
import './backButtonComponent.scss';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useMotionFramerStore } from '../../store/motionFramerAnimationStore';


const BackButtonComponent: React.FC = () => {
    const navigate = useNavigate();
    const motionFramerStore = useMotionFramerStore();
    const goBack = () => {
        motionFramerStore.setGoBackAnimation();
        setTimeout(() => {
            motionFramerStore.setGoForwardAnimation();
        }, 0)
        navigate(-1);
    }
    return <ArrowBackIosNewRoundedIcon sx={{ color: 'text.secondary' }} className="headerIcoClamp2830 me-1" onClick={goBack}></ArrowBackIosNewRoundedIcon>
}

export { BackButtonComponent }