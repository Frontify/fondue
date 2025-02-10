/* (c) Copyright Frontify Ltd., all rights reserved. */


import { type HTMLAttributes, type DetailedHTMLProps, type ReactNode, forwardRef, type ForwardedRef } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { cn } from '#/utilities/styleUtilities';

import styles from './styles/text.module.scss';

type TextWeight = 'default' | 'strong' | 'x-strong';
type TextSize = 'x-small' | 'small' | 'medium' | 'large';
type TextColor = 'default' | 'weak' | 'x-weak' | 'disabled' | 'negative' | 'positive' | 'warning' | 'interactive';
type BoxColor = 'neutral' | 'selected' | 'disabled' | 'positive' | 'negative' | 'warning';

type TagType = 'a' | 'abbr' | 'address' | 'em' | 'label' | 'li' | 'span' | 'strong' | 'time' | 'p';

export type TextProps<TTag extends TagType = 'span'> = CommonAriaProps &
    DetailedHTMLProps<HTMLAttributes<TextElementType<TTag>>, TextElementType<TTag>> & {
        size?: TextSize;
        weight?: TextWeight;
        as?: TTag;
        color?: TextColor;
        /** @description optional color prop that uses the inverse box color when accessibility contrast is needed */
        boxColor?: BoxColor;
        children?: ReactNode;
    };

type TextElementMap = {
    a: HTMLAnchorElement;
    abbr: HTMLElement;
    address: HTMLElement;
    em: HTMLElement;
    label: HTMLLabelElement;
    li: HTMLLIElement;
    p: HTMLParagraphElement;
    span: HTMLSpanElement;
    strong: HTMLElement;
    time: HTMLTimeElement;
};

type TextElementType<TTag extends TagType> = TextElementMap[TTag];

export const Text = forwardRef(
    (
        {
            children,
            as: Tag = 'span',
            size = 'medium',
            weight = 'default',
            color = 'default',
            boxColor,
            className,
            ...props
        },
        ref,
    ) => (
        <Tag
            data-test-id="text"
            className={cn([
                styles.root,
                styles[`size-${size}`],
                styles[`weight-${weight}`],
                styles[boxColor ? `color-box-${boxColor}` : `color-${color}`],
                className,
            ])}
            // @ts-expect-error ref can not be inferred properly by TS
            ref={ref}
            {...props}
        >
            {children}
        </Tag>
    ),
) as (<TTag extends TagType = 'span'>(
    props: TextProps<TTag> & { ref?: ForwardedRef<TextElementType<TTag>> },
) => JSX.Element) & { displayName: string };

Text.displayName = 'FondueText';
