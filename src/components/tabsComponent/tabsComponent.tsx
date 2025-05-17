import { Box, Tab, Tabs } from "@mui/material";
import style from "./tabsComponent.module.scss";
import { ReactElement, ReactNode, useState } from "react";

export interface TabComponentProps {
    index: number;
    label: string;
    activeTabIndex?: number;
    children: ReactNode | ReactNode[];
}

export interface TabsComponentProps {
    onChange?: (activeTabIndex: number) => any
    children: ReactElement<TabComponentProps>[];
}

const TabComponent: React.FC<TabComponentProps> = (props: TabComponentProps) => {
    const { index, label, activeTabIndex, children } = props;
    return (
        <div className={style.tab + ' ' + (activeTabIndex === index ? style.activeTab : style.inActiveTab)}>
            {children}
        </div>
    )
}

const TabsComponent: React.FC<TabsComponentProps> = (props: TabsComponentProps) => {
    const { onChange, children } = props;
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTabIndex(newValue);
        if (onChange) {
            onChange(activeTabIndex);
        }
    };
    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTabIndex} onChange={handleChange}>
                    {
                        children.map((child,index) => {
                            return <Tab key={index} label={child.props.label} />
                        })
                    }
                </Tabs>
            </Box>
            <div className={style.tabContainer}>
                {
                    children.map((child,index) => {
                        return (
                            <TabComponent key={index} {...child.props} activeTabIndex={activeTabIndex}></TabComponent>
                        )
                    })
                }
            </div>
        </div>
    )
}

export { TabsComponent, TabComponent }