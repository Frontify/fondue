/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDotsHorizontal } from '@frontify/fondue-icons';
import * as RadixTabs from '@radix-ui/react-tabs';
import {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useRef,
    type ForwardedRef,
    type ReactNode,
} from 'react';

import { useControllableState } from '#/hooks/useControllableState';

import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';

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
     * Select the used theme/style
     * “default 'default'
     */
    theme?: 'default' | 'pill';
};

const TabConfigContext = createContext<{
    value: string;
    disabled?: boolean;
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
    {
        padding = 'compact',
        activeTab: propsActiveTab,
        defaultActiveTab,
        size = 'medium',
        onActiveTabChange,
        children,
        theme = 'default',
        ...props
    }: TabsRootProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
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

    return (
        <TabTriggerContext.Provider value={{ addTrigger }}>
            <RadixTabs.Root
                ref={ref}
                className={styles.root}
                onValueChange={handleSetActiveTab}
                value={activeTab ?? triggers[0]?.value}
                data-tabs-content-padding={padding}
                data-tabs-theme={theme}
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
    children: ReactNode;
    value: string;
    disabled?: boolean;
};

export const TabsTab = ({ children, value, disabled }: TabsTabProps) => (
    <TabConfigContext.Provider value={{ value, disabled }}>{children}</TabConfigContext.Provider>
);
TabsTab.displayName = 'Tabs.Tab';

type TabsTriggerProps = {
    children: ReactNode;
};

export const TabsTrigger = ({ children, ...props }: TabsTriggerProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { value, disabled } = useContext(TabConfigContext);

    const { addTrigger } = useContext(TabTriggerContext);

    const localRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        addTrigger({
            ref: localRef || ref,
            value: value ?? '',
            disabled,
            props,
            element: children,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};
TabsTrigger.displayName = 'Tabs.Trigger';

type TabsContentProps = {
    children: ReactNode;
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
    Tab: forwardRef<HTMLDivElement, TabsTabProps>(TabsTab),
    Trigger: forwardRef<HTMLButtonElement, TabsTriggerProps>(TabsTrigger),
    Content: forwardRef<HTMLDivElement, TabsContentProps>(TabsContent),
};
