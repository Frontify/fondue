import React from 'react';
import { EditableInputHelper } from '@components/EditableInput/lib/helper';
import { IconPen } from '@foundation/Icon';

describe('Test Children Nesting', () => {
    it('Output correct Text insdie div', () => {
        const TEXT = 'Hallo Frontify';
        const HTML_INPUT = <div>{TEXT}</div>;

        const TextToTest = EditableInputHelper.getLabel(HTML_INPUT);
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

        const TextToTest = EditableInputHelper.getLabel(HTML_INPUT);
        assert.equal(TextToTest, TEXT, 'To be equal');
    });
});
