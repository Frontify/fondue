/* (c) Copyright Frontify Ltd., all rights reserved. */

export type AtLeastOneAttr<T> = Partial<T> &
    {
        [K in keyof T]-?: Required<Pick<T, K>>;
    }[keyof T];

export type AriaLabelAttrs = {
    'aria-label': string;
    'aria-labelledby': string;
};

export type AtLeastOneAriaLabelAttr = AtLeastOneAttr<AriaLabelAttrs>;

export type CommonAriaAttrs = {
    'aria-describedby'?: string;
} & AtLeastOneAriaLabelAttr;
