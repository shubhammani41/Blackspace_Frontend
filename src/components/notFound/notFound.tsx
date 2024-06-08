import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./notFound.scss";

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    let [countDown, setCountDown] = useState(5);

    useEffect(() => {
        if(countDown>0){
            setTimeout(()=>{
                setCountDown(countDown-1);
            },1000)
        }
        else{
            navigate("/");
        }
    }, [countDown])
    return (
        <div className="df jc ac h100vh">
            <div className="df jc ac fw">
                <div className="df jc ac f100">
                    <p className="errorText">
                        Error: Page Not Found
                    </p>
                </div>
                <div className="df jc ac f100">
                    <p>
                        Redirecting in... {countDown}
                    </p>
                </div>
            </div>
        </div>
    )
}

export { NotFound };