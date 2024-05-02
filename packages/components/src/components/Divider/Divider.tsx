/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { cn } from '#/utilities/styleUtilities';

import { dividerStyles } from './styles/dividerStyles';
import { lineStyles } from './styles/lineStyles';

type DividerStyle = 'noline' | 'dashed' | 'solid';
type DividerPadding = 'none' | 'small' | 'medium' | 'large';
type DividerDirection = 'horizontal' | 'vertical';
type DividerColor = 'weak' | 'default' | 'strong' | 'x-strong';

export type DividerProps = {
    style?: DividerStyle;
    padding?: DividerPadding;
    color?: DividerColor;
    direction?: DividerDirection;
    'data-test-id'?: string;
    className?: string;
};

const DIVIDER_TEST_ID = 'fondue-divider';

export const Divider = ({
    'data-test-id': dataTestId = DIVIDER_TEST_ID,
    direction = 'horizontal',
    className,
    ...props
}: DividerProps): ReactElement => {
    return (
        <div
            aria-hidden="true"
            className={cn(
                dividerStyles({
                    direction,
                    ...props,
                }),
                className,
            )}
            data-test-id={dataTestId}
        >
            <hr
                className={lineStyles({
                    direction,
                    ...props,
                })}
            />
            {/* direction === 'horizontal' ? (
                <div
                    className={`tw-w-px tw-h-full tw-border-r tw-m-0 ${styleMap[style]}`}
                    style={{ borderRightColor: color }}
                    data-test-id="fondue-divider-line"
                />
            ) : (
                <hr
                    className={`tw-border-t tw-m-0 tw-w-full ${styleMap[style]}`}
                    style={{ borderTopColor: color }}
                    data-test-id="fondue-divider-line"
                />
                 ) */}
        </div>
    ); /* (
        <div
            aria-hidden="true"
            className={cn(
                dividerStyles({
                    ...props,
                }),
                'tw-full',
            )}
            style={{ height: heightMap[height] }}
            data-test-id={dataTestId}
        ></div>,
    ); */
};
