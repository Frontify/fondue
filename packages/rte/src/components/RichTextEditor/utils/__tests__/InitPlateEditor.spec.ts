/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InitPlateEditor } from '../InitPlateEditor';

describe('InitPlateEditor', () => {
    it('should create with random id', () => {
        const editor = InitPlateEditor.init().getInstance();

        expect(editor).to.not.equal(null);
        expect(editor.id).to.be.a('string');
    });

    const id = 'i am id';
    it('should create editor with dedicated id', () => {
        const editor = InitPlateEditor.init(id).getInstance();

        expect(editor).to.not.equal(null);
        expect(editor.id).to.equal(id);
    });

    it('should get same editor', () => {
        const editor = InitPlateEditor.getInstance();

        expect(editor).to.not.equal(null);
        expect(editor.id).to.equal(id);
    });

    it('should get editor with new id', () => {
        const id = 'new id';
        const editor = InitPlateEditor.init(id).getInstance();

        expect(editor).to.not.equal(null);
        expect(editor.id).to.equal(id);
    });
});
