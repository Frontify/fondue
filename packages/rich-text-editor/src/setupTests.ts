/* (c) Copyright Frontify Ltd., all rights reserved. */

/// <reference types="@testing-library/jest-dom/vitest" />
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, beforeAll, expect } from 'vitest';

import { loadParts } from '#/bridge/session/helpers/lazyPart';

// `@testing-library/jest-dom/vitest` would extend the `expect` of whichever `vitest` it resolves.
expect.extend(matchers);
// The editor marks test nodes with `data-test-id`, which the queries read.
configure({ testIdAttribute: 'data-test-id' });

// A spec opens a dialog the moment it mounts, so the parts that load on first use are already loaded, as after idle.
beforeAll(loadParts);

afterEach(() => {
    cleanup();
});
