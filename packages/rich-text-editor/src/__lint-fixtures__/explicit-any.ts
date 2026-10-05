/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-083: the shared config lowers `no-explicit-any` to `warn` for TypeScript; this package keeps it an `error`.
// expect-lint: typescript(no-explicit-any)
export const anything: any = 1;
