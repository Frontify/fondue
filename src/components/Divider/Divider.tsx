/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';

export type DividerVertical = true | false;

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
    vertical?: DividerVertical;
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
        <div className="tw-flex tw-items-center" style={{ height }} data-test-id="divider">
            {vertical ? (
                <div
                    className={`${verticalClassNames}`}
                    style={{ borderRightColor: color }}
                    data-test-id="divider-line"
                ></div>
            ) : (
                <hr
                    className={`tw-border-t tw-m-0 tw-w-full ${styleMap[style]}`}
                    style={{ borderTopColor: color }}
                    data-test-id="divider-line"
                />
            )}
        </div>
    );
};
Divider.displayName = 'FondueDivider';
