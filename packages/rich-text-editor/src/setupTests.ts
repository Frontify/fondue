/* (c) Copyright Frontify Ltd., all rights reserved. */

/// <reference types="@testing-library/jest-dom/vitest" />
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// `@testing-library/jest-dom/vitest` would extend the `expect` of whichever `vitest` it resolves.
expect.extend(matchers);
