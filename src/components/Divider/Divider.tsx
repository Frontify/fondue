/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';

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
};

const styleMap = {
    [DividerStyle.NoLine]: 'tw-border-none',
    [DividerStyle.Dashed]: 'tw-border-dashed',
    [DividerStyle.Solid]: 'tw-border-solid',
    [DividerStyle.Dotted]: 'tw-border-dotted',
};

export const Divider = ({
    vertical = false,
    style = DividerStyle.Solid,
    height = DividerHeight.Small,
    color = '#CCC',
}: DividerProps): ReactElement => {
    const verticalClassNames = `tw-w-px tw-h-full tw-border-r tw-m-0 ${styleMap[style]}`;
    return (
        <>
            {vertical && (
                <div
                    aria-hidden="true"
                    className="tw-flex tw-self-stretch tw-mt-0 tw-mb-0 tw-items-center tw-justify-center"
                    style={{ width: height }}
                    data-test-id="divider"
                >
                    <div
                        className={verticalClassNames}
                        style={{ borderRightColor: color }}
                        data-test-id="divider-line"
                    ></div>
                </div>
            )}
            {!vertical && (
                <div aria-hidden="true" className="tw-flex tw-items-center" style={{ height }} data-test-id="divider">
                    <hr
                        className={`tw-border-t tw-m-0 tw-w-full ${styleMap[style]}`}
                        style={{ borderTopColor: color }}
                        data-test-id="divider-line"
                    />
                </div>
            )}
        </>
    );
};
Divider.displayName = 'FondueDivider';
