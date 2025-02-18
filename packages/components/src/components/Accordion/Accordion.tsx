/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue-icons';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { type MouseEventHandler, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import styles from './styles/accordion.module.scss';

export type AccordionProps = {
    'data-test-id'?: string;
    /**
     * show or hide the top and bottom border
     * @default true
     */
    border?: boolean;
    children?: ReactNode;
    className?: string;
    /**
     * The value of the items whose contents are expanded when the accordion is initially rendered. Use
     * `defaultValue` if you do not need to control the state of an accordion.
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
    className,
    defaultValue,
    disabled,
    value,
}: AccordionProps) => {
    return (
        <RadixAccordion.Root
            className={cn([styles.root, border && styles.rootBorder, className])}
            data-test-id={dataTestId}
            defaultValue={defaultValue}
            disabled={disabled}
            type="multiple"
            value={value}
        >
            {children}
        </RadixAccordion.Root>
    );
};
AccordionRoot.displayName = 'Accordion.Root';

export type AccordionItemProps = {
    'data-test-id'?: string;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    value: string;
};

export const AccordionItem = ({
    'data-test-id': dataTestId = 'fondue-accordion-item',
    children,
    className,
    /**
     * Whether or not an accordion item is disabled from user interaction.
     *
     * @default false
     */
    disabled,
    onClick,
    /**
     * A string value for the accordion item. All items within an accordion should use a unique value.
     */
    value,
}: AccordionItemProps) => {
    return (
        <RadixAccordion.Item
            className={cn([styles.accordionItem, className])}
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

export type AccordionHeaderProps = { children?: ReactNode; className?: string };

export const AccordionHeader = ({ children, className }: AccordionHeaderProps) => {
    return <RadixAccordion.Header className={cn([className])}>{children}</RadixAccordion.Header>;
};
AccordionHeader.displayName = 'Accordion.Header';

export type AccordionTriggerProps = { children?: ReactNode; className?: string; 'data-test-id'?: string };

export const AccordionTrigger = ({
    'data-test-id': dataTestId = 'fondue-accordion-trigger',
    children,
    className,
}: AccordionTriggerProps) => {
    return (
        <RadixAccordion.Trigger className={cn([styles.accordionTrigger, className])} data-test-id={dataTestId}>
            {children}
            <IconCaretDown className={styles.accordionCaret} size="16" />
        </RadixAccordion.Trigger>
    );
};
AccordionTrigger.displayName = 'Accordion.Trigger';

type AccordionContentProps = {
    'data-test-id'?: string;
    children?: ReactNode;
    className?: string;
    /**
     * adds a divider line between the header and the content
     */
    divider?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    /**
     * controls if we show paddings around the content
     * @default treu
     */
    padding?: boolean;
};

export const AccordionContent = ({
    'data-test-id': dataTestId = 'collapsible-wrap',
    children,
    className,
    divider,
    onClick,
    padding = true,
}: AccordionContentProps) => {
    return (
        <RadixAccordion.Content
            className={cn([styles.accordionContent, className])}
            onClick={onClick}
            data-test-id={dataTestId}
        >
            <div
                className={cn([
                    styles.accordionContentText,
                    !padding && styles.accordionContentTextNoPadding,
                    divider && styles.accordionContentTextDivider,
                ])}
                data-test-id={`inner-${dataTestId}`}
            >
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
