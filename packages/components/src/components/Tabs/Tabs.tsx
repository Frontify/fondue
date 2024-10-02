/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDotsHorizontal } from '@frontify/fondue-icons';
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
    cloneElement,
} from 'react';

import { useControllableState } from '#/hooks/useControllableState';
import { syncRefs } from '#/utilities/domUtilities';

import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';

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

type TabTrigger = {
    ref: RefObject<HTMLButtonElement>;
    element: JSX.Element;
    disabled: boolean;
    value: string;
    children: ReactNode;
};

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
    const [triggersOutOfView, setTriggersOutOfView] = useState<{ value: string; element: JSX.Element }[]>([]);

    const handleAddTrigger = (trigger: TabTrigger) => {
        setTriggers((prev) => [...prev, trigger]);
    };

    const calculateTriggersOutOfView = (triggers: TabTrigger[], triggerListRef: RefObject<HTMLDivElement>) => {
        const triggersOutOfView: { value: string; element: JSX.Element }[] = [];
        for (const trigger of triggers) {
            if (trigger.ref.current && triggerListRef.current) {
                if (
                    trigger.ref.current.getBoundingClientRect().right >
                        triggerListRef.current?.getBoundingClientRect().right ||
                    trigger.ref.current.getBoundingClientRect().left < 0
                ) {
                    triggersOutOfView.push({
                        value: trigger.value,
                        element: cloneElement(trigger.element, { ref: null }),
                    });
                }
            }
        }
        return triggersOutOfView;
    };

    useLayoutEffect(() => {
        setTriggersOutOfView(calculateTriggersOutOfView(triggers, triggerListRef));
    }, [triggerListRef, triggers, value]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setTriggersOutOfView(calculateTriggersOutOfView(triggers, triggerListRef));
        });

        triggerListRef.current?.addEventListener('scroll', () => {
            setTriggersOutOfView(calculateTriggersOutOfView(triggers, triggerListRef));
        });

        return () => {
            window.removeEventListener('resize', () => {
                setTriggersOutOfView(calculateTriggersOutOfView(triggers, triggerListRef));
            });
            triggerListRef.current?.removeEventListener('scroll', () => {
                setTriggersOutOfView(calculateTriggersOutOfView(triggers, triggerListRef));
            });
        };
    }, [triggers, triggerListRef]);

    useEffect(() => {
        const activeTrigger = triggerListRef.current?.querySelector('[data-state="active"]');
        if (activeTrigger) {
            activeTrigger.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [value]);

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
                <div className={styles.triggerListWrapper}>
                    <RadixTabs.List ref={triggerListRef} data-size={size} className={styles.triggerList}>
                        {triggers.map((trigger) => (
                            <RadixTabs.Trigger
                                key={trigger.ref.current?.value}
                                value={trigger.value}
                                className={styles.trigger}
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
                                    onSelect={() => {
                                        setValue(trigger.value);
                                    }}
                                    key={trigger.value}
                                >
                                    {trigger.element}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Content>
                    </Dropdown.Root>
                </div>
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

export const TabsTrigger = ({ children }: TabsTriggerProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { value, disabled } = useContext(TabConfigContext);

    const { addTrigger } = useContext(TabTriggerContext);

    const localRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        addTrigger({
            ref: localRef || ref,
            value: value || '',
            children,
            disabled,
            element: <span ref={localRef || ref}>{children}</span>,
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
