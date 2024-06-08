import { useEffect, useState } from 'react';
import './GlobalLoader.scss';

function GlobalLoader(message: string = "Running scripts.../>", timeout: number | null) {
    let show = useState("false");
    return (
        show ?
            <div id="loader-container">
                <div className='df jc ac'>
                    <p>{message}</p>
                </div>
            </div> : null
    )
}

export { GlobalLoader };