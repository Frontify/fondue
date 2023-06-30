/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ELEMENT_PARAGRAPH, Value, deserializeHtml, normalizeEditor } from '@udecode/plate';
import { PluginComposer } from '../Plugins';
import { InitPlateEditor } from './InitPlateEditor';

const wrapChildrenWithoutTypeInParagraph = (children: Value): Value =>
    children[0].hasOwnProperty('type')
        ? children
        : (children = [
              {
                  type: 'p',
                  children,
              },
          ]);

export const EMPTY_RICH_TEXT_VALUE: Value = [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }];

type ParseRawValueOptions = {
    editorId?: string;
    raw?: string;
    plugins?: PluginComposer;
};

export const parseRawValue = ({ editorId = 'parseRawValue', raw, plugins }: ParseRawValueOptions): Value => {
    const editor = InitPlateEditor.init(`${editorId}_parseRawValue`, plugins).getInstance();
    let parsedValue = EMPTY_RICH_TEXT_VALUE;

    if (!raw) {
        return parsedValue;
    }

    try {
        parsedValue = JSON.parse(raw);
    } catch {
        const trimmedText = raw.trim().replaceAll(/>\s+</g, '><');
        const parsedHtml = deserializeHtml(editor, {
            element: trimmedText,
        }) as Value;
        parsedValue = wrapChildrenWithoutTypeInParagraph(parsedHtml);
    }

    editor.children = parsedValue;
    normalizeEditor(editor, { force: true });

    return editor.children;
};
