/* (c) Copyright Frontify Ltd., all rights reserved. */

import { initPlateEditor } from '../';

describe('initPlateEditor()', () => {
    it('should create with random id', () => {
        const editor = initPlateEditor();

        expect(editor).to.not.be.null;
        expect(editor.id).to.be.string;
    });

    it('should create editor with dedicated id', () => {
        const id = 'i am id';
        const editor = initPlateEditor(id);

        expect(editor).to.not.be.null;
        expect(editor.id).equal(id);
    });
});
