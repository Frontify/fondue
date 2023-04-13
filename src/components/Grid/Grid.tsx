/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, cloneElement } from 'react';
import { DimensionUnity, SpacingValue } from '@utilities/dimensions';
import { ContainerHTMLElement } from 'src/types/elements';
import { merge } from '@utilities/merge';
import { Box } from '../Box/Box';

export type GridProps = {
    column?: number;
    spacingX?: SpacingValue;
    spacingY?: SpacingValue;
    children?: React.ReactNode;
    width?: `${number}${DimensionUnity}`;
    rowHeight?: `${number}${DimensionUnity}`;
    padding?: SpacingValue;
    margin?: SpacingValue;
    bg?: string;
    color?: string;
    'data-test-id'?: string;
    as?: ContainerHTMLElement;
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
    bg,
    color,
    margin = 0,
    padding = 0,
    as: ContainerElement = 'div',
}: GridProps) => {
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
        <Box
            data-test-id={dataTestId}
            className={merge([bg, color])}
            style={{
                margin,
                padding,
                width,
            }}
            as={ContainerElement}
        >
            <div data-test-id="fondue-grid-inner-wrapper" className="tw-w-full tw-h-full tw-inline-flex tw-flex-wrap">
                {children ? renderedChildren : <></>}
            </div>
        </Box>
    );
};

Grid.displayName = 'FondueGrid';
