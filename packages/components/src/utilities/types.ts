/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AriaAttributes } from 'react';

export type AtLeastOneAttr<T> = Partial<T> &
    {
        [K in keyof T]-?: Required<Pick<T, K>>;
    }[keyof T];

export type AriaLabelAttrs = Pick<AriaAttributes, 'aria-label'> & Pick<AriaAttributes, 'aria-labelledby'>;

export type AtLeastOneAriaLabelAttr = AtLeastOneAttr<AriaLabelAttrs>;

export type CommonAriaAttrs = Pick<AriaAttributes, 'aria-describedby'> & AtLeastOneAriaLabelAttr;
