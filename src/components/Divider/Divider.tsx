/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';

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
};

const styleMap = {
    [DividerStyle.NoLine]: 'tw-border-none',
    [DividerStyle.Dashed]: 'tw-border-dashed',
    [DividerStyle.Solid]: 'tw-border-solid',
    [DividerStyle.Dotted]: 'tw-border-dotted',
};

export const Divider: FC<DividerProps> = ({
    style = DividerStyle.Solid,
    height = DividerHeight.Small,
    color: borderTopColor = '#CCC',
}) => (
    <div className="tw-flex tw-items-center" style={{ height }} data-test-id="divider">
        <hr
            className={`tw-border-t tw-m-0 tw-w-full ${styleMap[style]}`}
            style={{ borderTopColor }}
            data-test-id="divider-hr"
        />
    </div>
);
Divider.displayName = 'FondueDivider';
