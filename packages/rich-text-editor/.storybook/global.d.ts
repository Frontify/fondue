/* (c) Copyright Frontify Ltd., all rights reserved. */

declare module '*.mdx' {
    const MDXComponent: (props: Record<string, unknown>) => JSX.Element;
    export default MDXComponent;
}
