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

export const Divider = ({
    vertical = false,
    style = DividerStyle.Solid,
    height = DividerHeight.Small,
    'data-test-id': dataTestId = DIVIDER_TEST_ID,
    color = '#CCC',
}: DividerProps): ReactElement => {
    const verticalClassNames = `tw-w-px tw-h-full tw-border-r tw-m-0 ${styleMap[style]}`;
    return (
        <>
            {vertical && (
                <div
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
                </div>
            )}
            {!vertical && (
                <div
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
                </div>
            )}
        </>
    );
};
Divider.displayName = 'FondueDivider';
