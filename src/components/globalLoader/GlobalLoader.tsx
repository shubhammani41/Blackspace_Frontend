import React, { useRef } from 'react';
import styles from './GlobalLoader.module.scss';
import useThemeStore from '../themeToggleBtn/store/themeStore';
import useLoaderStore, { LoaderState } from './store/globalLoaderStore';
import Skeleton from '@mui/material/Skeleton';

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
                    {globalLoaderStore.state === "OPEN" ? <Skeleton className={`${styles.loader_skeleton}`} variant='rectangular' animation='wave' style={{ background: currentTheme.data.theme.palette?.background?.paper }}></Skeleton> : <></>}
                    <p className={`${styles.loader_text}`}>Hold on...</p>
                </div>
            </div> :
            <div className={`${styles.loader_container}`}>
                <div ref={(el) => (loaderRef.current = el)} className={`${styles.loader_wrapper} ${globalLoaderStore.state === LoaderState.open ? styles.drop_down : styles.go_up}`}
                    style={{ background: currentTheme.data.theme.palette?.background?.paper }}>
                    {globalLoaderStore.state === "OPEN" ? <Skeleton className={`${styles.loader_skeleton}`} variant='rectangular' animation='wave' style={{ background: currentTheme.data.theme.palette?.background?.paper }}></Skeleton> : <></>}
                    <p className={`${styles.loader_text}`}>Hold on...</p>
                </div>
            </div>

    )
}

export { GlobalLoader };