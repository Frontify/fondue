/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DimensionUnity,
    MARGIN_VALUES_MAP,
    PADDING_VALUES_MAP,
    SPACING_VALUES,
    SpacingValue,
} from '@utilities/dimensions';
import { merge } from '@utilities/merge';
import React, { ReactNode } from 'react';
import { ContainerHTMLElement } from 'src/types/elements';

export type ContainerProps = {
    children?: ReactNode | ReactNode[];
    minWidth?: `${number}${DimensionUnity}`;
    maxWidth?: `${number}${DimensionUnity}`;
    minHeight?: `${number}${DimensionUnity}`;
    maxHeight?: `${number}${DimensionUnity}`;
    padding?: SpacingValue;
    margin?: SpacingValue;
    bg?: string;
    color?: string;
    'data-test-id'?: string;
    as?: ContainerHTMLElement;
};

export const CONTAINER_TEST_ID = 'fondue-container';

export const Container = ({
    children,
    'data-test-id': dataTestId = CONTAINER_TEST_ID,
    minWidth,
    maxWidth,
    maxHeight,
    minHeight,
    bg,
    color,
    margin = 0,
    padding = 0,
    as: ContainerElement = 'div',
}: ContainerProps) => {
    const paddingClassName = SPACING_VALUES.includes(padding) ? PADDING_VALUES_MAP[padding] : PADDING_VALUES_MAP[0];
    const marginClassName = SPACING_VALUES.includes(padding) ? MARGIN_VALUES_MAP[margin] : MARGIN_VALUES_MAP[0];

    return (
        <ContainerElement
            data-test-id={dataTestId}
            className={merge([paddingClassName, marginClassName, bg, color])}
            style={{
                maxWidth,
                minWidth,
                maxHeight,
                minHeight,
            }}
        >
            {children}
        </ContainerElement>
    );
};
Container.displayName = 'FondueContainer';
