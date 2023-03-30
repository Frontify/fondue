/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import React, { PropsWithChildren, ReactElement } from 'react';

export type StackSpacing = 'none' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type StackJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

export type StackAlign = 'start' | 'end' | 'stretch' | 'center';

export type StackProps = PropsWithChildren<{
    padding: StackSpacing;
    spacing: StackSpacing;
    direction?: 'row' | 'column';
    wrap?: boolean;
    justify?: StackJustify;
    align?: StackAlign;
}>;

const paddingMap: Record<StackSpacing, string> = {
    none: 'tw-p-0',
    xxs: 'tw-p-xxs',
    xs: 'tw-p-xs',
    s: 'tw-p-s',
    m: 'tw-p-m',
    l: 'tw-p-l',
    xl: 'tw-p-xl',
    xxl: 'tw-p-xxl',
};

const spacingMap: Record<StackSpacing, string> = {
    none: 'tw-gap-0',
    xxs: 'tw-gap-xxs',
    xs: 'tw-gap-xs',
    s: 'tw-gap-s',
    m: 'tw-gap-m',
    l: 'tw-gap-l',
    xl: 'tw-gap-xl',
    xxl: 'tw-gap-xxl',
};

const justifyMap: Record<StackJustify, string> = {
    start: 'tw-justify-start',
    end: 'tw-justify-end',
    center: 'tw-justify-center',
    between: 'tw-justify-between',
    around: 'tw-justify-around',
    evenly: 'tw-justify-evenly',
};

const alignMap: Record<StackAlign, string> = {
    start: 'tw-items-start',
    end: 'tw-items-end',
    center: 'tw-items-center',
    stretch: 'tw-items-stretch',
};

export const Stack = ({
    children,
    padding,
    spacing,
    direction = 'row',
    wrap = false,
    justify = 'start',
    align = 'stretch',
}: StackProps): ReactElement => {
    return (
        <div
            data-test-id="stack"
            className={merge([
                'tw-flex',
                paddingMap[padding],
                spacingMap[spacing],
                justifyMap[justify],
                alignMap[align],
                direction === 'row' ? 'tw-flex-row' : 'tw-flex-col',
                wrap ? 'tw-flex-wrap' : 'tw-flex-nowrap',
            ])}
        >
            {children}
        </div>
    );
};
Stack.displayName = 'FondueStack';
