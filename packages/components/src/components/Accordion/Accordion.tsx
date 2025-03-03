/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue-icons';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { type MouseEventHandler, type ReactNode } from 'react';

import styles from './styles/accordion.module.scss';

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
};

export const AccordionRoot = ({
    'data-test-id': dataTestId = 'fondue-accordion',
    border = true,
    children,
    defaultValue,
    disabled,
    value,
}: AccordionRootProps) => {
    return (
        <RadixAccordion.Root
            className={styles.root}
            data-test-id={dataTestId}
            defaultValue={defaultValue}
            disabled={disabled}
            type="multiple"
            value={value}
            data-border={border}
        >
            {children}
        </RadixAccordion.Root>
    );
};
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
     * Click callback for this item.
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
    /**
     * A string value for the accordion item. All items within an accordion should use a unique value.
     */
    value: string;
};

export const AccordionItem = ({
    'data-test-id': dataTestId = 'fondue-accordion-item',
    children,
    disabled,
    onClick,
    value,
}: AccordionItemProps) => {
    return (
        <RadixAccordion.Item
            className={styles.accordionItem}
            value={value}
            onPointerDown={(event) => {
                event.currentTarget.dataset.showFocusRing = 'false';
            }}
            onBlur={(event) => {
                event.currentTarget.dataset.showFocusRing = 'true';
            }}
            onClick={onClick}
            disabled={disabled}
            data-test-id={dataTestId}
        >
            {children}
        </RadixAccordion.Item>
    );
};
AccordionItem.displayName = 'Accordion.Item';

export type AccordionHeaderProps = {
    /**
     * Children of the Accordion header. This should contain `Accordion.Trigger`
     */
    children?: ReactNode;
};

export const AccordionHeader = ({ children }: AccordionHeaderProps) => {
    return <RadixAccordion.Header>{children}</RadixAccordion.Header>;
};
AccordionHeader.displayName = 'Accordion.Header';

export type AccordionTriggerProps = {
    'data-test-id'?: string;
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     * @default false
     */
    asChild?: boolean;
    /**
     * Children of the Accordion trigger. This contains the actually clickable and visible header content
     */
    children?: ReactNode;
};

export const AccordionTrigger = ({
    'data-test-id': dataTestId = 'fondue-accordion-trigger',
    asChild,
    children,
}: AccordionTriggerProps) => {
    return (
        <RadixAccordion.Trigger asChild={asChild} className={styles.accordionTrigger} data-test-id={dataTestId}>
            {children}
            <IconCaretDown className={styles.accordionCaret} size="16" />
        </RadixAccordion.Trigger>
    );
};
AccordionTrigger.displayName = 'Accordion.Trigger';

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

export const AccordionContent = ({
    'data-test-id': dataTestId = 'collapsible-wrap',
    children,
    divider = false,
    onClick,
    padding = 'large',
}: AccordionContentProps) => {
    return (
        <RadixAccordion.Content
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
};
AccordionContent.displayName = 'Accordion.Content';

export const Accordion = {
    Root: AccordionRoot,
    Item: AccordionItem,
    Header: AccordionHeader,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
};
