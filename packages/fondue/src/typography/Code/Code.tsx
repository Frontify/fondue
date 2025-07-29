/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement, type ReactNode } from 'react';

import { merge } from '@utilities/merge';

type CodeWeight = 'default' | 'strong';

type CodeSize = 'small' | 'medium' | 'large';

type CodeColor = 'default' | 'weak' | 'x-weak' | 'disabled' | 'negative' | 'positive' | 'warning' | 'interactive';

/**
 * @deprecated Please use updated Code component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#code the migration guide}.
 */
export type CodeProps = {
    size?: CodeSize;
    weight?: CodeWeight;
    as?: 'code' | 'pre' | 'span';
    color?: CodeColor;
    children?: ReactNode;
};

const weightMap: Record<CodeWeight, string> = {
    default: 'tw-font-regular',
    strong: 'tw-font-bold',
};

const sizeMap: Record<CodeSize, string> = {
    small: 'tw-text-code-small',
    medium: 'tw-text-code-medium',
    large: 'tw-text-code-large',
};

const colorMap: Record<CodeColor, string> = {
    default: 'tw-text-text',
    weak: 'tw-text-text-weak',
    'x-weak': 'tw-text-text-x-weak',
    disabled: 'tw-text-text-disabled',
    negative: 'tw-text-text-negative',
    positive: 'tw-text-text-positive',
    warning: 'tw-text-text-warning',
    interactive: 'tw-text-text-interactive',
};

/**
 * @deprecated Please use updated Code component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#code the migration guide}.
 */
export const Code = ({
    children,
    as: Tag = 'span',
    weight = 'default',
    size = 'medium',
    color = 'default',
}: CodeProps): ReactElement => {
    return (
        <Tag data-test-id="code" className={merge(['tw-font-code', weightMap[weight], sizeMap[size], colorMap[color]])}>
            {children}
        </Tag>
    );
};
Code.displayName = 'FondueCode';
