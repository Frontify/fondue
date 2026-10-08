/* (c) Copyright Frontify Ltd., all rights reserved. */

import { addons } from 'storybook/manager-api';

// The status tags of `SPEC-rich-text/AC-094`: every story carries `inProgress` until the 1.0 release.
addons.setConfig({
    status: {
        statuses: {
            inProgress: {
                background: 'rgb(154, 126, 254)',
                color: '#ffffff',
                description: 'This story is in progress until the 1.0 release',
            },
            released: {
                background: 'rgb(50, 210, 182)',
                color: '#ffffff',
                description: 'This story is stable and released',
            },
        },
    },
});
