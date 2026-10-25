/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';

import { createAnnouncer } from '#/bridge/announcer';
import { createReactWork } from '#/bridge/devChecks';
import { createMountCoordinator } from '#/bridge/mount';
import { createPortalStore } from '#/bridge/portals';
import { type RichTextDocument } from '#/model';
import { type LoadedDocument } from '#/persistence/types';

import { mountOf } from './helpers';
import { type Defined } from './types';

/** What one session creates once and keeps for its whole life, and the snapshot of a session that faulted. */
export const useMountState = (props: Defined, retried: LoadedDocument | undefined) => {
    // The record this session loads, which a later `defaultValue` never replaces.
    const [loaded] = useState(() => retried ?? props.defaultValue);
    const [mounted] = useState(() => mountOf(props, loaded));
    // The snapshot of a session that entered `faulted`, which the recovery shell shows.
    const [faulted, setFaulted] = useState<RichTextDocument>();
    const [coordinator] = useState(createMountCoordinator);
    // One portal store per mount, so no session shares chrome state with another.
    const [portals] = useState(createPortalStore);
    // A production build marks no React work, so `execute` never asks.
    const [work] = useState(() => {
        if (process.env.NODE_ENV === 'production') {
            return undefined;
        }
        return createReactWork();
    });
    const [announcer] = useState(createAnnouncer);
    useEffect(() => () => announcer.dispose(), [announcer]);
    return { loaded, mounted, faulted, setFaulted, coordinator, portals, work, announcer };
};
