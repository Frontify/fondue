/* (c) Copyright Frontify Ltd., all rights reserved. */

import { basicMarksMD, basicMarksTree } from './fixtures';
import { initPlateEditor } from '@components/RichTextEditor/utils';
import { serialize } from '../serialize';

describe('Markdown serializer', () => {
    const editor = initPlateEditor();

    it('should serialize basic marks', () => {
        const serialized = serialize(editor, basicMarksTree);
        expect(serialized).to.be.equal(basicMarksMD);
    });
});
