/* (c) Copyright Frontify Ltd., all rights reserved. */

import { beforeMount } from '@playwright/experimental-ct-react/hooks';

beforeMount(({ App }) => Promise.resolve(<App />));
