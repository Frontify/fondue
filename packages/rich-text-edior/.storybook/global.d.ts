/* (c) Copyright Frontify Ltd., all rights reserved. */

declare module '*.mdx' {
    let MDXComponent: (props: any) => JSX.Element;
    export default MDXComponent;
}

// Stylesheets of the libraries the preview brings in itself. The package's own
// styles are SCSS modules and need no declaration — `vite/client` types those.
declare module '@frontify/fondue-components/styles';
declare module '@frontify/fondue-tokens/styles';
