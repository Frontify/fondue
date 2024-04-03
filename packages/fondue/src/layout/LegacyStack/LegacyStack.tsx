/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement, type ReactNode } from 'react';

import { merge } from '@utilities/merge';

export type LegacyStackSpacing = 'none' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type LegacyStackJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

export type LegacyStackAlign = 'start' | 'end' | 'stretch' | 'center';

export type LegacyStackProps = {
    padding: LegacyStackSpacing;
    spacing: LegacyStackSpacing;
    direction?: 'row' | 'column';
    wrap?: boolean;
    justify?: LegacyStackJustify;
    align?: LegacyStackAlign;
    children?: ReactNode;
    'data-test-id'?: string;
};

const paddingMap: Record<LegacyStackSpacing, string> = {
    none: 'tw-p-0',
    xxs: 'tw-p-xxs',
    xs: 'tw-p-xs',
    s: 'tw-p-s',
    m: 'tw-p-m',
    l: 'tw-p-l',
    xl: 'tw-p-xl',
    xxl: 'tw-p-xxl',
};

const spacingMap: Record<LegacyStackSpacing, string> = {
    none: 'tw-gap-0',
    xxs: 'tw-gap-xxs',
    xs: 'tw-gap-xs',
    s: 'tw-gap-s',
    m: 'tw-gap-m',
    l: 'tw-gap-l',
    xl: 'tw-gap-xl',
    xxl: 'tw-gap-xxl',
};

const justifyMap: Record<LegacyStackJustify, string> = {
    start: 'tw-justify-start',
    end: 'tw-justify-end',
    center: 'tw-justify-center',
    between: 'tw-justify-between',
    around: 'tw-justify-around',
    evenly: 'tw-justify-evenly',
};

const alignMap: Record<LegacyStackAlign, string> = {
    start: 'tw-items-start',
    end: 'tw-items-end',
    center: 'tw-items-center',
    stretch: 'tw-items-stretch',
};

const DEFAULT_DATA_TEST_ID = 'fondue-legacy-stack';

export const LegacyStack = ({
    children,
    padding,
    spacing,
    direction = 'row',
    wrap = false,
    justify = 'start',
    align = 'stretch',
    'data-test-id': dataTestId = DEFAULT_DATA_TEST_ID,
}: LegacyStackProps): ReactElement => {
    return (
        <div
            data-test-id={dataTestId}
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
LegacyStack.displayName = 'FondueLegacyStack';
