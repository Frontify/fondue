/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

export enum DividerStyle {
    NoLine = 'noline',
    Dashed = 'dashed',
    Solid = 'solid',
    Dotted = 'dotted',
}

export enum DividerHeight {
    Small = '36px',
    Medium = '60px',
    Large = '96px',
}

export type DividerProps = {
    as?: 'div' | 'li';
    style?: DividerStyle;
    height?: DividerHeight | string;
    color?: string;
    vertical?: boolean;
    'data-test-id'?: string;
};

const styleMap = {
    [DividerStyle.NoLine]: 'tw-border-none',
    [DividerStyle.Dashed]: 'tw-border-dashed',
    [DividerStyle.Solid]: 'tw-border-solid',
    [DividerStyle.Dotted]: 'tw-border-dotted',
};

const DIVIDER_TEST_ID = 'fondue-divider';

/**
 * @deprecated Please use updated Divider component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#divider the migration guide}.
 */
export const Divider = ({
    as = 'div',
    vertical = false,
    style = DividerStyle.Solid,
    height = DividerHeight.Small,
    'data-test-id': dataTestId = DIVIDER_TEST_ID,
    color = '#CCC',
}: DividerProps): ReactElement => {
    const verticalClassNames = `tw-w-px tw-h-full tw-border-r tw-m-0 ${styleMap[style]}`;
    const Component = as;

    return (
        <>
            {vertical && (
                <Component
                    aria-hidden="true"
                    className="tw-flex tw-self-stretch tw-mt-0 tw-mb-0 tw-items-center tw-justify-center"
                    data-test-id={dataTestId}
                    style={{
                        marginLeft: parseInt(height) / 2,
                        marginRight: parseInt(height) / 2,
                    }}
                >
                    <div
                        className={verticalClassNames}
                        style={{ borderRightColor: color }}
                        data-test-id="fondue-divider-line"
                    ></div>
                </Component>
            )}
            {!vertical && (
                <Component
                    aria-hidden="true"
                    className="tw-flex tw-items-center tw-w-full"
                    style={{ height }}
                    data-test-id={dataTestId}
                >
                    <hr
                        className={`tw-border-t tw-m-0 tw-w-full ${styleMap[style]}`}
                        style={{ borderTopColor: color }}
                        data-test-id="fondue-divider-line"
                    />
                </Component>
            )}
        </>
    );
};
Divider.displayName = 'FondueDivider';
