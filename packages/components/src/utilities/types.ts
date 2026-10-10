/* (c) Copyright Frontify Ltd., all rights reserved. */

export type AtLeastOneAttr<T> = Partial<T> &
    {
        [K in keyof T]-?: Required<Pick<T, K>>;
    }[keyof T];

// The ARIA attributes are declared here instead of picked from React's `AriaAttributes`:
// the component manifest only documents props declared in this package, so picked props
// would be missing from the generated component metadata.
export type AriaLabelAttrs = {
    /**
     * Accessible label of the element, used when no visible label is connected via `aria-labelledby`
     */
    'aria-label'?: string;
    /**
     * Id of the element that labels this element, e.g. the `id` of a visible `Label`
     */
    'aria-labelledby'?: string;
};

type AriaDescribedByAttr = {
    /**
     * Id of the element that describes this element, e.g. a help or error text
     */
    'aria-describedby'?: string;
};

export type AtLeastOneAriaLabelAttr = AtLeastOneAttr<AriaLabelAttrs>;

export type CommonAriaAttrs = AriaDescribedByAttr & AtLeastOneAriaLabelAttr;

export type OptionalCommonAriaAttrs = AriaDescribedByAttr & AriaLabelAttrs;
