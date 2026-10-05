/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-051: the network ban covers `src` outside `src/testing`, so its test files may use `fetch`.
export const request = () => fetch('/');
