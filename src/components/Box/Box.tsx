/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { HTMLAttributes } from 'react';
import { ContainerHTMLElement } from 'src/types/elements';

export type BoxProps = {
    'data-test-id'?: string;
    as?: ContainerHTMLElement;
} & HTMLAttributes<HTMLDivElement>;

export const BOX_TEST_ID = 'fondue-box';

export const Box = ({
    children,
    'data-test-id': dataTestId = BOX_TEST_ID,
    as: ContainerElement = 'div',
    ...props
}: BoxProps) => {
    return (
        <ContainerElement data-test-id={dataTestId} {...props}>
            {children}
        </ContainerElement>
    );
};
Box.displayName = 'FondueBox';
