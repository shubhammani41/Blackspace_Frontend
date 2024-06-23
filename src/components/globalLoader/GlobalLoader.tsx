import React, { useEffect, useState } from 'react';
import './GlobalLoader.scss';

export interface GlobalLoaderProp {
    timeout?: number | undefined;
}

const GlobalLoader: React.FC = (props: GlobalLoaderProp) => {
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