/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useState } from 'react';

export const useCopy = (resetAfterMS = 2000) => {
    const [status, setStatus] = useState<'success' | 'error' | 'idle'>('idle');

    const copy = useCallback(async (text: string) => {
        setStatus('idle');
        try {
            await navigator.clipboard.writeText(text);
            setStatus('success');
        } catch {
            setStatus('error');
        }
    }, []);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if (resetAfterMS && (status === 'success' || status === 'error')) {
            timeout = setTimeout(() => setStatus('idle'), resetAfterMS);
        }
        return () => {
            if (resetAfterMS && (status === 'success' || status === 'error')) {
                clearTimeout(timeout);
            }
        };
    }, [status, resetAfterMS]);

    return { copy, status };
};
