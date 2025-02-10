/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, forwardRef, type ForwardedRef, type HTMLAttributeAnchorTarget } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';
import { cn } from '#/utilities/styleUtilities';

import styles from './styles/text.module.scss';

type TextWeight = 'default' | 'strong' | 'x-strong';
type TextSize = 'x-small' | 'small' | 'medium' | 'large';
type TextColor = 'default' | 'weak' | 'x-weak' | 'disabled' | 'negative' | 'positive' | 'warning' | 'interactive';
type BoxColor = 'neutral' | 'selected' | 'disabled' | 'positive' | 'negative' | 'warning';

type TagType = 'a' | 'abbr' | 'address' | 'em' | 'label' | 'li' | 'span' | 'strong' | 'time' | 'p';

export type TextProps<TTag extends TagType = 'span'> = CommonAriaProps &
    TagProps<TTag> & {
        /**
         * `id` represents the id of the element
         */
        id?: string;
        /**
         * `size` is the size of the text
         *
         * Values are 'x-small', 'small', 'medium'  or 'large'
         *
         * @default 'medium'
         */
        size?: TextSize;
        /**
         * `weight` is the weight of the font
         *
         * Values are 'default', 'strong' or 'x-strong'
         *
         * @default 'default'
         */
        weight?: TextWeight;
        /**
         * `as` is the html element used to render
         *
         * Values are 'a', 'abbr', 'address', 'em', 'label', 'li', 'span', 'strong', 'time' or 'p'
         *
         * @default 'span'
         */
        as?: TTag;
        /**
         * `color` is the texts color
         *
         * Values are 'default', 'weak', 'x-weak', 'disabled', 'negative', 'positive', 'warning' or 'interactive'
         *
         * @default 'default'
         */
        color?: TextColor;
        /**
         * `boxColor` is the texts color when used within a box
         *
         * Values are 'neutral', 'selected', 'disabled', 'positive', 'negative' or 'warning'
         * `boxColor` overrides the `color` prop
         *
         * @description optional color prop that uses the inverse box color when accessibility contrast is needed
         **/
        boxColor?: BoxColor;
        className?: string;
        children?: ReactNode;
    };

type TagPropMap = {
    a: { href?: string; target: HTMLAttributeAnchorTarget; rel?: string; title?: string };
    abbr: { title?: string };
    address: object;
    em: object;
    label: { for?: string };
    li: { value?: string };
    p: object;
    span: object;
    strong: object;
    time: { dateTime?: string };
};
type TagProps<TTag extends TagType> = TagPropMap[TTag];

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
