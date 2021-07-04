/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useState } from "react";
import TabTitle from "./TabTitle/TabTitle";
import css from "./Tabs.module.css";
import generateRandomId from "@utilities/generateRandomId";

export interface TabsProps {
    id?: string;
    children: ReactElement[];
    selectedIndex?: number;
}

export default function Tabs({ id = generateRandomId(), children, selectedIndex }: TabsProps): ReactElement<TabsProps> {
    const [selectedTab, setSelectedTab] = useState(selectedIndex || 0);

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
