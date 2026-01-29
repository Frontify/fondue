/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ElementType, type ForwardedRef, forwardRef, type ReactNode } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';

import styles from './styles/heading.module.scss';

type HeadingWeight = 'default' | 'strong';
type HeadingSize = 'medium' | 'large' | 'x-large' | 'xx-large';
type HeadingColor = 'default' | 'weak' | 'x-weak' | 'disabled' | 'negative' | 'positive' | 'warning' | 'interactive';

type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';

export type HeadingProps<TTag extends TagType = 'span'> = CommonAriaProps & {
    'data-test-id'?: string;
    as?: TTag;
    children?: ReactNode;
    color?: HeadingColor;
    size?: HeadingSize;
    weight?: HeadingWeight;
    className?: string;
};

type HeadingElementType<TTag extends TagType> = TTag extends 'span'
    ? HTMLSpanElement
    : TTag extends 'p'
      ? HTMLParagraphElement
      : HTMLHeadingElement;

export const Heading = forwardRef(
    (
        {
            as: Tag = 'span' as ElementType,
            children,
            className,
            color = 'default',
            role,
            size = 'medium',
            weight = 'default',
            'data-test-id': dataTestId = 'fondue-heading',
            'aria-describedby': ariaDescribedBy,
            'aria-expanded': ariaExpanded,
            'aria-haspopup': ariaHasPopup,
            'aria-hidden': ariaHidden,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            ...props
        },
        ref,
    ) => {
        return (
            <Tag
                className={[
                    styles.root,
                    styles[`size-${size}`],
                    styles[`weight-${weight}`],
                    styles[`color-${color}`],
                    className,
                ]
                    .filter(Boolean)
                    .join(' ')}
                role={role}
                aria-label={ariaLabel}
                aria-hidden={ariaHidden}
                aria-describedby={ariaDescribedBy}
                aria-labelledby={ariaLabelledBy}
                aria-expanded={ariaExpanded}
                aria-haspopup={ariaHasPopup}
                data-test-id={dataTestId}
                ref={ref}
                {...props}
            >
                {children}
            </Tag>
        );
    },
) as (<TTag extends TagType = 'span'>(
    props: HeadingProps<TTag> & { ref?: ForwardedRef<HeadingElementType<TTag>> },
) => JSX.Element) & { displayName: string };

Heading.displayName = 'Heading';
