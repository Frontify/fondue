/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

import { type Diagnostic } from '#/model';
import { diagnostic } from '#/model/internal';
import { nameOf } from '#/runtime/port';

import { type RichTextProfile } from '../../types';
import { forgetProfile, loaded, loadProfile } from '../loadProfile';
import { type ShippedProfile } from '../parts';

/** What a profile's load has produced so far. */
export type ProfileState = {
    /** The profile's definition and presentation once its module has loaded; `undefined` while it loads or for none. */
    shipped: ShippedProfile | undefined;
    /** Whether the module failed to load, until `retry` loads it again. */
    failed: boolean;
    /** Forgets a failed load and loads the module again. */
    retry: () => void;
};

/** Loads the profile's module, reports a failed load once through `onDiagnostic` and loads again on `retry`. */
export const useProfile = (
    profile: RichTextProfile | undefined,
    onDiagnostic: ((diagnostic: Diagnostic) => void) | undefined,
): ProfileState => {
    const [loadedProfile, setLoadedProfile] = useState<{ profile: RichTextProfile; value: ShippedProfile }>();
    const [failedProfile, setFailedProfile] = useState<RichTextProfile>();
    const [attempt, setAttempt] = useState(0);
    const reportRef = useRef(onDiagnostic);
    reportRef.current = onDiagnostic;
    useEffect(() => {
        if (profile === undefined || loaded.has(profile)) {
            return undefined;
        }

        let live = true;
        loadProfile(profile)
            .then((value) => {
                if (live) {
                    setLoadedProfile({ profile, value });
                }

                return value;
            })
            .catch((error: unknown) => {
                if (live) {
                    setFailedProfile(profile);
                    reportRef.current?.(
                        diagnostic('react.profile-load-failed', undefined, { profile, name: nameOf(error) }, 'error'),
                    );
                }
            });

        return () => {
            live = false;
        };
    }, [profile, attempt]);
    const retry = () => {
        if (profile !== undefined) {
            forgetProfile(profile);
        }

        setFailedProfile(undefined);
        setAttempt((count) => count + 1);
    };

    if (profile === undefined) {
        return { shipped: undefined, failed: false, retry };
    }

    if (loadedProfile !== undefined && loadedProfile.profile === profile) {
        return { shipped: loadedProfile.value, failed: false, retry };
    }

    // A profile that an earlier editor loaded renders at once.
    const shipped = loaded.get(profile);

    return { shipped, failed: shipped === undefined && failedProfile === profile, retry };
};
