/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, createPlateEditor } from '@udecode/plate';
import { deserialize } from '../deserialize';
import { generateRandomId } from '@utilities/generateRandomId';
import { getEditorConfig } from '@components/RichTextEditor/utils/editorConfig';
import {
    basicMarksMD,
    basicMarksTree,
    blockQuoteMD,
    blockQuoteTree,
    codeBlockMD,
    codeBlockTree,
    headingsMD,
    headingsTree,
    hrMD,
    hrTree,
    imageMD,
    imageTree,
    linkMD,
    linkTree,
    orderedListMD,
    orderedListTree,
    paragraphMD,
    paragraphTree,
    unorderedListMD,
    unorderedListTree,
} from './fixtures';

export const initPlateEditor = (editorId: string = generateRandomId()): PlateEditor =>
    createPlateEditor({ id: editorId, plugins: getEditorConfig() });

describe('Markdown deserializer', () => {
    const editor = initPlateEditor();

    it('should deserializer basic marks', () => {
        const deserialized = deserialize(editor, basicMarksMD);
        expect(deserialized).to.deep.equal(basicMarksTree);
    });

    it('should deserializer headings', () => {
        const deserialized = deserialize(editor, headingsMD);
        expect(deserialized).to.deep.equal(headingsTree);
    });

    it('should deserializer code block', () => {
        const deserialized = deserialize(editor, codeBlockMD);
        expect(deserialized).to.deep.equal(codeBlockTree);
    });

    it('should deserializer paragraph', () => {
        const deserialized = deserialize(editor, paragraphMD);
        expect(deserialized).to.deep.equal(paragraphTree);
    });

    it('should deserializer unordered list', () => {
        const deserialized = deserialize(editor, unorderedListMD);
        expect(deserialized).to.deep.equal(unorderedListTree);
    });

    it('should deserializer ordered list', () => {
        const deserialized = deserialize(editor, orderedListMD);
        expect(deserialized).to.deep.equal(orderedListTree);
    });

    it('should deserializer hr', () => {
        const deserialized = deserialize(editor, hrMD);
        expect(deserialized).to.deep.equal(hrTree);
    });

    it('should deserializer link', () => {
        const deserialized = deserialize(editor, linkMD);
        expect(deserialized).to.deep.equal(linkTree);
    });

    it('should deserializer image', () => {
        const deserialized = deserialize(editor, imageMD);
        expect(deserialized).to.deep.equal(imageTree);
    });

    it('should deserializer block quote', () => {
        const deserialized = deserialize(editor, blockQuoteMD);
        expect(deserialized).to.deep.equal(blockQuoteTree);
    });
});
