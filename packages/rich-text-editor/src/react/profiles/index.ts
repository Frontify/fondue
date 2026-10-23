/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState, useSyncExternalStore } from 'react';

import { type RichTextProfile } from '../types';

import { type ShippedProfile } from './parts';

// One `import()` per profile, so a host's initial chunk holds no profile's features.
const LOADERS: Readonly<Record<RichTextProfile, () => Promise<{ readonly shipped: () => ShippedProfile }>>> = {
    inline: () => import('./inline'),
    comment: () => import('./comment'),
    document: () => import('./document'),
    'brand-document': () => import('./brand-document'),
};

const loaded = new Map<RichTextProfile, ShippedProfile>();
const loading = new Map<RichTextProfile, Promise<ShippedProfile>>();

/** Loads a shipped profile once per page, compiling its definition on first use. */
export const loadProfile = (profile: RichTextProfile): Promise<ShippedProfile> => {
    const pending = loading.get(profile);
    if (pending !== undefined) {
        return pending;
    }
    if (!Object.hasOwn(LOADERS, profile)) {
        return Promise.reject(new Error(`RichTextEditor has no profile named ${String(profile)}.`));
    }
    const started = LOADERS[profile]()
        .then(({ shipped }) => {
            const value = shipped();
            loaded.set(profile, value);
            return value;
        })
        .catch((error: unknown) => {
            // A failed chunk is not kept, so a later editor loads it again once the network is back.
            loading.delete(profile);
            throw error;
        });
    loading.set(profile, started);
    return started;
};

/** The profile's definition and presentation once its module has loaded; `undefined` while it loads or for none. */
export const useProfile = (profile: RichTextProfile | undefined): ShippedProfile | undefined => {
    const [shipped, setShipped] = useState<{ readonly profile: RichTextProfile; readonly value: ShippedProfile }>();
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

const COARSE_POINTER = '(pointer: coarse)';

const subscribePointer = (onChange: () => void) => {
    const query = globalThis.matchMedia?.(COARSE_POINTER);
    // Some test DOMs stub `matchMedia` with a bare `{ matches }`.
    if (typeof query?.addEventListener !== 'function') {
        return () => undefined;
    }
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
};

/** Whether the primary pointer is coarse, as on a touch device; `false` on the server and in the hydrating render. */
export const useCoarsePointer = (): boolean =>
    useSyncExternalStore(
        subscribePointer,
        () => globalThis.matchMedia?.(COARSE_POINTER).matches === true,
        () => false,
    );
