/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type Responsive, type LayoutComponentProps } from '#/helpers/layout';
import { propsToCssVariables } from '#/helpers/propsToCssVariables';

import styles from './styles/section.module.scss';

export type SectionProps = LayoutComponentProps & {
    /**
     * The display property of the Box component.
     * @default 'block'
     */
    display?: Responsive<'none' | 'block' | 'inline-block' | 'inline'>;

    children?: ReactNode;
    'data-test-id'?: string;
};

export const Section = ({ 'data-test-id': dataTestId = 'fondue-section', children, ...props }: SectionProps) => {
    return (
        <section className={styles.section} data-test-id={dataTestId} style={propsToCssVariables(props)}>
            {children}
        </section>
    );
};
Section.displayName = 'Section';
