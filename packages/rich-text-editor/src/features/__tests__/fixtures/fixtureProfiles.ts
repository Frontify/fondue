/* (c) Copyright Frontify Ltd., all rights reserved. */

import { core } from '#/features/core/feature';
import { links } from '#/features/links/feature';
import { type Feature } from '#/model';

import { fixtureBold, fixtureColor, fixtureHeading, fixtureHistory, fixtureItalic } from './features';

// Apart from `profiles.ts` so a plain Node worker can load it without the Vite-only feature registry.
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
        links(),
        fixtureColor(),
        fixtureHeading({ defaultLevel: 3 }),
    ],
});
