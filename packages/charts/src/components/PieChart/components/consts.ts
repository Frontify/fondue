/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BODY_FONT_FAMILY } from '@theme/consts';

export const FONT_SIZE = '--body-size-large';

export const LABEL_TITLE_STYLE = {
    fontSize: `var(${FONT_SIZE})`,
    fontWeight: 'var(--body-weight-x-strong-number)',
    fontFamily: `var(${BODY_FONT_FAMILY})`,
    fill: 'var(--fc-font-color-default)',
};

export const LABEL_VALUE_STYLE = {
    fontSize: `var(${FONT_SIZE})`,
    fontWeight: 'var(--body-weight-number)',
    fontFamily: `var(${BODY_FONT_FAMILY})`,
    fill: 'var(--fc-font-color-default)',
};

export const LABEL_PERCENTAGE_STYLE = {
    ...LABEL_VALUE_STYLE,
    fill: 'var(--fc-font-color-x-weak)',
};
export const LABEL_PADDING_X = 10;
