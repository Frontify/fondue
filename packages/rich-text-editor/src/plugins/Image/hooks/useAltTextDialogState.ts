/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FormEvent, useCallback, useId, useRef, useState } from 'react';

import { useEditorDialog } from '#/bridge/pluginApi/define';
import { type EditorApi, useEditorApi } from '#/bridge/pluginApi/plugin';
import { REPLACED_ASSET } from '#/model';

export type Intent = 'meaningful' | 'decorative';

type Stored = {
    intent: Intent;
    text: string;
    /** The meaningful text of another image of the same asset, which the dialog offers and never fills in. */
    suggestion: string | undefined;
};

const textOf = (value: unknown): string => (typeof value === 'string' ? value : '');

/** What the image `nodeId` stores, read when the dialog opens. */
const storedOf = (api: EditorApi | undefined, nodeId: string): Stored => {
    const nodes = api?.content.read({ nodeId });
    const first = nodes?.[0];
    const attrs = first?.attrs;
    if (api === undefined || attrs === undefined) {
        return { intent: 'meaningful', text: '', suggestion: undefined };
    }

    const { assetId, altIntent, altText } = attrs;
    const other = api.blocks
        .list('asset_image')
        .find(
            ({ nodeId: candidateId, attrs: candidate }) =>
                candidateId !== nodeId &&
                typeof assetId === 'string' &&
                candidate.assetId === assetId &&
                candidate.altIntent === 'meaningful' &&
                textOf(candidate.altText).trim() !== '',
        );
    let suggestion: string | undefined;
    if (other !== undefined) {
        suggestion = textOf(other.attrs.altText);
    }

    // A decorative image opens as stored; any other opens with Meaningful, the first option, selected.
    let intent: Intent = 'meaningful';
    if (altIntent === 'decorative') {
        intent = 'decorative';
    }

    return { intent, text: textOf(altText), suggestion };
};

/** The state, effects and handlers of the alternative text dialog for the image `nodeId`. */
export const useAltTextDialogState = (nodeId: string, opener: Element | null, onClose: () => void) => {
    const api = useEditorApi();
    const [stored] = useState(() => storedOf(api, nodeId));
    const dialog = useEditorDialog(opener, onClose);
    const [intent, setIntent] = useState<Intent>(stored.intent);
    const [text, setText] = useState(stored.text);
    const [invalid, setInvalid] = useState(false);
    const fieldRef = useRef<HTMLInputElement>(null);
    // Focus inside the content before Radix autofocuses it keeps Fondue from moving it to the first control.
    const focusedRef = useRef(false);
    const focusChecked = useCallback((group: HTMLDivElement | null) => {
        if (group !== null && !focusedRef.current) {
            focusedRef.current = true;
            group.querySelector<HTMLElement>('[role="radio"][aria-checked="true"]')?.focus();
        }
    }, []);
    const legendId = useId();
    const radioId = useId();
    const fieldId = useId();
    const errorId = useId();
    const save = (event: FormEvent) => {
        event.preventDefault();
        if (intent === 'meaningful' && text.trim() === '') {
            setInvalid(true);
            fieldRef.current?.focus();

            return;
        }

        let altText = '';
        if (intent === 'meaningful') {
            altText = text;
        }

        api?.attributes.set('asset_image', { altIntent: intent, altText }, { nodeId });
        api?.nodeState.set(nodeId, REPLACED_ASSET, null);
        dialog.finish('opener');
    };

    const chooseIntent = (next: Intent) => {
        setIntent(next);
        setInvalid(false);
    };

    const changeText = (next: string) => {
        setText(next);
        setInvalid(false);
    };

    return {
        dialog,
        suggestion: stored.suggestion,
        intent,
        text,
        invalid,
        fieldRef,
        focusChecked,
        legendId,
        radioId,
        fieldId,
        errorId,
        save,
        chooseIntent,
        changeText,
    };
};

export type AltTextState = ReturnType<typeof useAltTextDialogState>;
