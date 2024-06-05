/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { sectionStyles } from './styles/sectionStyles';

import { type LayoutComponentProps } from '#/types/layoutProps';

export type SectionProps = LayoutComponentProps & {
    children?: ReactNode;
    'data-test-id'?: string;
};

export const Section = ({ 'data-test-id': dataTestId = 'fondue-section', children }: SectionProps) => {
    return (
        <section className={sectionStyles()} data-test-id={dataTestId}>
            {children}
        </section>
    );
};
Section.displayName = 'Section';
