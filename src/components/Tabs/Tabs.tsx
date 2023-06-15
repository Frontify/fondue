/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, {
    Children,
    KeyboardEvent,
    ReactElement,
    ReactNode,
    cloneElement,
    isValidElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { TabItemProps } from '@components/Tabs/TabItem';
import { merge } from '@utilities/merge';
import { IconDotsHorizontal } from '@foundation/Icon/Generated';
import { Badge } from '@components/Badge';
import { motion } from 'framer-motion';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { DimensionUnity } from '@utilities/dimensions';

export enum TabsPaddingX {
    None = 'None',
    XSmall = 'XSmall',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum TabSize {
    Small = 'Small',
    Large = 'Large',
}

export type TabsProps = {
    paddingX?: TabsPaddingX;
    size?: TabSize;
    activeItemId: string;
    children: ReactNode;
    onChange?: (tabId: string) => void;
    maxHeight?: `${number}${DimensionUnity}`;
    minHeight?: `${number}${DimensionUnity}`;
};

const paddingMap: Record<TabsPaddingX, string> = {
    [TabsPaddingX.None]: 'tw-pl-0',
    [TabsPaddingX.XSmall]: 'tw-pl-xs',
    [TabsPaddingX.Small]: 'tw-pl-s',
    [TabsPaddingX.Medium]: 'tw-pl-m',
    [TabsPaddingX.Large]: 'tw-pl-l',
};

export const Tabs = ({
    paddingX,
    size,
    activeItemId,
    children,
    onChange,
    maxHeight,
    minHeight,
}: TabsProps): ReactElement => {
    const groupId = useMemoizedId();
    const tabNavRef = useRef<HTMLDivElement | null>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const tabs: TabItemProps[] =
        Children.map(children, (child) => {
            if (!isValidElement<TabItemProps>(child)) {
                return null;
            }
            return child?.props;
        }) ?? [];

    const [overflowArray, setOverflowArray] = useState([0]);

    const checkIfOverflowing = useCallback(() => {
        const tabNav = tabNavRef.current;
        setIsOverflowing((tabNav && tabNav.scrollWidth > tabNav.clientWidth) ?? false);
        const overFlowIndex = [];
        if (tabNav) {
            for (const tabItem of tabNav.children) {
                const i = [...tabNav.children].indexOf(tabItem);
                const navPosition = tabNav.getBoundingClientRect();
                const tabPosition = tabItem.getBoundingClientRect();
                if (tabPosition.right > navPosition.right || tabPosition.left < navPosition.left) {
                    overFlowIndex.push(i);
                }
            }

            const overFlowIndexInAscOrder = [...overFlowIndex].sort((a, b) => a - b);
            setOverflowArray(overFlowIndexInAscOrder);
        }
    }, []);

    const getOverflownTabs = () => {
        return overflowArray.map((i) => {
            return tabs[i];
        });
    };

    const filterTabList = (array: TabItemProps[], direction: string) => {
        const activeItemIndex = array.findIndex((tab) => tab.id === activeItemId);

        return array.filter((tab, index) => {
            if (direction === 'next') {
                if (index > activeItemIndex && !tab.disabled) {
                    return tab;
                }
            }

            if (direction === 'previous') {
                if (index < activeItemIndex && !tab.disabled) {
                    return tab;
                }
            }

            return false;
        });
    };

    const handleKeyboardTabChange = (event: KeyboardEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        const overflownTabs = getOverflownTabs();
        const target = event.target as HTMLElement;
        const fromOverflow = target.id.includes('-m');
        const currentTabId = target.id.replace('-btn-m', '');
        const currentTabsArray = fromOverflow ? overflownTabs : tabs;

        const nextTabs = filterTabList(currentTabsArray, 'next');
        const previousTabs = filterTabList(currentTabsArray, 'previous');

        if ((event.key === 'ArrowRight' || event.key === 'ArrowDown') && nextTabs.length > 0) {
            triggerTabButton(nextTabs[0].id, fromOverflow);
        }

        if ((event.key === 'ArrowLeft' || event.key === 'ArrowUp') && previousTabs.length > 0) {
            triggerTabButton(previousTabs[previousTabs.length - 1].id, fromOverflow);
        }

        if (event.key === 'Enter' && fromOverflow) {
            triggerTabButton(currentTabId, true);
            setIsMenuOpened(false);
            const contentSection = document.getElementById(`${currentTabId}-content`) as HTMLDivElement;
            contentSection.focus();
        }

        if (!target.id.includes('-m')) {
            setIsMenuOpened(false);
        }
    };

    const triggerTabButton = (elementId: string, fromOverflow: boolean) => {
        try {
            const tabElement = document.getElementById(`${elementId}-btn`) as HTMLButtonElement;
            const buttonElement = document.getElementById(
                fromOverflow ? `${elementId}-btn-m` : `${elementId}-btn`,
            ) as HTMLButtonElement;
            if (onChange) {
                onChange(elementId);
            }
            if (isOverflowing) {
                tabElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
            }
            buttonElement.focus();
        } catch (error) {
            throw (error as Error).message;
        }
    };

    const triggerOverflowMenu = (event: KeyboardEvent<HTMLButtonElement>) => {
        checkIfOverflowing();
        const overflownTabs = getOverflownTabs();

        if (event.key === 'Enter') {
            if (!isMenuOpened && overflownTabs.length > 0) {
                const buttonElement = document.getElementById(`${overflownTabs[0].id}-btn-m`) as HTMLButtonElement;
                if (buttonElement) {
                    buttonElement.focus();
                }
            }
        }

        if (isMenuOpened && (event.key === 'ArrowRight' || event.key === 'ArrowDown')) {
            triggerTabButton(overflownTabs[0].id, true);
        }
    };

    // First render
    useEffect(() => {
        checkIfOverflowing();
    }, [checkIfOverflowing]);

    useEffect(() => {
        window.addEventListener('resize', checkIfOverflowing);
        return () => {
            window.removeEventListener('resize', checkIfOverflowing);
        };
    }, [checkIfOverflowing]);

    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <>
            <div data-test-id="tabs" className="tw-flex tw-relative tw-border-b tw-border-line">
                <div
                    ref={tabNavRef}
                    role="tablist"
                    className={merge([
                        'tw-overflow-x-hidden tw-flex-shrink-0 tw-h-full tw-w-full tw-flex tw-justify-start',
                        paddingMap[paddingX ?? TabsPaddingX.Small],
                        size === TabSize.Small ? 'tw-gap-xxs' : 'tw-gap-xs ',
                    ])}
                >
                    {tabs.map((tab) => {
                        return (
                            <button
                                data-test-id="tab-item"
                                role="tab"
                                type="button"
                                aria-selected={tab.id === activeItemId}
                                aria-controls={`${tab.id}-content`}
                                aria-hidden={tab.disabled}
                                tabIndex={tab.id === activeItemId ? 0 : -1}
                                id={`${tab.id}-btn`}
                                className={merge([
                                    'tw-group tw-relative tw-mx-0 tw-py-4 tw-px-2 tw-w-max tw-cursor-pointer tw-flex tw-items-center tw-justify-center tw-whitespace-nowrap',
                                    tab.disabled && 'tw-text-text-disabled',
                                    !tab.disabled && 'hover:tw-text-text',
                                    tab.id === activeItemId ? 'tw-font-medium tw-text-text' : 'tw-text-text-weak',
                                    size === TabSize.Small ? 'tw-text-sm' : 'tw-text-md',
                                ])}
                                key={tab.id}
                                onClick={() => {
                                    if (!tab.disabled) {
                                        triggerTabButton(tab.id, false);
                                        setIsMenuOpened(false);
                                    }
                                }}
                                onKeyDown={(event) => handleKeyboardTabChange(event)}
                            >
                                {tab.decorator && <span className="tw-mr-1.5">{tab.decorator}</span>}

                                <span>{tab.label}</span>

                                {tab.badge && (
                                    <span className="tw-ml-1.5">
                                        <Badge disabled={tab.disabled} style={tab.badge.style}>
                                            {tab.badge.children}
                                        </Badge>
                                    </span>
                                )}
                                {tab.id === activeItemId && (
                                    <motion.div
                                        initial={false}
                                        layoutDependency={activeItemId}
                                        data-test-id="tab-active-highlight"
                                        layoutId={groupId}
                                        className="tw-absolute tw-h-[3px] tw-bg-box-selected-strong tw-rounded-t-x-large tw-w-full tw-bottom-0"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
                {isOverflowing && (
                    <div
                        data-test-id="tab-overflow"
                        className="tw-absolute tw-z-50 tw-right-3 tw-bottom-0 tw-top-0 tw-flex tw-justify-center tw-items-center"
                    >
                        <button
                            className={merge([
                                'tw-w-6 tw-h-6 tw-bg-box-neutral tw-rounded tw-flex tw-justify-center tw-items-center',
                                isFocusVisible ? FOCUS_STYLE : '',
                            ])}
                            type="button"
                            onClick={() => {
                                checkIfOverflowing();
                                setIsMenuOpened(!isMenuOpened);
                            }}
                            onKeyDown={(event) => triggerOverflowMenu(event)}
                            {...focusProps}
                        >
                            <IconDotsHorizontal />
                        </button>
                        {isMenuOpened && (
                            <div
                                className="tw-absolute tw-right-0 tw-top-11 tw-px-3 tw-pt-3 tw-bg-base tw-shadow tw-w-max"
                                role="dialog"
                            >
                                {getOverflownTabs().map((tab) => {
                                    return (
                                        <button
                                            className={merge([
                                                'tw-flex tw-items-center tw-w-full tw-mb-3 tw-text-left tw-text-text-weak',
                                                tab.disabled && 'tw-text-text-disabled',
                                            ])}
                                            key={tab.id}
                                            onClick={() => {
                                                if (!tab.disabled) {
                                                    triggerTabButton(tab.id, true);
                                                    setIsMenuOpened(false);
                                                }
                                            }}
                                            role="tab"
                                            type="button"
                                            aria-selected={tab.id === activeItemId}
                                            aria-controls={`${tab.id}-content`}
                                            aria-hidden={tab.disabled}
                                            tabIndex={!tab.disabled && isMenuOpened ? 0 : -1}
                                            id={`${tab.id}-btn-m`}
                                            onKeyDown={(event) => handleKeyboardTabChange(event)}
                                        >
                                            {tab.decorator}
                                            <span className="tw-mr-1 tw-ml-1.5">{tab.label}</span>
                                            {tab.badge && (
                                                <Badge disabled={tab.disabled} style={tab.badge?.style}>
                                                    {tab.badge?.children}
                                                </Badge>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div data-test-id="tab-content" className="tw-flex tw-flex-col tw-overflow-y-auto">
                <div className="tw-mr-0" style={{ maxHeight, minHeight }}>
                    {Children.map(children, (child) => {
                        if (!isValidElement(child)) {
                            return null;
                        }

                        return cloneElement(child, { ...child.props, active: child.props.id === activeItemId });
                    })}
                </div>
            </div>
        </>
    );
};
Tabs.displayName = 'FondueTabs';
