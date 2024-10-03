/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDotsHorizontal } from '@frontify/fondue-icons';
import * as RadixTabs from '@radix-ui/react-tabs';
import { createContext, forwardRef, useContext, useEffect, useRef, type ForwardedRef, type ReactNode } from 'react';

import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';

import { useTabTriggers } from './hooks/useTabTriggers';
import styles from './styles/tabs.module.scss';
import { type TabTrigger } from './types';

import { useControllableState } from '#/hooks/useControllableState';

export type TabsRootProps = {
    id?: string;
    children: ReactNode;
    /**
     * The default active tab
     * Used for uncontrolled components
     */
    defaultActiveTab: string;
    /**
     * The controlled value of the active tab
     */
    activeTab?: string;
    /**
     * The height of the tabs
     */
    size?: 'default' | 'large';
    /**
     * Event handler called when the active tab changes
     */
    onActiveTabChange?: (value: string) => void;
};

const TabConfigContext = createContext<{
    value: string;
    disabled: boolean;
}>({
    value: '',
    disabled: false,
});

const TabTriggerContext = createContext<{
    addTrigger: (trigger: TabTrigger) => void;
}>({
    addTrigger: () => {},
});

export const TabsRoot = (
    { children, activeTab: propsActiveTab, defaultActiveTab, onActiveTabChange, size = 'default' }: TabsRootProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const [activeTab, setActiveTab] = useControllableState({
        prop: propsActiveTab,
        defaultProp: defaultActiveTab,
        onChange: onActiveTabChange,
    });

    const { triggerListRef, activeIndicatorRef, triggers, triggersOutOfView, addTrigger } = useTabTriggers({
        activeTab,
    });

    return (
        <TabTriggerContext.Provider value={{ addTrigger }}>
            <RadixTabs.Root
                ref={ref}
                className={styles.root}
                onValueChange={(value) => {
                    if (value) {
                        setActiveTab(value);
                    }
                }}
                value={activeTab ?? triggers[0]?.value}
            >
                <div className={styles.triggerListWrapper}>
                    <RadixTabs.List ref={triggerListRef} data-size={size} className={styles.triggerList}>
                        {triggers.map((trigger) => (
                            <RadixTabs.Trigger
                                key={trigger.value}
                                value={trigger.value}
                                disabled={trigger.disabled}
                                className={styles.trigger}
                                asChild
                            >
                                {trigger.element}
                            </RadixTabs.Trigger>
                        ))}
                    </RadixTabs.List>
                    <Dropdown.Root>
                        {triggersOutOfView.length > 0 && (
                            <Dropdown.Trigger>
                                <Button emphasis="default" aspect="square" size="small">
                                    <IconDotsHorizontal size={16} />
                                </Button>
                            </Dropdown.Trigger>
                        )}
                        <Dropdown.Content align="end">
                            {triggersOutOfView.map((trigger) => (
                                <Dropdown.Item
                                    disabled={trigger.disabled}
                                    onSelect={() => {
                                        setActiveTab(trigger.value);
                                    }}
                                    key={trigger.value}
                                >
                                    {trigger.element}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Content>
                    </Dropdown.Root>
                    <span ref={activeIndicatorRef} className={styles.activeIndicator} />
                </div>
                {children}
                {/* Active indicator */}
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

export const TabsTab = ({ children, value, disabled }: TabsTabProps) => (
    <TabConfigContext.Provider value={{ value, disabled: !!disabled }}>{children}</TabConfigContext.Provider>
);
TabsTab.displayName = 'Tabs.Tab';

type TabsTriggerProps = {
    children: ReactNode;
};

export const TabsTrigger = ({ children }: TabsTriggerProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { value, disabled } = useContext(TabConfigContext);

    const { addTrigger } = useContext(TabTriggerContext);

    const localRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        addTrigger({
            ref: localRef || ref,
            value: value || '',
            disabled,
            element: <button ref={localRef || ref}>{children}</button>,
        });
    }, []);
};
TabsTrigger.displayName = 'Tabs.Trigger';

type TabsContentProps = {
    children: ReactNode;
};

export const TabsContent = ({ children, ...itemProps }: TabsContentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { value } = useContext(TabConfigContext);

    return (
        <RadixTabs.Content ref={ref} {...itemProps} className={styles.content} value={value || ''}>
            {children}
        </RadixTabs.Content>
    );
};
TabsContent.displayName = 'Tabs.Content';

export const Tabs = {
    Root: forwardRef<HTMLDivElement, TabsRootProps>(TabsRoot),
    Tab: forwardRef<HTMLDivElement, TabsTabProps>(TabsTab),
    Trigger: forwardRef<HTMLButtonElement, TabsTriggerProps>(TabsTrigger),
    Content: forwardRef<HTMLDivElement, TabsContentProps>(TabsContent),
};
