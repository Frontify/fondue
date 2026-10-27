/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextProfile } from '../types';

import { type ShippedProfile } from './parts';

// One `import()` per profile, so a host's initial chunk holds no profile's features.
const LOADERS: Readonly<Record<RichTextProfile, () => Promise<{ shipped: () => ShippedProfile }>>> = {
    inline: () => import('./inline'),
    comment: () => import('./comment'),
    document: () => import('./document'),
    'brand-document': () => import('./brandDocument'),
};

export const loaded = new Map<RichTextProfile, ShippedProfile>();
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

/** Drops a profile's loading entry, so the next load imports it again. */
export const forgetProfile = (profile: RichTextProfile) => {
    loading.delete(profile);
};
