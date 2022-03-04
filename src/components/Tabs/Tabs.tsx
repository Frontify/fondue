/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, {
    Children,
    cloneElement,
    FC,
    isValidElement,
    KeyboardEvent,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import { TabItemProps } from "@components/Tabs/TabItem";
import { merge } from "@utilities/merge";
import { IconMore } from "@foundation/Icon";
import { Badge } from "@components/Badge";
import { LayoutGroup, motion } from "framer-motion";
import { Button, ButtonSize, ButtonStyle } from "@components/Button";
import { Flyout } from "@components/Flyout";
import { MenuItem } from "@components/MenuItem";
import { useMemoizedId } from "@hooks/useMemoizedId";

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
    paddingX?: TabsPaddingX;
    size?: TabSize;
    activeItemId: string;
    children: ReactNode;
    onChange?: (tabId: string) => void;
};

const paddingMap: Record<TabsPaddingX, string> = {
    [TabsPaddingX.Small]: "tw-pl-s",
    [TabsPaddingX.Medium]: "tw-pl-m",
    [TabsPaddingX.Large]: "tw-pl-l",
};

export const Tabs: FC<TabsProps> = ({ paddingX, size, activeItemId, children, onChange }) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const layoutGroupId = useMemoizedId();

    const tabs: TabItemProps[] =
        Children.map(children, (child) => {
            if (!isValidElement<TabItemProps>(child)) {
                return null;
            }
            return child?.props;
        }) ?? [];

    const [tabIndexLimit, setTabIndexLimit] = useState(tabs.length);

    const checkIfOverflowing = () => {
        const tabNav = tabNavRef.current;
        setIsOverflowing((tabNav && tabNav.scrollWidth > tabNav.clientWidth) ?? false);
        const overFlowIndex = [];
        if (tabNav) {
            for (const tabItem of tabNav.children) {
                const i = [...tabNav.children].indexOf(tabItem);
                const navPosition = tabNav.getBoundingClientRect();
                const tabPosition = tabItem.getBoundingClientRect();
                if (tabPosition.right > navPosition.right) {
                    overFlowIndex.push(i);
                }
            }

            const overFlowIndexInAscOrder = [...overFlowIndex].sort((a, b) => a - b);
            const newIndexLimit = overFlowIndex.length ? overFlowIndexInAscOrder[0] : tabs.length;
            if (newIndexLimit < tabIndexLimit || newIndexLimit > tabIndexLimit) {
                setTabIndexLimit(newIndexLimit);
            }
        }
    };

    const handleKeyboardTabChange = (event: KeyboardEvent<HTMLButtonElement>) => {
        const nextTabs = tabs.filter((tab) => {
            if (tab.id > activeItemId && !tab.disabled) {
                return tab;
            }
        });

        const previousTabs = tabs.filter((tab) => {
            if (tab.id < activeItemId && !tab.disabled) {
                return tab;
            }
        });

        if ((event.key === "ArrowRight" || event.key === "ArrowDown") && nextTabs.length) {
            triggerTabButton(nextTabs[0].id);
        }

        if ((event.key === "ArrowLeft" || event.key === "ArrowUp") && previousTabs.length) {
            triggerTabButton(previousTabs[previousTabs.length - 1].id);
        }
    };

    const triggerTabButton = (elementId: string) => {
        try {
            const buttonElement = document.getElementById(`${elementId}-btn`) as HTMLButtonElement;
            buttonElement.focus();
            if (onChange) {
                onChange(elementId);
            }
        } catch (error) {
            throw (error as Error).message;
        }
    };

    useEffect(() => {
        window.addEventListener("resize", checkIfOverflowing);
        return () => {
            window.removeEventListener("resize", checkIfOverflowing);
        };
    }, [checkIfOverflowing]);

    const tabNavRef = useRef<HTMLDivElement | null>(null);

    return (
        <LayoutGroup id={layoutGroupId}>
            <div data-test-id="tabs" className="tw-flex tw-relative tw-border-b tw-border-line">
                <div
                    ref={tabNavRef}
                    role="tablist"
                    className={merge([
                        "tw-overflow-hidden tw-flex-shrink-0 tw-h-full tw-w-full tw-flex tw-justify-start",
                        paddingMap[paddingX ?? TabsPaddingX.Small],
                        size === TabSize.Small ? "tw-text-sm" : "tw-text-md",
                    ])}
                >
                    {tabs.map((tab, index) => {
                        return (
                            <button
                                data-test-id="tab-item"
                                role="tab"
                                aria-selected={tab.id === activeItemId}
                                aria-controls={`${tab.id}-content`}
                                aria-hidden={tab.disabled}
                                tabIndex={tab.id === activeItemId ? 0 : -1}
                                id={`${tab.id}-btn`}
                                className={merge([
                                    "tw-group tw-relative tw-mx-0 tw-pb-5 tw-pt-2 tw-px-2 tw-w-max tw-h-10 tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-whitespace-nowrap",
                                    tab.disabled && "tw-text-text-disabled",
                                    tab.id === activeItemId && "tw-font-medium",
                                    index >= tabIndexLimit && "tw-invisible",
                                ])}
                                key={tab.id}
                                onClick={() => (!tab.disabled && onChange ? onChange(tab.id) : null)}
                                onKeyDown={(event) => handleKeyboardTabChange(event)}
                            >
                                {tab.decorator}
                                <span className="tw-mr-1 tw-ml-1.5">{tab.label}</span>
                                {tab.badge && (
                                    <Badge disabled={tab.disabled} style={tab.badge.style}>
                                        {tab.badge.children}
                                    </Badge>
                                )}
                                {tab.id === activeItemId && (
                                    <motion.div
                                        data-test-id="tab-active-highlight"
                                        layoutId="underline"
                                        className="tw-absolute tw-h-1 tw-bg-violet-60 tw-rounded-t-x-large tw-w-full tw-bottom-0"
                                    />
                                )}
                                {tab.id !== activeItemId && !tab.disabled && (
                                    <div className="group-hover:tw-absolute group-hover:tw-h-1 group-hover:tw-bg-box-neutral-hover group-hover:tw-rounded-t-x-large group-hover:tw-w-full group-hover:tw-bottom-0" />
                                )}
                            </button>
                        );
                    })}
                </div>
                {isOverflowing && (
                    <div
                        data-test-id="tab-overflow"
                        className="tw-absolute tw-rotate-90 tw-right-3 tw-top-0 tw-w-6 tw-h-6 tw-bg-box-neutral tw-rounded tw-flex tw-justify-center tw-items-center"
                    >
                        <Flyout
                            trigger={
                                <Button
                                    style={ButtonStyle.Secondary}
                                    size={ButtonSize.Small}
                                    icon={<IconMore />}
                                    onClick={() => setIsMenuOpened(!isMenuOpened)}
                                />
                            }
                            legacyFooter={false}
                            isOpen={isMenuOpened}
                            onOpenChange={() => setIsMenuOpened(!isMenuOpened)}
                            onCancel={() => setIsMenuOpened(false)}
                            fitContent={true}
                        >
                            {tabs.slice(tabIndexLimit, tabs.length).map((tab) => {
                                return (
                                    <button
                                        className="tw-w-full"
                                        key={tab.id}
                                        onClick={() => (!tab.disabled && onChange ? onChange(tab.id) : null)}
                                        role="tab"
                                        aria-selected={tab.id === activeItemId}
                                        aria-controls={`${tab.id}-content`}
                                        aria-hidden={tab.disabled}
                                        tabIndex={!tab.disabled ? 0 : -1}
                                        id={`${tab.id}-btn-m`}
                                        onKeyDown={(event) => handleKeyboardTabChange(event)}
                                    >
                                        <MenuItem
                                            title={tab.label}
                                            decorator={tab.decorator}
                                            disabled={tab.disabled}
                                            active={tab.id === activeItemId}
                                        />
                                    </button>
                                );
                            })}
                        </Flyout>
                    </div>
                )}
            </div>

            <div className="tw-p-3" data-test-id="tab-content">
                {Children.map(children, (child) => {
                    if (!isValidElement(child)) {
                        return null;
                    }

                    return cloneElement(child, { ...child.props, active: child.props.id === activeItemId });
                })}
            </div>
        </LayoutGroup>
    );
};
