/* (c) Copyright Frontify Ltd., all rights reserved. */

import { usePageContext } from 'vike-react/usePageContext';

export const Page = () => {
    const { abortReason, abortStatusCode, is404 } = usePageContext();

    let msg: string;

    if (typeof abortReason === 'string') {
        // Handle `throw render(abortStatusCode, `You cannot access ${someCustomMessage}`)`
        msg = abortReason;
    } else if (abortStatusCode === 403) {
        // Handle `throw render(403)`
        msg = "You cannot access this page because you don't have enough privileges.";
    } else if (abortStatusCode === 401) {
        // Handle `throw render(401)`
        msg = "You cannot access this page because you aren't logged in. Please log in.";
    } else {
        // Fallback error message
        msg = is404 ? "This page doesn't exist." : 'Something went wrong. Sincere apologies. Try again (later).';
    }

    return <p>{msg}</p>;
};
