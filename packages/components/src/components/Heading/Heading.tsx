/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef, type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { propsToCssVariables } from '#/helpers/propsToCssVariables';
import { merge } from '#/utilities/merge';

import styles from './styles/heading.module.scss';

type HeadingWeight = 'default' | 'strong';
type HeadingSize = 'medium' | 'large' | 'x-large' | 'xx-large';
type HeadingColor = 'default' | 'weak' | 'x-weak' | 'disabled' | 'negative' | 'positive' | 'warning' | 'interactive';

export type SharedTypographyProps = {
    overflow?: TypographyOverflow;
    whitespace?: TypographyWhitespace;
    display?: TypographyDisplay;
    wordBreak?: TypographyWordBreak;
    decoration?: TypographyDecoration;
};

export type TypographyOverflow = 'truncate' | 'ellipsis' | 'clip' | 'visible';
export type TypographyWhitespace = 'unset' | 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap';
export type TypographyDisplay = 'inline-block' | 'block' | 'inline' | 'none';
export type TypographyWordBreak = 'break-words' | 'break-all' | 'normal';
export type TypographyDecoration = 'underline' | 'line-through' | 'none';

export type HeadingProps = SharedTypographyProps & {
    'data-test-id'?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
    children?: ReactNode;
    color?: HeadingColor;
    size?: HeadingSize;
    weight?: HeadingWeight;
} & CommonAriaProps;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    (
        {
            'data-test-id': dataTestId = 'fondue-heading',
            as: Tag = 'span',
            color = 'default',
            size = 'medium',
            weight = 'default',
            children,
            role,
            'aria-label': ariaLabel,
            'aria-hidden': ariaHidden,
            'aria-describedby': ariaDescribedBy,
            'aria-labelledby': ariaLabelledBy,
            'aria-expanded': ariaExpanded,
            'aria-haspopup': ariaHasPopup,
            ...props
        },
        ref,
    ) => {
        return (
            <Tag
                className={merge([
                    styles.root,
                    styles[`size-${size}`],
                    styles[`weight-${weight}`],
                    styles[`color-${color}`],
                ])}
                style={propsToCssVariables(props)}
                role={role}
                aria-label={ariaLabel}
                aria-hidden={ariaHidden}
                aria-describedby={ariaDescribedBy}
                aria-labelledby={ariaLabelledBy}
                aria-expanded={ariaExpanded}
                aria-haspopup={ariaHasPopup}
                data-test-id={dataTestId}
                ref={ref}
            >
                {children}
            </Tag>
        );
    },
);
Heading.displayName = 'Heading';
