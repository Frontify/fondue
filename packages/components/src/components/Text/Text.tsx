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

const weightMap: Record<TextWeight, string> = {
    default: 'tw-font-regular',
    strong: 'tw-font-medium',
    'x-strong': 'tw-font-bold',
};

const sizeMap: Record<TextSize, string> = {
    'x-small': 'tw-text-body-x-small',
    small: 'tw-text-body-small',
    medium: 'tw-text-body-medium',
    large: 'tw-text-body-large',
};

const colorMap: Record<TextColor, string> = {
    default: 'tw-text-text',
    weak: 'tw-text-text-weak',
    'x-weak': 'tw-text-text-x-weak',
    disabled: 'tw-text-text-disabled',
    negative: 'tw-text-text-negative',
    positive: 'tw-text-text-positive',
    warning: 'tw-text-text-warning',
    interactive: 'tw-text-text-interactive',
};

const boxColorMap: Record<BoxColor, string> = {
    neutral: 'tw-text-box-neutral-inverse',
    selected: 'tw-text-box-selected-inverse',
    disabled: 'tw-text-box-disabled-inverse',
    positive: 'tw-text-box-positive-inverse',
    negative: 'tw-text-box-negative-inverse',
    warning: 'tw-text-box-warning-inverse',
};

export const Text = forwardRef(
    (
        { children, as: Tag = 'span', weight = 'default', size = 'medium', color = 'default', boxColor, ...props },
        ref,
    ) => (
        <Tag
            data-test-id="text"
            className={cn([
                styles.root,
                'tw-font-body tw-max-w-full',
                weightMap[weight],
                sizeMap[size],
                boxColor ? boxColorMap[boxColor] : colorMap[color],
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
