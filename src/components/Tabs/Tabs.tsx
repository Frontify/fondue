/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactChild, ReactElement, useRef, useState } from "react";
import { TabItem } from "@components/Tabs/TabItem";
import { merge } from "@utilities/merge";
import { IconMore, IconSize } from "@foundation/Icon";
import { BadgeProps } from "@components/Badge";

export type Content = {
    label: string;
    content: ReactChild;
    decorator?: ReactElement;
    badge?: BadgeProps;
    disabled?: boolean;
};

export enum TabsPaddingX {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

export enum TabSize {
    Small = "Small",
    Large = "Large",
}

export type TabsProps = {
    content: Content[];
    paddingX: TabsPaddingX;
    size: TabSize;
};

const paddingMap: Record<TabsPaddingX, string> = {
    Small: "tw-px-s",
    Medium: "tw-px-m",
    Large: "tw-px-l",
};

export const Tabs: FC<TabsProps> = ({ content, paddingX, size }) => {
    const [activeItem, setActiveItem] = useState(0);
    const [isOverflowing, setIsOverflowing] = useState(false);

    React.useEffect(() => {
        window.addEventListener("resize", checkIfOverflowing);
    });

    const checkIfOverflowing = () => {
        // TODO add logic to know if tabs are overflowing
        // WIP Overflow...
        const tabNav = tabNavRef.current;
        setIsOverflowing((tabNav && tabNav.scrollWidth > tabNav.clientWidth) || false);
        if (tabNav) {
            for (let i = 0; i < tabNav.children.length; i++) {
                const item = tabNav.children[i];
                const navPosition = tabNav.getBoundingClientRect();
                const tabPosition = item.getBoundingClientRect();
                if (tabPosition.right > navPosition.right) {
                    console.log(i);
                }
            }
        }
    };

    const tabNavRef = useRef<HTMLUListElement | null>(null);

    return (
        <div data-test-id="tabs">
            <div className="tw-relative">
                <ul
                    ref={tabNavRef}
                    className={merge([
                        "tw-overflow-hidden tw-flex-shrink-0 tw-h-full tw-flex tw-justify-start tw-border-b tw-border-grey-20",
                        paddingMap[paddingX],
                        size === "Small" ? "tw-text-sm" : "tw-text-md",
                    ])}
                >
                    {content.map((item, index) => (
                        <TabItem
                            onClick={() => setActiveItem(index)}
                            key={index}
                            label={item.label}
                            active={index === activeItem}
                            decorator={item.decorator}
                            badge={item.badge}
                            disabled={item.disabled || false}
                        />
                    ))}
                </ul>
                {isOverflowing && (
                    <button className="tw-absolute tw-right-0 tw-top-0 tw-w-6 tw-h-6 tw-bg-grey-20 tw-rounded tw-flex tw-justify-center tw-items-center">
                        <IconMore size={IconSize.Size16} />
                    </button>
                )}
            </div>
            <div className="tw-p-3">{content[activeItem].content}</div>
        </div>
    );
};
