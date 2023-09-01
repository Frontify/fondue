/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';

export type HelperTextStyle = 'Danger' | 'Positive';

type HelperTextProps = { text: string; disabled: boolean; 'data-test-id': string; style?: HelperTextStyle };

export const HelperText = ({
    text,
    disabled,
    style,
    'data-test-id': dataTestId = 'fondue-number-input',
}: HelperTextProps): ReactElement => {
    let textColorClass;
    const dangerStyle: HelperTextStyle = 'Danger';
    const positiveStyle: HelperTextStyle = 'Positive';

    switch (true) {
        case disabled:
            textColorClass = 'tw-text-black-40';
            break;
        case style === dangerStyle:
            textColorClass = 'tw-text-red-60';
            break;
        case style === positiveStyle:
            textColorClass = 'tw-text-green-60';
            break;
        default:
            textColorClass = 'tw-text-black-80';
            break;
    }

    return (
        <span data-test-id={`${dataTestId}-helper-text`} className={`tw-text-s tw-font-sans ${textColorClass}`}>
            {text}
        </span>
    );
};

HelperText.displayName = 'FondueHelperText';
