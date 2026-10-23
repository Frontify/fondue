/* (c) Copyright Frontify Ltd., all rights reserved. */

import { core } from '#/features/core/feature';
import { type Feature } from '#/model';

/** Stand-ins for the shipped profile lists until the profiles ship: the core profile only. */
export const fixtureProfiles = (): Readonly<Record<string, readonly Feature[]>> => ({
    core: [core()],
});
