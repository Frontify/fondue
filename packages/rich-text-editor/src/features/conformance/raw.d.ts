/* (c) Copyright Frontify Ltd., all rights reserved. */

// Vite inlines a module imported with `?raw` as its text.
declare module '*.md?raw' {
    const text: string;
    export default text;
}
