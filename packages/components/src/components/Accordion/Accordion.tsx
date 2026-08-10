/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue-icons';
import * as RadixAccordion from '@radix-ui/react-accordion';
import {
    Children,
    createContext,
    forwardRef,
    isValidElement,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    type ForwardedRef,
    type MouseEventHandler,
    type ReactNode,
} from 'react';

import { useSyncRefs } from '#/hooks/useSyncRefs';

import styles from './styles/accordion.module.scss';

type AccordionRootContextValue = {
    registerItem: (value: string, element: HTMLDivElement | null) => void;
};

const AccordionRootContext = createContext<AccordionRootContextValue | null>(null);
AccordionRootContext.displayName = 'AccordionRootContext';

const findScrollableAncestor = (element: HTMLElement): HTMLElement | null => {
    let current: HTMLElement | null = element.parentElement;
    while (current) {
        const { overflowY } = window.getComputedStyle(current);
        if ((overflowY === 'auto' || overflowY === 'scroll') && current.scrollHeight > current.clientHeight) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
};

const restoreScrollForClosingItem = (itemEl: HTMLElement) => {
    const scrollContainer = findScrollableAncestor(itemEl);
    if (!scrollContainer) {
        return;
    }

    const itemRect = itemEl.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    const delta = itemRect.top - containerRect.top;

    if (delta >= 0) {
        return;
    }

    const contentEl = itemEl.querySelector<HTMLElement>(`:scope > .${styles.accordionContent}`);
    const startHeight = contentEl?.offsetHeight ?? 0;

    if (!contentEl || startHeight === 0) {
        scrollContainer.scrollTop = scrollContainer.scrollTop + delta;
        return;
    }

    const startTop = scrollContainer.scrollTop;
    const step = () => {
        const currentHeight = contentEl.offsetHeight;
        const progress = Math.min(Math.max(1 - currentHeight / startHeight, 0), 1);
        scrollContainer.scrollTop = startTop + delta * progress;
        if (currentHeight > 0 && progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
};

type AccordionPadding = 'none' | 'small' | 'medium' | 'large';

export type AccordionRootProps = {
    'data-test-id'?: string;
    /**
     * Show or hide the top and bottom border
     * @default true
     */
    border?: boolean;
    /**
     * Children of the Accordion component. This should contain the `Accordion.Item` components
     */
    children?: ReactNode;
    /**
     * The value of the items whose contents are expanded when the accordion is initially rendered.
     * Use `defaultValue` if you do not need to control the state of an accordion.
     */
    defaultValue?: string[];
    /**
     * Whether or not an accordion is disabled from user interaction.
     */
    disabled?: boolean;
    /**
     * The controlled stateful value of the accordion items whose contents are expanded.
     */
    value?: string[];
    /**
     * Controls if we show paddings around the header.
     * @default 'large'
     */
    padding?: AccordionPadding;
    /**
     * Select the used variant
     * @default 'default'
     */
    variant?: 'default' | 'pill';
    /**
     * When `true`, each `Accordion.Header` becomes sticky and pins to the top of the nearest
     * scrolling ancestor (e.g. a `ScrollArea`) while its item is in view.
     * @default false
     */
    sticky?: boolean;
    /**
     * Callback function that is called when the value of the accordion changes.
     */
    onValueChange?: (value: string[]) => void;
};

export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
    (
        {
            'data-test-id': dataTestId = 'fondue-accordion',
            border = true,
            children,
            defaultValue,
            disabled,
            value,
            padding = 'large',
            variant = 'default',
            sticky = false,
            onValueChange,
        }: AccordionRootProps,
        forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
        const rootRef = useRef<HTMLDivElement>(null);
        useSyncRefs(rootRef, forwardedRef);

        const itemsRef = useRef<Map<string, HTMLDivElement>>(new Map());
        const uncontrolledValueRef = useRef<string[]>(defaultValue ?? []);

        useEffect(() => {
            const rootElement = rootRef.current;
            if (!sticky || !rootElement) {
                return;
            }

            const items = itemsRef.current;
            let scrollContainer: HTMLElement | null = null;

            let frame = 0;
            const updateStuckItems = () => {
                frame = 0;
                scrollContainer = scrollContainer ?? findScrollableAncestor(rootElement);
                const containerTop = scrollContainer?.getBoundingClientRect().top ?? 0;

                for (const itemElement of items.values()) {
                    const { top, bottom } = itemElement.getBoundingClientRect();
                    // strictly below the container top, so a header resting at the top
                    // before any scroll has happened does not count as stuck
                    itemElement.dataset.stuck = String(top < containerTop && bottom > containerTop);
                }
            };

            updateStuckItems();

            const requestUpdate = () => {
                if (frame === 0) {
                    frame = requestAnimationFrame(updateStuckItems);
                }
            };

            // capture phase, since scroll events of nested containers do not bubble
            window.addEventListener('scroll', requestUpdate, { capture: true, passive: true });

            // open/close animations move the items without scrolling
            const resizeObserver = new ResizeObserver(requestUpdate);
            resizeObserver.observe(rootElement);

            return () => {
                cancelAnimationFrame(frame);
                window.removeEventListener('scroll', requestUpdate, { capture: true });
                resizeObserver.disconnect();
                for (const itemElement of items.values()) {
                    delete itemElement.dataset.stuck;
                }
            };
        }, [sticky]);

        const registerItem = useCallback((itemValue: string, element: HTMLDivElement | null) => {
            if (element) {
                itemsRef.current.set(itemValue, element);
            } else {
                itemsRef.current.delete(itemValue);
            }
        }, []);

        const contextValue = useMemo<AccordionRootContextValue>(() => ({ registerItem }), [registerItem]);

        const handleValueChange = useCallback(
            (newValue: string[]) => {
                if (sticky) {
                    const previous = value ?? uncontrolledValueRef.current;
                    for (const closedValue of previous) {
                        if (newValue.includes(closedValue)) {
                            continue;
                        }

                        const itemEl = itemsRef.current.get(closedValue);

                        if (itemEl) {
                            restoreScrollForClosingItem(itemEl);
                        }
                    }
                }

                if (value === undefined) {
                    uncontrolledValueRef.current = newValue;
                }
                onValueChange?.(newValue);
            },
            [sticky, value, onValueChange],
        );

        return (
            <AccordionRootContext.Provider value={contextValue}>
                <RadixAccordion.Root
                    ref={rootRef}
                    className={styles.root}
                    data-test-id={dataTestId}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    type="multiple"
                    value={value}
                    data-border={border}
                    data-accordion-padding={padding}
                    data-accordion-variant={variant}
                    data-sticky={sticky}
                    onValueChange={handleValueChange}
                >
                    {children}
                </RadixAccordion.Root>
            </AccordionRootContext.Provider>
        );
    },
);
AccordionRoot.displayName = 'Accordion.Root';

export type AccordionItemProps = {
    'data-test-id'?: string;
    /**
     * Children of the Accordion item. This should contain the `Accordion.Header` and `Accordion.Content` components
     */
    children?: ReactNode;
    /**
     * Whether or not an accordion item is disabled from user interaction.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * A string value for the accordion item. All items within an accordion should use a unique value.
     */
    value: string;
};

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
    (
        { 'data-test-id': dataTestId = 'fondue-accordion-item', children, disabled, value }: AccordionItemProps,
        ref: ForwardedRef<HTMLDivElement>,
    ) => {
        const rootContext = useContext(AccordionRootContext);
        const registerItem = rootContext?.registerItem;

        const setRefs = useCallback(
            (element: HTMLDivElement | null) => {
                registerItem?.(value, element);
                if (typeof ref === 'function') {
                    ref(element);
                } else if (ref) {
                    ref.current = element;
                }
            },
            [registerItem, ref, value],
        );

        return (
            <RadixAccordion.Item
                ref={setRefs}
                className={styles.accordionItem}
                value={value}
                onPointerDown={(event) => {
                    event.currentTarget.dataset.showFocusRing = 'false';
                }}
                onBlur={(event) => {
                    event.currentTarget.dataset.showFocusRing = 'true';
                }}
                disabled={disabled}
                data-test-id={dataTestId}
            >
                {children}
            </RadixAccordion.Item>
        );
    },
);
AccordionItem.displayName = 'Accordion.Item';

export type AccordionHeaderProps = {
    'data-test-id'?: string;
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     * @default false
     */
    asChild?: boolean;
    /**
     * Click callback for this item.
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
    /**
     * Children of the Accordion header.
     */
    children?: ReactNode;
};

export const AccordionHeader = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
    (
        { 'data-test-id': dataTestId = 'fondue-accordion-header', asChild, onClick, children }: AccordionHeaderProps,
        ref: ForwardedRef<HTMLHeadingElement>,
    ) => {
        const { slots, triggerContent } = useMemo(
            () =>
                Children.toArray(children).reduce<{ slots: ReactNode[]; triggerContent: ReactNode[] }>(
                    (acc, child) => {
                        if (isValidElement<AccordionSlotProps>(child) && child.type === ForwardedRefAccordionSlot) {
                            acc.slots.push(child);
                        } else {
                            acc.triggerContent.push(child);
                        }
                        return acc;
                    },
                    { slots: [], triggerContent: [] },
                ),
            [children],
        );

        return (
            <RadixAccordion.Header ref={ref} asChild={asChild} className={styles.accordionHeader} onClick={onClick}>
                <RadixAccordion.Trigger className={styles.accordionTrigger} data-test-id={dataTestId}>
                    <div className={styles.accordionTriggerContent}>{triggerContent}</div>
                    <IconCaretDown className={styles.accordionCaret} size="16" />
                </RadixAccordion.Trigger>
                {slots}
            </RadixAccordion.Header>
        );
    },
);
AccordionHeader.displayName = 'Accordion.Header';

