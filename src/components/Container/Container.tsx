/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Box } from '@components/Box';
import { DimensionUnity, GetMarginClassNames, GetPaddingClassNames, SpacingValue } from '@utilities/dimensions';
import { merge } from '@utilities/merge';
import { ReactNode } from 'react';
import { ContainerHTMLElement } from 'src/types/elements';

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
    marginX = 0,
    marginY = 0,
    padding = 0,
    paddingX = 0,
    paddingY = 0,
    as: ContainerElement = 'div',
}: ContainerProps) => {
    return (
        <Box
            data-test-id={dataTestId}
            className={merge([
                GetPaddingClassNames(padding, paddingX, paddingY),
                GetMarginClassNames(margin, marginX, marginY),
                bg,
                color,
            ])}
            style={{
                maxWidth,
                minWidth,
                maxHeight,
                minHeight,
            }}
            as={ContainerElement}
        >
            {children}
        </Box>
    );
};
Container.displayName = 'FondueContainer';
