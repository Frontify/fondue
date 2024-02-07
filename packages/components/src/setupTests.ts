/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@testing-library/jest-dom/vitest';

import { afterEach, beforeAll } from 'vitest';
import { cleanup, configure } from '@testing-library/react';

beforeAll(() => {
    configure({ testIdAttribute: 'data-test-id' });
});

afterEach(() => {
    cleanup();
});
