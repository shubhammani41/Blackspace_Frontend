import React, { useEffect, useState } from 'react';
import './GlobalLoader.scss';

const GlobalLoader: React.FC<{ timeout?: number }> = (props) => {
    const [show, setShow] = useState<boolean>(true);

    useEffect(() => {
        if (props?.timeout) {
            setTimeout(() => {
                setShow(false);
            }, props.timeout)
        }
    });

    return (
        show ?
            <div className="loader-container">
                <span className="loader"></span>
            </div>
            : null
    )
}

export { GlobalLoader };