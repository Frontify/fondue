/* (c) Copyright Frontify Ltd., all rights reserved. */

declare module '*.mdx' {
    let MDXComponent: (props: Record<string, unknown>) => JSX.Element;
    export default MDXComponent;
}
