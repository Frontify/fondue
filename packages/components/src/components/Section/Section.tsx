/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import { type CommonAriaProps, type CommonGlobalProps } from '#/helpers/aria';
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
} & CommonAriaProps &
    CommonGlobalProps;

export const Section = forwardRef<HTMLDivElement, SectionProps>(
    (
        {
            'data-test-id': dataTestId = 'fondue-section',
            children,
            role,
            'aria-label': ariaLabel,
            'aria-hidden': ariaHidden,
            'aria-describedby': ariaDescribedBy,
            'aria-labelledby': ariaLabelledBy,
            'aria-expanded': ariaExpanded,
            'aria-haspopup': ariaHasPopup,
            lang,
            ...props
        },
        ref,
    ) => {
        return (
            <section
                className={styles.root}
                data-test-id={dataTestId}
                style={propsToCssVariables(props)}
                role={role}
                aria-label={ariaLabel}
                aria-hidden={ariaHidden}
                aria-describedby={ariaDescribedBy}
                aria-labelledby={ariaLabelledBy}
                aria-expanded={ariaExpanded}
                aria-haspopup={ariaHasPopup}
                lang={lang}
                ref={ref}
            >
                {children}
            </section>
        );
    },
);
Section.displayName = 'Section';
