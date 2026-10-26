/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { type RichTextProfile } from '../../types';
import { loaded, loadProfile } from '../loadProfile';
import { type ShippedProfile } from '../parts';

/** The profile's definition and presentation once its module has loaded; `undefined` while it loads or for none. */
export const useProfile = (profile: RichTextProfile | undefined): ShippedProfile | undefined => {
    const [shipped, setShipped] = useState<{ profile: RichTextProfile; value: ShippedProfile }>();
    const [failure, setFailure] = useState<Error>();
    useEffect(() => {
        if (profile === undefined || loaded.has(profile)) {
            return undefined;
        }

        let live = true;
        loadProfile(profile)
            .then((value) => {
                if (live) {
                    setShipped({ profile, value });
                }

                return value;
            })
            .catch((error: unknown) => {
                if (live) {
                    setFailure(error instanceof Error ? error : new Error(String(error)));
                }
            });

        return () => {
            live = false;
        };
    }, [profile]);
    // A chunk that failed to load is a host error, which an error boundary around the editor shows.
    if (failure !== undefined) {
        throw failure;
    }

    if (profile === undefined) {
        return undefined;
    }

    if (shipped !== undefined && shipped.profile === profile) {
        return shipped.value;
    }

    // A profile that an earlier editor loaded renders at once.
    return loaded.get(profile);
};
