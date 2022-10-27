/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, createPlateEditor } from '@udecode/plate';
import { generateRandomId } from '@utilities/generateRandomId';
import { getEditorConfig } from '@components/RichTextEditor/utils/editorConfig';

export const initPlateEditor = (editorId: string = generateRandomId()): PlateEditor =>
    createPlateEditor({ id: editorId, plugins: getEditorConfig() });
