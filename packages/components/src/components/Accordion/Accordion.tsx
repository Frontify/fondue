/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue-icons';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { type MouseEventHandler, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import styles from './styles/accordion.module.scss';

export type AccordionProps = {
    'data-test-id'?: string;
    border?: boolean;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
};

export const AccordionRoot = ({
    'data-test-id': dataTestId = 'fondue-accordion',
    border = true,
    children,
    className,
    disabled,
}: AccordionProps) => {
    return (
        <RadixAccordion.Root
            className={cn([styles.root, border && styles.rootBorder, className])}
            data-test-id={dataTestId}
            type="multiple"
            disabled={disabled}
        >
            {children}
        </RadixAccordion.Root>
    );
};
AccordionRoot.displayName = 'Accordion.Root';

export type AccordionItemProps = {
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    value: string;
};

export const AccordionItem = ({ children, value, className, onClick, disabled }: AccordionItemProps) => {
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

export type AccordionTriggerProps = { children?: ReactNode; className?: string };

export const AccordionTrigger = ({ children, className }: AccordionTriggerProps) => {
    return (
        <RadixAccordion.Trigger className={cn([styles.accordionTrigger, className])}>
            {children}
            <IconCaretDown className={styles.accordionCaret} size="16" />
        </RadixAccordion.Trigger>
    );
};
AccordionTrigger.displayName = 'Accordion.Trigger';

type AccordionContentProps = {
    children?: ReactNode;
    className?: string;
    divider?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    padding?: boolean;
};

export const AccordionContent = ({ children, className, onClick, padding = true, divider }: AccordionContentProps) => {
    return (
        <RadixAccordion.Content className={cn([styles.accordionContent, className])} onClick={onClick}>
            <div
                className={cn([
                    styles.accordionContentText,
                    !padding && styles.accordionContentTextNoPadding,
                    divider && styles.accordionContentTextDivider,
                ])}
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
