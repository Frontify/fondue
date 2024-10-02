/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixTabs from '@radix-ui/react-tabs';
import {
    createContext,
    forwardRef,
    useContext,
    useState,
    type ForwardedRef,
    type ReactNode,
    useEffect,
    useRef,
    useLayoutEffect,
    type RefObject,
    useMemo,
} from 'react';

import { useControllableState } from '#/hooks/useControllableState';

import styles from './styles/tabs.module.scss';

export type TabsRootProps = {
    id?: string;
    children: ReactNode;
    /**
     * The default active tab
     * Used for uncontrolled components
     */
    defaultValue: string;
    /**
     * The controlled value of the active tab
     */
    value?: string;
    /**
     * The height of the tabs
     */
    size?: 'default' | 'large';
    /**
     * Event handler called when the active tab changes
     */
    onValueChange?: (value: string) => void;
};

const TabConfigContext = createContext<{
    value: string;
    disabled: boolean;
}>({
    value: '',
    disabled: false,
});

type TabTrigger = { ref: ForwardedRef<HTMLButtonElement>; element: JSX.Element };

const TabTriggerContext = createContext<{
    addTrigger: (trigger: TabTrigger) => void;
}>({
    addTrigger: () => {},
});

export const TabsRoot = (
    { children, value: propsValue, defaultValue, onValueChange, size = 'default' }: TabsRootProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const triggerListRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useControllableState({
        prop: propsValue,
        defaultProp: defaultValue,
        onChange: onValueChange,
    });
    const [triggers, setTriggers] = useState<TabTrigger[]>([]);

    const handleAddTrigger = (trigger: TabTrigger) => {
        setTriggers((prev) => [...prev, trigger]);

        getTriggersInView(triggers);
    };

    const getTriggersInView = (triggers: TabTrigger[]) => {
        return triggers.filter((trigger) => {
            console.log('ref', trigger.ref);

            if (trigger.ref.current && triggerListRef.current) {
                console.log('trigger', trigger.ref.current.getBoundingClientRect().right);
                return (
                    trigger.ref.current.getBoundingClientRect().right <
                    triggerListRef.current?.getBoundingClientRect().right
                );
            }
            return false;
        });
    };

    const calculateOverflow = () => {
        if (triggerListRef.current) {
            const isOverflowing = triggerListRef.current.scrollWidth > triggerListRef.current.clientWidth;
            console.log('isOverflowing', isOverflowing);
            return isOverflowing;
        }
        return false;
    };

    useLayoutEffect(() => {
        const inViewTriggers = getTriggersInView(triggers);
        console.log(
            'inViewTriggers',
            inViewTriggers.map((trigger) => trigger.element),
        );
    }, [triggerListRef, triggers]);

    return (
        <TabTriggerContext.Provider value={{ addTrigger: handleAddTrigger }}>
            <RadixTabs.Root
                ref={ref}
                className={styles.root}
                onValueChange={(value) => {
                    if (value) {
                        setValue(value);
                    }
                }}
                value={value}
            >
                <RadixTabs.List ref={triggerListRef} data-size={size} className={styles.triggerList}>
                    {triggers.map((trigger) => trigger.element)}
                </RadixTabs.List>
                {children}
                {/* Active indicator */}
                <div className={styles.activeIndicator} />
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

export const TabsTrigger = ({ children, ...itemProps }: TabsTriggerProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { value, disabled } = useContext(TabConfigContext);

    const { addTrigger } = useContext(TabTriggerContext);

    const localRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        addTrigger({
            ref: ref || localRef,
            element: (
                <RadixTabs.Trigger
                    ref={ref || localRef}
                    {...itemProps}
                    className={styles.trigger}
                    asChild={false}
                    disabled={disabled}
                    value={value || ''}
                >
                    {children}
                </RadixTabs.Trigger>
            ),
        });
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
