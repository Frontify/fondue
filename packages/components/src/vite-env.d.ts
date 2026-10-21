/* (c) Copyright Frontify Ltd., all rights reserved. */

/// <reference types="vite/client" />

declare module '@frontify/fondue-tokens/styles';

declare module '*.mdx' {
    let MDXComponent: (props: Record<string, unknown>) => JSX.Element;
    export default MDXComponent;
}
