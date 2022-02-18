/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, {
    Children,
    cloneElement,
    FC,
    isValidElement,
    ReactChild,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import { TabItemProps } from "@components/Tabs/TabItem";
import { merge } from "@utilities/merge";
import { IconMore, IconSize } from "@foundation/Icon";
import { Badge } from "@components/Badge";
import { motion } from "framer-motion";

export type Content = {
    tabItem: TabItemProps;
    content: ReactChild;
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
    paddingX: TabsPaddingX;
    size: TabSize;
    activeItemId: string;
    children: ReactNode;
    onChange: (tabId: string) => void;
};

const paddingMap: Record<TabsPaddingX, string> = {
    Small: "tw-px-s",
    Medium: "tw-px-m",
    Large: "tw-px-l",
};

export const Tabs: FC<TabsProps> = ({ paddingX, size, activeItemId, children, onChange }) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const checkIfOverflowing = () => {
        // TODO add logic to know if tabs are overflowing
        // WIP Overflow...
        const tabNav = tabNavRef.current;
        console.log(tabNav);
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

    useEffect(() => {
        window.addEventListener("resize", checkIfOverflowing);
        return () => {
            window.removeEventListener("resize", checkIfOverflowing);
        };
    }, [checkIfOverflowing]);

    const tabNavRef = useRef<HTMLDivElement | null>(null);
    const tabs: TabItemProps[] =
        Children.map(children, (child) => {
            if (!isValidElement<TabItemProps>(child)) {
                return null;
            }
            return child?.props;
        }) ?? [];

    return (
        <div data-test-id="tabs">
            <div className="tw-flex">
                <div
                    ref={tabNavRef}
                    className={merge([
                        "tw-relative tw-overflow-hidden tw-flex-shrink-0 tw-h-full tw-flex tw-justify-start tw-border-b tw-border-grey-20",
                        paddingMap[paddingX],
                        size === TabSize.Small ? "tw-text-sm" : "tw-text-md",
                    ])}
                >
                    {tabs.map((tab) => {
                        return (
                            <button
                                className={merge([
                                    "tw-group tw-relative tw-pb-5 tw-pt-2 tw-px-2 tw-w-max tw-h-10 tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-ml-1.5 tw-mr-1",
                                    tab.disabled && "tw-text-text-disabled",
                                    tab.id === activeItemId && "tw-font-medium",
                                ])}
                                key={tab.id}
                                onClick={() => !tab.disabled && onChange(tab.id)}
                            >
                                {tab.decorator}
                                {tab.label}
                                {tab.badge && (
                                    <Badge disabled={tab.disabled} style={tab.badge.style}>
                                        {tab.badge.children}
                                    </Badge>
                                )}
                                {tab.id === activeItemId && (
                                    <motion.div
                                        layoutId="underline"
                                        className="tw-absolute tw-h-1 tw-bg-violet-60 tw-rounded-t-x-large tw-w-full tw-bottom-0"
                                    />
                                )}
                                {tab.id !== activeItemId && !tab.disabled && (
                                    <div className="group-hover:tw-absolute group-hover:tw-h-1 group-hover:tw-bg-grey-20 group-hover:tw-rounded-t-x-large group-hover:tw-w-full group-hover:tw-bottom-0" />
                                )}
                            </button>
                        );
                    })}
                </div>
                {isOverflowing && (
                    // Remove rotate class when new Dots icon is available
                    <button className="tw-absolute tw-rotate-90 tw-right-0 tw-top-0 tw-w-6 tw-h-6 tw-bg-grey-20 tw-rounded tw-flex tw-justify-center tw-items-center">
                        <IconMore size={IconSize.Size16} />
                    </button>
                )}
            </div>

            <div className="tw-p-3">
                {Children.map(children, (child) => {
                    if (!isValidElement(child)) {
                        return null;
                    }

                    return cloneElement(child, { ...child.props, active: child.props.id === activeItemId });
                })}
            </div>
        </div>
    );
};
