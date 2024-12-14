import React, { useEffect, useState } from 'react';
import './GlobalLoader.scss';
import useThemeStore from '../themeToggleBtn/store/themeStore';
import { SimplePaletteColorOptions } from '@mui/material';

export interface GlobalLoaderProp {
    timeout?: number | undefined;
}

const GlobalLoader: React.FC = (props: GlobalLoaderProp) => {
    const [show, setShow] = useState<boolean>(true);
    const currentTheme = useThemeStore();

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
                <span className="loader" style={{color:(currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main}}></span>
            </div>
            : null
    )
}

export { GlobalLoader };