/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { EditableTextHelper } from '@components/EditableText/lib/helper';
import { IconPen } from '@foundation/Icon/Generated';

describe('Test Children Nesting', () => {
    it('Output correct Text insdie div', () => {
        const TEXT = 'Hallo Frontify';
        const HTML_INPUT = <div>{TEXT}</div>;

        const TextToTest = EditableTextHelper.getLabel(HTML_INPUT);
        assert.equal(TextToTest, TEXT, 'To be equal');
    });

    it('Output correct Text with nested html and Icons', () => {
        const TEXT = 'Hallo Frontify';
        const HTML_INPUT = (
            <div>
                <div>
                    <h1>{TEXT}</h1>
                </div>
                <IconPen />
            </div>
        );

        const TextToTest = EditableTextHelper.getLabel(HTML_INPUT);
        assert.equal(TextToTest, TEXT, 'To be equal');
    });
});
