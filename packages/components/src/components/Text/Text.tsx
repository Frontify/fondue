/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, forwardRef, type ForwardedRef, type HTMLAttributeAnchorTarget } from 'react';

import { type CommonAriaProps } from '#/helpers/aria';

import styles from './styles/text.module.scss';

type TextWeight = 'default' | 'strong' | 'x-strong';
type TextSize = 'x-small' | 'small' | 'medium' | 'large';
type TextColor = 'default' | 'weak' | 'x-weak' | 'disabled' | 'negative' | 'positive' | 'warning' | 'interactive';
type BoxColor = 'neutral' | 'selected' | 'disabled' | 'positive' | 'negative' | 'warning';

type TagType = 'a' | 'abbr' | 'address' | 'em' | 'label' | 'li' | 'span' | 'strong' | 'time' | 'p';

export type TextProps<TTag extends TagType = 'span'> = CommonAriaProps &
    TagProps<TTag> & {
        /**
         * Id of the element
         */
        id?: string;
        /**
         * Size of the text
         *
         * @default 'medium'
         */
        size?: TextSize;
        /**
         * Weight of the font
         *
         * @default 'default'
         */
        weight?: TextWeight;
        /**
         * The html element used to render
         *
         * @default 'span'
         */
        as?: TTag;
        /**
         * Color of the text
         *
         * @default 'default'
         */
        color?: TextColor;
        /**
         * The texts color when used within a box
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
            className={[
                styles.root,
                styles[`size-${size}`],
                styles[`weight-${weight}`],
                styles[boxColor ? `color-box-${boxColor}` : `color-${color}`],
                className,
            ]
                .filter(Boolean)
                .join(' ')}
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
