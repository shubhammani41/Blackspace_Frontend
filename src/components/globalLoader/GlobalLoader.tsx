import React, { useEffect, useRef, useState } from 'react';
import styles from './GlobalLoader.module.scss';
import useThemeStore from '../themeToggleBtn/store/themeStore';
import { SimplePaletteColorOptions } from '@mui/material';
import useLoaderStore, { LoaderState } from './store/globalLoaderStore';

export interface GlobalLoaderProp {
    static?: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProp> = (props: GlobalLoaderProp) => {
    const currentTheme = useThemeStore();
    const globalLoaderStore = useLoaderStore();
    const loaderRef = useRef<HTMLElement | null>();

    return (
        props?.static ?
            <div className={`${styles.loader_container}`}>
                <div ref={(el) => (loaderRef.current = el)} className={`${styles.loader_wrapper} ${styles.drop_down}`}
                    style={{ background: currentTheme.data.theme.palette?.background?.paper }}>
                    <div className={`${styles.spinner}`}
                        style={{ border: '3px solid' + currentTheme.data.theme.palette?.background?.default, borderTopColor: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}></div>
                </div>
            </div> :
            <div className={`${styles.loader_container}`}>
                <div ref={(el) => (loaderRef.current = el)} className={`${styles.loader_wrapper} ${globalLoaderStore.state === LoaderState.open ? styles.drop_down : styles.go_up}`}
                    style={{ background: currentTheme.data.theme.palette?.background?.paper }}>
                    <div className={`${styles.spinner}`}
                        style={{ border: '3px solid' + currentTheme.data.theme.palette?.background?.default, borderTopColor: (currentTheme.data.theme.palette?.primary as SimplePaletteColorOptions).main }}></div>
                </div>
            </div>

    )
}

export { GlobalLoader };