/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';

import { type EditorApi, type UploadStatus } from '#/bridge/pluginApi/plugin';
import { altOf, type CodecContext, type JsonObject, unavailableOf } from '#/model';

import { uploadStatusText } from './useUploadStatus';

/**
 * What a screen reader hears as the image becomes node-selected, since an image with an empty `alt` says nothing:
 * for a slot, its upload as it stands, with how to fix a failed one.
 */
const spokenOf = (attrs: JsonObject, context: CodecContext, unavailable: boolean, upload: UploadStatus | undefined) => {
    const { translate } = context;
    if (attrs.assetId === null) {
        if (upload !== undefined) {
            // The live region writes a value between U+2068 and U+2069 into a `bdi` of its own.
            const name = `\u2068${upload.name}\u2069`;

            return translate('RichTextEditor_announceBoth', {
                first: name,
                second: uploadStatusText(upload, translate),
            });
        }

        return translate('RichTextEditor_imageUnfinished');
    }

    if (unavailable) {
        const { message, label } = unavailableOf(attrs, context);
        if (label === '') {
            return message;
        }

        return `${message} ${label}`;
    }

    const alt = altOf(attrs);
    if (alt === undefined) {
        return translate('RichTextEditor_imageSelectedMissing');
    }

    if (alt === '') {
        return translate('RichTextEditor_imageSelectedDecorative');
    }

    return translate('RichTextEditor_imageSelected', { description: alt });
};

/** Speaks a selected image as it becomes selected, and again when what it says changes. */
const useSelectionAnnouncement = (
    selected: boolean,
    spoken: string,
    heard: string,
    slot: boolean,
    announce: EditorApi['announce'] | undefined,
) => {
    const heardRef = useRef<{ heard: string; slot: boolean } | undefined>(undefined);
    // A selected image is spoken as it becomes selected, and again when what it says changes, as when it fails to
    // load; a slot that fills is not, since the upload's completion speaks for it.
    useEffect(() => {
        if (!selected) {
            heardRef.current = undefined;

            return;
        }

        const before = heardRef.current;
        heardRef.current = { heard, slot };
        if (before !== undefined && (before.heard === heard || (before.slot && !slot))) {
            return;
        }

        announce?.(spoken);
    }, [selected, spoken, heard, slot, announce]);
};

/** Speaks the image when it becomes selected, and again when what it says changes. */
export const useSpokenImage = (
    attrs: JsonObject,
    context: CodecContext,
    unavailable: boolean,
    upload: UploadStatus | undefined,
    slot: boolean,
    selected: boolean,
    announce: EditorApi['announce'] | undefined,
) => {
    const spoken = spokenOf(attrs, context, unavailable, slot ? upload : undefined);
    // A slot's progress is shown, not spoken: only whether it runs, failed or stopped counts as a change.
    let heard = spoken;
    if (slot && upload !== undefined) {
        heard = 'running';
        if (upload.state === 'failed' || upload.state === 'stopped') {
            heard = upload.state;
        }
    }

    useSelectionAnnouncement(selected, spoken, heard, slot, announce);
};
