/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { expect, it } from 'vitest';

it('compiles with noUncheckedIndexedAccess and exactOptionalPropertyTypes on', () => {
    const values = ['a'];
    // @ts-expect-error Fails typecheck when its flag is off.
    const length = values[0].length;
    expect(length).toBe(1);

    type Named = { name?: string };
    const named: Named = {};
    // @ts-expect-error Fails typecheck when its flag is off.
    named.name = undefined;
    expect(named.name).toBeUndefined();
});
