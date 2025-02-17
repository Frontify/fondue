/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue-icons';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { type MouseEventHandler, type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import styles from './styles/accordion.module.scss';

export type AccordionProps = { children?: ReactNode; className?: string };

export const AccordionRoot = ({ children, className }: AccordionProps) => {
    return (
        <RadixAccordion.Root className={cn([styles.root, className])} data-test-id="fondue-accordion" type="multiple">
            {children}
        </RadixAccordion.Root>
    );
};
AccordionRoot.displayName = 'Accordion.Root';

export type AccordionItemProps = {
    children?: ReactNode;
    value: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
};

export const AccordionItem = ({ children, value, className, onClick }: AccordionItemProps) => {
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
    onClick?: MouseEventHandler<HTMLDivElement>;
    padding?: boolean;
};

export const AccordionContent = ({ children, className, onClick, padding = true }: AccordionContentProps) => {
    return (
        <RadixAccordion.Content className={cn([styles.accordionContent, className])} onClick={onClick}>
            <div className={cn([styles.accordionContentText, !padding && styles.accordionContentTextNoPadding])}>
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
