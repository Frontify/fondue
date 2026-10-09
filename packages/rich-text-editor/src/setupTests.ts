/* (c) Copyright Frontify Ltd., all rights reserved. */

/// <reference types="@testing-library/jest-dom/vitest" />
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, beforeAll, expect } from 'vitest';

// The `/vitest` entry extends whichever vitest copy it resolves, which differs from the runner's when the lockfile holds two peer variants.
expect.extend(matchers);

beforeAll(() => {
    configure({ testIdAttribute: 'data-test-id' });
});

afterEach(() => {
    cleanup();
});
