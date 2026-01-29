/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentFileBuilderResponse } from '../../types';

export const Setup = (): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

.root {
    display: block;

    // Example variant using data attributes
    // &[data-variant='primary'] {
    //     color: var(--color-primary-default);
    // }
    //
    // &[data-size='large'] {
    //     font-size: var(--typography-font-size-large);
    // }
}
`,
    extension: `.module.scss`,
    subdirectory: 'styles',
});