type AccordionContentProps = {
    'data-test-id'?: string;
    /**
     * Children of the Accordion content. This contains the main content.
     */
    children?: ReactNode;
    /**
     * Adds a divider line between the header and the content.
     */
    divider?: boolean;
    /**
     * Click callback for the content.
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
    /**
     * Controls if we show paddings around the content.
     * @default 'large'
     */
    padding?: AccordionPadding;
};

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
    (
        {
            'data-test-id': dataTestId = 'collapsible-wrap',
            children,
            divider = false,
            onClick,
            padding,
        }: AccordionContentProps,
        ref: ForwardedRef<HTMLDivElement>,
    ) => {
        return (
            <RadixAccordion.Content
                ref={ref}
                className={styles.accordionContent}
                onClick={onClick}
                data-test-id={dataTestId}
                data-item-padding={padding}
                data-item-divider={divider}
            >
                <div className={styles.accordionContentText} data-test-id={`inner-${dataTestId}`}>
                    {children}
                </div>
            </RadixAccordion.Content>
        );
    },
);
AccordionContent.displayName = 'Accordion.Content';

export type AccordionSlotProps = {
    children: ReactNode;
    name?: 'action';
    'data-test-id'?: string;
};

export const AccordionSlot = forwardRef<HTMLDivElement, AccordionSlotProps>(
    (
        { children, name, 'data-test-id': dataTestId = 'fondue-accordion-slot' }: AccordionSlotProps,
        ref: ForwardedRef<HTMLDivElement>,
    ) => {
        return (
            <div data-name={name} className={styles.accordionSlot} data-test-id={dataTestId} ref={ref}>
                {children}
            </div>
        );
    },
);
AccordionSlot.displayName = 'Accordion.Slot';

const ForwardedRefAccordionSlot = AccordionSlot;

/**
 * @deprecated Use `Accordion.Header` instead.
 */
const DeprecatedAccordionTrigger = ({ children }: { children: ReactNode }) => children;

export const Accordion = {
    Root: AccordionRoot,
    Item: AccordionItem,
    Header: AccordionHeader,
    /**
     * @deprecated Use `Accordion.Header` instead.
     */
    Trigger: DeprecatedAccordionTrigger,
    Content: AccordionContent,
    Slot: ForwardedRefAccordionSlot,
};
