/* (c) Copyright Frontify Ltd., all rights reserved. */

import nookFaviconUrl from '../assets/images/nook.svg';

export const Head = () => {
    return (
        <>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href={nookFaviconUrl} />
            <title>Documentation — Fondue</title>
        </>
    );
};
