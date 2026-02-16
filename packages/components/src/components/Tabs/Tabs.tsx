/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDotsHorizontal } from '@frontify/fondue-icons';
import * as RadixTabs from '@radix-ui/react-tabs';
import {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    type ForwardedRef,
    type ReactNode,
} from 'react';

import { useControllableState } from '#/hooks/useControllableState';

import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { useFondueTheme } from '../ThemeProvider/ThemeProvider';

import { useTabTriggers } from './hooks/useTabTriggers';
import styles from './styles/tabs.module.scss';
import { type TabTrigger } from './types';

export type TabsRootProps = {
    id?: string;
    /**
     * Should contain `Tabs.Tab` components.
     */
    children: ReactNode;
    /**
     * Controls the content area padding. `'none'` for custom layouts, `'compact'` for most use cases, `'spacious'` for breathing room.
     * @default "compact"
     */
    padding?: 'none' | 'tight' | 'compact' | 'comfortable' | 'spacious';
    /**
     * The initially active tab value for uncontrolled usage.
     */
    defaultActiveTab?: string;
    /**
     * The controlled active tab value. Use together with `onActiveTabChange`.
     */
    activeTab?: string;
    /**
     * Controls the tab trigger height. `'medium'` for standard layouts, `'large'` for prominent navigation.
     * @default "medium"
     */
    size?: 'medium' | 'large';
    /**
     * Callback fired when the active tab changes.
     * @param value - The value of the newly active tab
     */
    onActiveTabChange?: (value: string) => void;
    /**
     * Controls the visual style. `'default'` for underline-style tabs, `'pill'` for filled pill-shaped tabs.
     * @default "default"
     */
    variant?: 'default' | 'pill';
};

const TabConfigContext = createContext<{
    value: string;
    disabled?: boolean;
}>({
    value: '',
    disabled: false,
});
TabConfigContext.displayName = 'TabConfigContext';

const TabTriggerContext = createContext<{
    addTrigger: (trigger: TabTrigger) => void;
}>({
    addTrigger: () => {},
});
TabTriggerContext.displayName = 'TabTriggerContext';

export const TabsRoot = (
    {
        padding = 'compact',
        activeTab: propsActiveTab,
        defaultActiveTab,
        size = 'medium',
        onActiveTabChange,
        children,
        variant = 'default',
        ...props
    }: TabsRootProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const { dir } = useFondueTheme();

    const [activeTab, setActiveTab] = useControllableState({
        prop: propsActiveTab,
        defaultProp: defaultActiveTab,
        onChange: onActiveTabChange,
    });

    const handleSetActiveTab = useCallback(
        (value: string) => {
            setActiveTab(value);
        },
        [setActiveTab],
    );

    const { triggerListRef, activeIndicatorRef, triggers, triggersOutOfView, addTrigger } = useTabTriggers({
        activeTab,
    });

    const contextValue = useMemo(() => ({ addTrigger }), [addTrigger]);

    return (
        <TabTriggerContext.Provider value={contextValue}>
            <RadixTabs.Root
                ref={ref}
                dir={dir}
                className={styles.root}
                onValueChange={handleSetActiveTab}
                value={activeTab ?? triggers[0]?.value}
                data-tabs-content-padding={padding}
                data-tabs-variant={variant}
                {...props}
            >
                <div className={styles.triggerListWrapper}>
                    <RadixTabs.List ref={triggerListRef} data-size={size} className={styles.triggerList}>
                        {triggers.map((trigger) => (
                            <RadixTabs.Trigger
                                {...trigger.props}
                                key={trigger.value}
                                value={trigger.value}
                                disabled={trigger.disabled}
                                className={styles.trigger}
                                ref={trigger.ref}
                            >
                                {trigger.element}
                            </RadixTabs.Trigger>
                        ))}
                    </RadixTabs.List>
                    <Dropdown.Root>
                        {triggersOutOfView.length > 0 && (
                            <Dropdown.Trigger data-test-id="overflow-items-dropdown-trigger">
                                <Button emphasis="default" aspect="square" size="small">
                                    <IconDotsHorizontal size={16} />
                                </Button>
                            </Dropdown.Trigger>
                        )}
                        <Dropdown.Content align="end" data-test-id="overflow-items-dropdown-content">
                            {triggersOutOfView.map((trigger) => (
                                <Dropdown.Item
                                    {...trigger.props}
                                    disabled={trigger.disabled}
                                    onSelect={() => handleSetActiveTab(trigger.value)}
                                    key={trigger.value}
                                >
                                    {trigger.element}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Content>
                    </Dropdown.Root>
                    <span
                        data-test-id="active-tab-indicator"
                        ref={activeIndicatorRef}
                        className={styles.activeIndicator}
                    />
                </div>
                {children}
            </RadixTabs.Root>
        </TabTriggerContext.Provider>
    );
};
TabsRoot.displayName = 'Tabs.Root';

type TabsTabProps = {
    /**
     * Should contain a `Tabs.Trigger` and a `Tabs.Content`.
     */
    children: ReactNode;
    /**
     * A unique value that identifies this tab. Passed to `onActiveTabChange` when selected.
     */
    value: string;
    /**
     * Prevents the tab from being selected.
     * @default false
     */
    disabled?: boolean;
};

export const TabsTab = ({ children, value, disabled }: TabsTabProps) => {
    const contextValue = useMemo(() => ({ value, disabled }), [value, disabled]);

    return <TabConfigContext.Provider value={contextValue}>{children}</TabConfigContext.Provider>;
};
TabsTab.displayName = 'Tabs.Tab';

type TabsTriggerProps = {
    /**
     * The label or content rendered inside the tab trigger. Can include text, icons, or badges.
     */
    children: ReactNode;
};

export const TabsTrigger = ({ children, ...props }: TabsTriggerProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { value, disabled } = useContext(TabConfigContext);

    const { addTrigger } = useContext(TabTriggerContext);

    const localRef = useRef<HTMLButtonElement>(null);
    const previousElement = useRef<ReactNode>();

    useEffect(() => {
        addTrigger({
            ref: localRef || ref,
            value: value ?? '',
            disabled,
            props,
            element: children,
            previousElement: previousElement.current,
        });
        previousElement.current = children;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);

    return null;
};
TabsTrigger.displayName = 'Tabs.Trigger';

type TabsContentProps = {
    /**
     * The content displayed when the parent tab is active.
     */
    children: ReactNode;
    /**
     * Merge props onto the child element instead of rendering a wrapper.
     * @default false
     */
    asChild?: boolean;
};

export const TabsContent = ({ children, ...itemProps }: TabsContentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { value } = useContext(TabConfigContext);

    return (
        <RadixTabs.Content ref={ref} {...itemProps} className={styles.content} value={value ?? ''}>
            {children}
        </RadixTabs.Content>
    );
};
TabsContent.displayName = 'Tabs.Content';

/**
 * A set of layered content panels — only one is visible at a time. Use `Tabs.Root` as the container,
 * `Tabs.Tab` to define each tab, `Tabs.Trigger` for the clickable header, and `Tabs.Content` for the panel.
 * Tabs that overflow the container are automatically collapsed into a dropdown menu.
 */
export const Tabs = {
    Root: forwardRef<HTMLDivElement, TabsRootProps>(TabsRoot),
    Tab: forwardRef<HTMLDivElement, TabsTabProps>(TabsTab),
    Trigger: forwardRef<HTMLButtonElement, TabsTriggerProps>(TabsTrigger),
    Content: forwardRef<HTMLDivElement, TabsContentProps>(TabsContent),
};
