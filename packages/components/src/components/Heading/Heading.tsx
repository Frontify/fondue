/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ElementType, type ForwardedRef, forwardRef, type ReactNode } from 'react';

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

type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';

export type HeadingProps<TTag extends TagType> = SharedTypographyProps & {
    'data-test-id'?: string;
    as?: TTag;
    children?: ReactNode;
    color?: HeadingColor;
    size?: HeadingSize;
    weight?: HeadingWeight;
} & CommonAriaProps;

type HeadingRefType<TTag extends TagType> = TTag extends 'span'
    ? HTMLSpanElement
    : TTag extends 'p'
      ? HTMLParagraphElement
      : HTMLHeadingElement;

export const Heading = forwardRef(
    (
        {
            'data-test-id': dataTestId = 'fondue-heading',
            as: Tag = 'span' as ElementType,
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
) as (<TTag extends TagType = 'span'>(
    props: HeadingProps<TTag> & { ref?: ForwardedRef<HeadingRefType<TTag>> },
) => JSX.Element) & { displayName: string };

Heading.displayName = 'Heading';
