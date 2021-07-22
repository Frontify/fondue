/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useEffect, useState } from "react";
import TabTitle from "./TabTitle/TabTitle";
import css from "./Tabs.module.css";
import generateRandomId from "@utilities/generateRandomId";

export type TabsProps = {
    id?: string;
    children: ReactElement[];
    selectedIndex?: number;
};

export default function Tabs({
    id = generateRandomId(),
    children,
    selectedIndex = 0,
}: TabsProps): ReactElement<TabsProps> {
    const [selectedTab, setSelectedTab] = useState(selectedIndex);
    useEffect(() => {
        setSelectedTab(selectedIndex);
    }, [selectedIndex]);

    return (
        <>
            <ul className={css.tabNames} role="tablist" id={id}>
                {children.map((item, index) => (
                    <TabTitle
                        id={`${id}-tab-${index}`}
                        key={index}
                        title={item.props.title}
                        selected={selectedTab === index}
                        index={index}
                        onClick={setSelectedTab}
                    />
                ))}
            </ul>
            <div
                role="tabpanel"
                id={`${id}-panel-${selectedTab}`}
                aria-labelledby={`${id}-tab-${selectedTab}`}
                data-test-id="tab-content"
            >
                {children[selectedTab]}
            </div>
        </>
    );
}
