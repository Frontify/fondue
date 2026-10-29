/* (c) Copyright Frontify Ltd., all rights reserved. */

/** A heading level, from 1 to 6. */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** What a host lets users do with a feature: create, edit, remove and paste it. */
export type FeaturePolicy = {
    /** Whether users may add the feature to the content. */
    create: boolean;
    /** Whether users may change the feature where it already is. */
    edit: boolean;
    /** Whether users may take the feature out of the content. */
    remove: boolean;
    /** Whether the feature survives a paste, as opposed to being dropped from the pasted content. */
    paste: boolean;
};

/** What a host lets users do in the editor: the policy per feature, the heading levels and the Enter behavior. */
export type AuthoringPolicy = {
    /** The policy of each feature, by feature id. */
    features: Readonly<Record<string, FeaturePolicy>>;
    /** The heading levels users may create. */
    creatableHeadingLevels: readonly HeadingLevel[];
    /** `paragraph` by default in Comment, Document and Brand document, where Comment may use `submit`; Inline defaults to `submit`, which acts as `none` while the host sets no `onSubmit`. */
    enterBehavior: 'paragraph' | 'submit' | 'none';
};
