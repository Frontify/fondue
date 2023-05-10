/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_LIC, ELEMENT_PARAGRAPH, createAlignPlugin } from '@udecode/plate';
import { ELEMENT_CHECK_ITEM } from '../CheckboxListPlugin';
import { Plugin } from '../Plugin';

export class AlignPlugin extends Plugin {
    plugins() {
        return [
            createAlignPlugin({
                inject: {
                    props: {
                        validTypes: [ELEMENT_PARAGRAPH, ELEMENT_LIC, ELEMENT_CHECK_ITEM],
                    },
                },
            }),
        ];
    }
}
