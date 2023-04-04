/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, cloneElement, useEffect } from 'react';
import { DimensionUnities, SpacingValues } from '@utilities/dimensions';
import { BOX_ALIAS_TOKENS_PREFIX } from '@utilities/tokens';

export type GridProps = {
    column?: number;
    spacingX?: SpacingValues;
    spacingY?: SpacingValues;
    children?: React.ReactNode;
    width?: `${number}${DimensionUnities}`;
    rowHeight?: `${number}${DimensionUnities}`;
    padding?: SpacingValues;
    margin?: SpacingValues;
    boxColorToken?: string;
    'data-test-id'?: string;
};

export const CONTAINER_TEST_ID = 'fondue-grid';

export const Grid = ({
    column = 2,
    spacingX = 4,
    spacingY = 4,
    children,
    'data-test-id': dataTestId = CONTAINER_TEST_ID,
    width = '100%',
    rowHeight,
    boxColorToken,
    margin = 0,
    padding = 0,
}: GridProps) => {
    const colorClasses = !boxColorToken ? '' : `tw-bg-${boxColorToken} tw-text-${boxColorToken}-inverse`;

    useEffect(() => {
        if (!boxColorToken) {
            return;
        }

        if (!BOX_ALIAS_TOKENS_PREFIX.includes(boxColorToken)) {
            throw new Error(
                `boxColorToken should be one of the following values \n${BOX_ALIAS_TOKENS_PREFIX.join('\n')}`,
            );
        }
    }, [boxColorToken]);

    const flexBasis = `${(1 / column) * 100}%`;

    const renderedChildren = React.Children.map(children, (child) => {
        return (
            <>
                <div data-test-id="fondue-grid-item" style={{ height: 'auto', flexBasis, display: 'inline-flex' }}>
                    {cloneElement(child as ReactElement, {
                        ['data-test-id']: 'fondue-grid-item-content',
                        style: {
                            height: rowHeight,
                            margin: `${spacingY / 2}px ${spacingX / 2}px `,
                        },
                    })}
                </div>
            </>
        );
    });

    return (
        <div
            data-test-id={dataTestId}
            className={colorClasses}
            style={{
                margin,
                padding,
                width,
            }}
        >
            <div data-test-id="fondue-grid-inner-wrapper" className="tw-w-full tw-h-full tw-inline-flex tw-flex-wrap">
                {children ? renderedChildren : <></>}
            </div>
        </div>
    );
};

Grid.displayName = 'FondueGrid';
