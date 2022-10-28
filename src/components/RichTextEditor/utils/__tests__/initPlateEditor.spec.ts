/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InitPlateEditor } from '../';

describe('InitPlateEditor', () => {
    it('should create with random id', () => {
        const editor = InitPlateEditor.init().getInstance();

        expect(editor).to.not.be.null;
        expect(editor.id).to.be.string;
    });

    const id = 'i am id';
    it('should create editor with dedicated id', () => {
        const editor = InitPlateEditor.init(id).getInstance();

        expect(editor).to.not.be.null;
        expect(editor.id).equal(id);
    });

    it('should get same editor', () => {
        const editor = InitPlateEditor.getInstance();

        expect(editor).to.not.be.null;
        expect(editor.id).equal(id);
    });

    it('should get editor with new id', () => {
        const id = 'new id';
        const editor = InitPlateEditor.init(id).getInstance();

        expect(editor).to.not.be.null;
        expect(editor.id).equal(id);
    });
});
