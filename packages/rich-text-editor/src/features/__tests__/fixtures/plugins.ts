/* (c) Copyright Frontify Ltd., all rights reserved. */

import { spotlightEditor } from './spotlight/editor';

/** The editor parts that only tests install, as a host passes its own to `defineEditor`. */
export const FIXTURE_PLUGINS = [spotlightEditor] as const;
