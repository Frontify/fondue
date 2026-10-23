/* (c) Copyright Frontify Ltd., all rights reserved. */

// Vite serves a `?no-inline` import as a URL of its own origin, even for a file under its inline size limit.
declare module '*?no-inline' {
    const url: string;
    export default url;
}
