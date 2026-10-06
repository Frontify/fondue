/* (c) Copyright Frontify Ltd., all rights reserved. */

import { core } from '#/features/core/feature';
import { type Feature } from '#/model';

import { fixtureBold, fixtureColor, fixtureHeading, fixtureHistory, fixtureItalic, fixtureLink } from './features';

/**
 * Stand-ins for the shipped profile lists until the profiles ship: the features delivered so far, and the
 * same with the fixture stand-ins of later features.
 */
export const fixtureProfiles = (): Readonly<Record<string, readonly Feature[]>> => ({
    core: [core()],
    document: [
        core(),
        fixtureHistory(),
        fixtureBold(),
        fixtureItalic(),
        fixtureLink(),
        fixtureColor(),
        fixtureHeading({ defaultLevel: 3 }),
    ],
});
