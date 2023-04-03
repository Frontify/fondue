/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DimensionUnities,
    MARGIN_VALUES_MAP,
    PADDING_VALUES_MAP,
    SPACING_VALUES,
    SpacingValues,
} from '@utilities/dimensions';
import { merge } from '@utilities/merge';
import { BOX_ALIAS_TOKENS_PREFIX } from '@utilities/tokens';
import React, { useEffect } from 'react';

export type ContainerProps = {
    children?: React.ReactNode;
    minWidth?: `${number}${DimensionUnities}`;
    maxWidth?: `${number}${DimensionUnities}`;
    minHeight?: `${number}${DimensionUnities}`;
    maxHeight?: `${number}${DimensionUnities}`;
    padding?: SpacingValues;
    margin?: SpacingValues;
    boxColorToken?: string;
    'data-test-id'?: string;
};

export const CONTAINER_TEST_ID = 'fondue-container';

export const Container = ({
    children,
    'data-test-id': dataTestId = CONTAINER_TEST_ID,
    minWidth,
    maxWidth,
    maxHeight,
    minHeight,
    boxColorToken,
    margin = 0,
    padding = 0,
}: ContainerProps) => {
    const paddingClassName = SPACING_VALUES.includes(padding) ? PADDING_VALUES_MAP[padding] : PADDING_VALUES_MAP[0];
    const marginClassName = SPACING_VALUES.includes(padding) ? MARGIN_VALUES_MAP[margin] : MARGIN_VALUES_MAP[0];

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

    return (
        <div
            data-test-id={dataTestId}
            className={merge([paddingClassName, marginClassName, colorClasses])}
            style={{
                maxWidth,
                minWidth,
                maxHeight,
                minHeight,
            }}
        >
            {children}
        </div>
    );
};
Container.displayName = 'FondueContainer';
