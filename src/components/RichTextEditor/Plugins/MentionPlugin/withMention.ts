/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    ELEMENT_MENTION_INPUT,
    MentionPlugin,
    PlateEditor,
    TMentionInputElement,
    TNode,
    TOperation,
    TText,
    Value,
    WithPlatePlugin,
    comboboxActions,
    findMentionInput,
    getEditorString,
    getNodeString,
    getPlugin,
    getPointBefore,
    getRange,
    isNodeMentionInput,
    isSelectionInMentionInput,
    removeMentionInput,
    setSelection,
} from '@udecode/plate';
import { Path, Range } from 'slate';

export const withMention = <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(
    editor: E,
    { options: { id, trigger, query, inputCreation } }: WithPlatePlugin<MentionPlugin, V, E>,
) => {
    const { type } = getPlugin<object, V>(editor, ELEMENT_MENTION_INPUT);

    const { apply, insertBreak, insertText, deleteBackward, insertFragment, insertTextData, insertNode } = editor;

    const stripNewLineAndTrim: (text: string) => string = (text) => {
        return text
            .split(/\r\n|\r|\n/)
            .map((line) => line.trim())
            .join('');
    };

    editor.insertFragment = (fragment) => {
        const inMentionInput = findMentionInput(editor) !== undefined;
        if (!inMentionInput) {
            return insertFragment(fragment);
        }

        return insertText(fragment.map((node) => stripNewLineAndTrim(getNodeString(node))).join(''));
    };

    editor.insertTextData = (data) => {
        const inMentionInput = findMentionInput(editor) !== undefined;
        if (!inMentionInput) {
            return insertTextData(data);
        }

        const text = data.getData('text/plain');
        if (!text) {
            return false;
        }

        editor.insertText(stripNewLineAndTrim(text));

        return true;
    };

    editor.deleteBackward = (unit) => {
        const currentMentionInput = findMentionInput(editor);
        if (currentMentionInput && getNodeString(currentMentionInput[0]) === '') {
            return removeMentionInput(editor, currentMentionInput[1]);
        }

        deleteBackward(unit);
    };

    editor.insertBreak = () => {
        if (isSelectionInMentionInput(editor)) {
            return;
        }

        insertBreak();
    };

    editor.insertText = (text) => {
        if (
            !editor.selection ||
            text !== trigger ||
            (query && !query<V, E>(editor)) ||
            isSelectionInMentionInput(editor)
        ) {
            return insertText(text);
        }

        // Make sure a mention input is created at the beginning of line or after a whitespace
        const previousChar = getEditorString(
            editor,
            getRange(editor, editor.selection, getPointBefore(editor, editor.selection)),
        );

        const beginningOfLine = previousChar === '';
        const precededByWhitespace = previousChar === ' ';

        if ((beginningOfLine || precededByWhitespace) && text === trigger) {
            const data: TMentionInputElement = {
                type,
                children: [{ text: '' }],
                trigger,
            };
            if (inputCreation) {
                data[inputCreation.key] = inputCreation.value;
            }
            return insertNode(data);
        }

        return insertText(text);
    };

    const hasInputTrigger = (operation: TOperation, trigger?: string) =>
        (operation.node as TMentionInputElement)?.trigger === trigger;
    const isInputNodeMention = (operation: TOperation) => isNodeMentionInput(editor, operation.node as TNode);
    const hasMentionNodeBeenRemoved = (operation: TOperation, trigger?: string) =>
        isInputNodeMention(operation) && !hasInputTrigger(operation, trigger);
    const getPreviousMentionInputPath = (operation: TOperation): Path | undefined =>
        Range.isRange(operation.properties) ? findMentionInput(editor, { at: operation.properties })?.[1] : undefined;
    const getCurrentMentionInputPath = (operation: TOperation) =>
        Range.isRange(operation.newProperties)
            ? findMentionInput(editor, { at: operation.newProperties })?.[1]
            : undefined;

    const isInsertNode = (operation: TOperation) =>
        !isInputNodeMention(operation) &&
        !hasInputTrigger(operation, trigger) &&
        !(
            inputCreation === undefined ||
            (operation.node as TMentionInputElement)[inputCreation.key] === inputCreation.value
        );

    editor.apply = (operation) => {
        apply(operation);

        switch (operation.type) {
            case 'insert_text':
            case 'remove_text':
                const currentMentionInput = findMentionInput(editor);
                if (currentMentionInput) {
                    comboboxActions.text(getNodeString(currentMentionInput[0]));
                }
                break;

            case 'set_selection':
                const previousMentionInputPath = getPreviousMentionInputPath(operation);
                const currentMentionInputPath = getCurrentMentionInputPath(operation);

                if (previousMentionInputPath && !currentMentionInputPath) {
                    removeMentionInput(editor, previousMentionInputPath);
                }

                if (currentMentionInputPath) {
                    comboboxActions.targetRange(editor.selection);
                }
                break;

            case 'insert_node':
                if (!isInsertNode(operation)) {
                    break;
                }

                const text = ((operation.node as TMentionInputElement).children as TText[])[0]?.text ?? '';

                // Needed for undo - after an undo a mention insert we only receive
                // an insert_node with the mention input, i.e. nothing indicating that it
                // was an undo.
                setSelection(editor, {
                    anchor: { path: operation.path.concat([0]), offset: text.length },
                    focus: { path: operation.path.concat([0]), offset: text.length },
                });

                comboboxActions.open({
                    activeId: id,
                    text,
                    targetRange: editor.selection,
                });
                break;
            case 'remove_node':
                if (!hasMentionNodeBeenRemoved(operation, trigger)) {
                    comboboxActions.reset();
                }
                break;
        }
    };

    return editor;
};
