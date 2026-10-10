/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dialog } from '@frontify/fondue-components';
import { useId, useState } from 'react';

import {
    defineNodeView,
    NodeChromeButton,
    NodeChromeToolbar,
    OverlayBody,
    useEditorOverlay,
    useRichTextNodeView,
} from '#/bridge/define';

import { fixtureMediaImage } from './feature';

const textOf = (value: unknown): string => {
    if (typeof value === 'string') {
        return value;
    }
    return '';
};

/** The alternative text dialog stand-in: a modal Fondue `Dialog` named by its heading, with one short description. */
const AltTextDialog = ({
    open,
    onOpenChange,
}: {
    readonly open: boolean;
    readonly onOpenChange: (open: boolean) => void;
}) => {
    const { attrs, context, update } = useRichTextNodeView();
    const overlay = useEditorOverlay(open, onOpenChange);
    const fieldId = useId();
    const [alt, setAlt] = useState(() => textOf(attrs.alt));
    const { t } = context;
    return (
        // A modal dialog holds focus, so every close request it makes is the author's.
        <Dialog.Root modal open={open} onOpenChange={onOpenChange}>
            <Dialog.Content container={overlay.container} minWidth="280px" minHeight="0">
                <Dialog.Header>
                    <Dialog.Title>{t('RichTextEditor_fixtureAltText')}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <OverlayBody>
                        <Dialog.Description>{t('RichTextEditor_fixtureAltTextHint')}</Dialog.Description>
                        <label htmlFor={fieldId}>{t('RichTextEditor_fixtureDescription')}</label>
                        <input id={fieldId} value={alt} onChange={(event) => setAlt(event.currentTarget.value)} />
                    </OverlayBody>
                </Dialog.Body>
                <Dialog.Footer>
                    <button
                        type="button"
                        onClick={() => {
                            update({ alt });
                            onOpenChange(false);
                        }}
                    >
                        {t('RichTextEditor_fixtureSave')}
                    </button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    );
};

/** An image's node chrome: one button that opens the alternative text dialog (SPEC-rich-text-react, Overlay focus). */
const ImageChrome = () => {
    const { context } = useRichTextNodeView();
    const [open, setOpen] = useState(false);
    const label = context.t('RichTextEditor_fixtureAltText');
    return (
        <>
            <NodeChromeToolbar aria-label={context.t('RichTextEditor_fixtureImage')}>
                <NodeChromeButton label={label} onClick={() => setOpen(true)} />
            </NodeChromeToolbar>
            <AltTextDialog open={open} onOpenChange={setOpen} />
        </>
    );
};

/** The image stand-in with its node chrome and alternative text dialog. */
export const fixtureMediaImageView = () =>
    defineNodeView(fixtureMediaImage(), { node: 'media_image', component: ImageChrome });
