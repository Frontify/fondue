/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-051, SPEC-rich-text-quality/AC-002: `environment.ts` is where `RuntimeEnvironment` reads time, so it may use time globals but not the network.
// expect-lint: eslint(no-restricted-globals)
export const request = fetch;
export const now = () => Date.now();
export const later = () => setTimeout(() => undefined, 0);
