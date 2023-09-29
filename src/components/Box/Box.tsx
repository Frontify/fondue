/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GetMarginClassNames, GetPaddingClassNames, SpacingValue } from '@utilities/dimensions';
import { merge } from '@utilities/index';
import { HTMLAttributes } from 'react';
import { ContainerHTMLElement } from 'src/types/elements';

export type BoxProps = {
    'data-test-id'?: string;
    padding?: SpacingValue;
    paddingX?: SpacingValue;
    paddingY?: SpacingValue;
    margin?: SpacingValue;
    marginX?: SpacingValue;
    marginY?: SpacingValue;
    as?: ContainerHTMLElement;
} & HTMLAttributes<HTMLDivElement | HTMLSpanElement>;

export const BOX_TEST_ID = 'fondue-box';

export const Box = ({
    padding,
    paddingX,
    paddingY,
    margin,
    marginX,
    marginY,
    children,
    'data-test-id': dataTestId = BOX_TEST_ID,
    as: ContainerElement = 'div',
    ...props
}: BoxProps) => {
    return (
        <ContainerElement
            {...props}
            className={merge([
                props.className,
                GetPaddingClassNames(padding, paddingX, paddingY),
                GetMarginClassNames(margin, marginX, marginY),
            ])}
            data-test-id={dataTestId}
        >
            {children}
        </ContainerElement>
    );
};
Box.displayName = 'FondueBox';
