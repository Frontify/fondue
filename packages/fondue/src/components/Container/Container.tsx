/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { Box } from '@components/Box';
import { type DimensionUnity, type SpacingValue } from '@utilities/dimensions';
import { merge } from '@utilities/merge';

import { type ContainerHTMLElement } from '../../types/elements';

export type ContainerProps = {
    children?: ReactNode | ReactNode[];
    minWidth?: `${number}${DimensionUnity}`;
    maxWidth?: `${number}${DimensionUnity}`;
    minHeight?: `${number}${DimensionUnity}`;
    maxHeight?: `${number}${DimensionUnity}`;
    padding?: SpacingValue;
    paddingX?: SpacingValue;
    paddingY?: SpacingValue;
    margin?: SpacingValue;
    marginX?: SpacingValue;
    marginY?: SpacingValue;
    bg?: string;
    color?: string;
    'data-test-id'?: string;
    as?: ContainerHTMLElement;
};

export const CONTAINER_TEST_ID = 'fondue-container';

/**
 * @deprecated Use `Box` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#layout-components the migration guide}.
 */
export const Container = ({
    children,
    'data-test-id': dataTestId = CONTAINER_TEST_ID,
    minWidth,
    maxWidth,
    maxHeight,
    minHeight,
    bg,
    color,
    margin,
    marginX,
    marginY,
    padding,
    paddingX,
    paddingY,
    as: ContainerElement = 'div',
}: ContainerProps) => {
    return (
        <Box
            data-test-id={dataTestId}
            className={merge([bg, color])}
            style={{
                maxWidth,
                minWidth,
                maxHeight,
                minHeight,
            }}
            margin={margin}
            marginX={marginX}
            marginY={marginY}
            padding={padding}
            paddingX={paddingX}
            paddingY={paddingY}
            as={ContainerElement}
        >
            {children}
        </Box>
    );
};
Container.displayName = 'FondueContainer';
