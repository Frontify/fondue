/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createListPlugin } from '@udecode/plate';
import { Plugin } from '../Plugin';

export class ListPlugin extends Plugin {
    plugins() {
        return [createListPlugin()];
    }
}
