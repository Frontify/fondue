/* (c) Copyright Frontify Ltd., all rights reserved. */

// A feature story names each feature it installs with one tag (SPEC-rich-text/AC-053).
const FEATURE_TAG = 'feature:';

/** The feature IDs that a story's `feature:` tags name. */
export const featureTagsOf = (tags: readonly string[]): string[] =>
    tags.filter((tag) => tag.startsWith(FEATURE_TAG)).map((tag) => tag.slice(FEATURE_TAG.length));
