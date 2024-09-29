/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { type Responsive, type LayoutComponentProps } from '#/helpers/layout';
import { propsToCssVariables } from '#/helpers/propsToCssVariables';

import styles from './styles/section.module.scss';

export type SectionProps = LayoutComponentProps & {
    /**
     * The display property.
     * @default 'block'
     */
    display?: Responsive<'none' | 'block' | 'inline-block' | 'inline'>;

    children?: ReactNode;
    'data-test-id'?: string;
} & CommonAriaProps;

export const Section = ({ 'data-test-id': dataTestId = 'fondue-section', children, ...props }: SectionProps) => {
    return (
        <section
            data-fondue-component="Section"
            className={styles.root}
            data-test-id={dataTestId}
            style={propsToCssVariables(props)}
        >
            {children}
        </section>
    );
};
Section.displayName = 'Section';
