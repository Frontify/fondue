/* (c) Copyright Frontify Ltd., all rights reserved. */

// Vite bundles the stylesheets that modules import for their side effect.
declare module '*.css';

// Chrome CSS Modules map each local class to its scoped name (SPEC-rich-text-react/AC-050).
declare module '*.module.scss' {
    const classes: Readonly<Record<string, string>>;
    export default classes;
}
