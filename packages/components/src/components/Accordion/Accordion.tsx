/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as RadixAccordion from '@radix-ui/react-accordion';
import { type ReactNode } from 'react';

import styles from './styles/accordion.module.scss';

export type AccordionProps = { children?: ReactNode };

export const AccordionRoot = ({ children }: AccordionProps) => {
    return (
        <RadixAccordion.Root className={styles.root} data-test-id="fondue-accordion" type="multiple">
            {children}
        </RadixAccordion.Root>
    );
};
AccordionRoot.displayName = 'Accordion.Root';

export type AccordionItemProps = { children?: ReactNode; value: string };

export const AccordionItem = ({ children, value }: AccordionItemProps) => {
    return (
        <RadixAccordion.Item className={styles.accordionItem} value={value}>
            {children}
        </RadixAccordion.Item>
    );
};
AccordionItem.displayName = 'Accordion.Item';

export type AccordionHeaderProps = { children?: ReactNode };

export const AccordionHeader = ({ children }: AccordionHeaderProps) => {
    return <RadixAccordion.Header>{children}</RadixAccordion.Header>;
};
AccordionHeader.displayName = 'Accordion.Header';

export type AccordionTriggerProps = { children?: ReactNode };

export const AccordionTrigger = ({ children }: AccordionTriggerProps) => {
    console.log(styles);

    return <RadixAccordion.Trigger className={styles.accordionTrigger}>{children}</RadixAccordion.Trigger>;
};
AccordionTrigger.displayName = 'Accordion.Trigger';

type AccordionContentProps = { children?: ReactNode };

export const AccordionContent = ({ children }: AccordionContentProps) => {
    return <RadixAccordion.Content>{children}</RadixAccordion.Content>;
};
AccordionContent.displayName = 'Accordion.Content';

export const Accordion = {
    Root: AccordionRoot,
    Item: AccordionItem,
    Header: AccordionHeader,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
};
