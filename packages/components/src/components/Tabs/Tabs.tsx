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
    children: ReactNode;
    /**
     * Define the padding of the dialog
     * @default "compact"
     */
    padding?: 'none' | 'tight' | 'compact' | 'comfortable' | 'spacious';
    /**
     * The default active tab
     * Used for uncontrolled components
     */
    defaultActiveTab?: string;
    /**
     * The controlled value of the active tab
     */
    activeTab?: string;
    /**
     * The height of the tabs
     * @default 'medium'
     */
    size?: 'medium' | 'large';
    /**
     * Event handler called when the active tab changes
     */
    onActiveTabChange?: (value: string) => void;
    /**
     * Select the used variant
     * @default 'default'
     */
    variant?: 'default' | 'pill';
    /**
     * Add a divider line below the tabs
     * Only available when variant is 'pill'
     * Useful for tabs placed inside Dialog content
     * @default false
     */
    withDivider?: boolean;
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
        withDivider = false,
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

    // Only apply withDivider when variant is 'pill'
    const shouldShowDivider = variant === 'pill' && withDivider;

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
                data-tabs-with-divider={shouldShowDivider}
                {...props}
            >
                <div className={styles.triggerListWrapper}>
                    <RadixTabs.List ref={triggerListRef} data-size={size} className={styles.triggerList}>
                        {triggers.map((trigger) => (
                            <RadixTabs.Trigger
                                key={trigger.value}
                                {...trigger.props}
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
                                    key={trigger.value}
                                    {...trigger.props}
                                    disabled={trigger.disabled}
                                    onSelect={() => handleSetActiveTab(trigger.value)}
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
    children: ReactNode;
    value: string;
    disabled?: boolean;
};

export const TabsTab = ({ children, value, disabled }: TabsTabProps) => {
    const contextValue = useMemo(() => ({ value, disabled }), [value, disabled]);

    return <TabConfigContext.Provider value={contextValue}>{children}</TabConfigContext.Provider>;
};
TabsTab.displayName = 'Tabs.Tab';

type TabsTriggerProps = {
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
        // eslint-disable-next-line @eslint-react/exhaustive-deps
    }, [children]);

    return null;
};
TabsTrigger.displayName = 'Tabs.Trigger';

type TabsContentProps = {
    children: ReactNode;
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

export const Tabs = {
    Root: forwardRef<HTMLDivElement, TabsRootProps>(TabsRoot),
    Tab: TabsTab,
    Trigger: forwardRef<HTMLButtonElement, TabsTriggerProps>(TabsTrigger),
    Content: forwardRef<HTMLDivElement, TabsContentProps>(TabsContent),
};
