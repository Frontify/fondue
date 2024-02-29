/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

export type DividerStyle = 'noline' | 'dashed' | 'solid' | 'dotted';

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
    noline: 'tw-border-none',
    dashed: 'tw-border-dashed',
    solid: 'tw-border-solid',
    dotted: 'tw-border-dotted',
};

const DIVIDER_TEST_ID = 'fondue-divider';

export const Divider = ({
    vertical = false,
    style = 'solid',
    height = DividerHeight.Small,
    'data-test-id': dataTestId = DIVIDER_TEST_ID,
    color = '#CCC',
}: DividerProps): ReactElement => {
    return vertical ? (
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
                className={`tw-w-px tw-h-full tw-border-r tw-m-0 ${styleMap[style]}`}
                style={{ borderRightColor: color }}
                data-test-id="fondue-divider-line"
            />
        </div>
    ) : (
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
    );
};
