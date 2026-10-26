/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowSwap, IconPause, IconPlay } from '@frontify/fondue-icons';

import { NodeChromeButton, NodeChromeMenu, NodeChromeToolbar, OptionItem } from '#/bridge/define';
import { type EditorApi } from '#/bridge/plugin';
import { REPLACED_ASSET } from '#/model';

import { altTextStrings, SET_SIZE } from '../helpers/dialogStrings';
import { AltTextDialog, UploadControls } from '../helpers/lazyParts';
import { figureOf } from '../helpers/nodes';
import { alignOptions, EDIT_WIDTH, SIDE_KEYS, sizeOptions } from '../helpers/options';
import { type ImageChromeState } from '../hooks/useImageChromeState';

/**
 * Removes the figure that holds the image `nodeId`, as one undo step; an empty paragraph takes the place of a figure
 * that is the only block of its parent.
 */
const removeFigure = (api: EditorApi | undefined, nodeId: string) => {
    if (api === undefined) {
        return;
    }

    const figure = figureOf(api.document().content, nodeId);
    const attrs = figure?.attrs;
    const figureId = attrs?.nodeId;
    if (typeof figureId === 'string') {
        const removed = api.content.delete({ nodeId: figureId });
        // A write never leaves its parent without the content its type requires.
        if (removed.status === 'rejected' && removed.code === 'invalid') {
            api.content.replace({ nodeId: figureId }, [{ type: 'paragraph' }]);
        }
    }

    api.focus();
};

/** The size menu, whose Edit width choice opens the width dialog once the menu returned focus. */
const SizeMenu = ({ chrome }: { chrome: ImageChromeState }) => {
    const { t, sizeText, displayWidth, pendingRef, runOption, openWidth } = chrome;

    return (
        <NodeChromeMenu
            label={t('RichTextEditor_imageSize', { size: sizeText })}
            text={sizeText}
            command={SET_SIZE}
            onCloseAutoFocus={(event) => {
                if (pendingRef.current === undefined) {
                    return;
                }

                // The width dialog opens once the menu returned focus, so its field keeps it.
                pendingRef.current = undefined;
                event.preventDefault();
                openWidth();
            }}
        >
            {sizeOptions(t, displayWidth).map((option) => (
                <OptionItem
                    key={option.key}
                    checked={option.checked}
                    onSelect={() => {
                        if (option.command === EDIT_WIDTH) {
                            pendingRef.current = 'width';

                            return;
                        }

                        runOption(option);
                    }}
                >
                    {option.label}
                </OptionItem>
            ))}
        </NodeChromeMenu>
    );
};

const AlignMenu = ({ chrome }: { chrome: ImageChromeState }) => {
    const { t, side, runOption } = chrome;

    return (
        <NodeChromeMenu label={t('RichTextEditor_imageAlign', { side: t(SIDE_KEYS[side]) })} text={t(SIDE_KEYS[side])}>
            {alignOptions(t, side).map((option) => (
                <OptionItem key={option.key} checked={option.checked} onSelect={() => runOption(option)}>
                    {option.label}
                </OptionItem>
            ))}
        </NodeChromeMenu>
    );
};

/** The chrome's toolbar: upload controls, alternative text, size, alignment, Replace and Pause. */
export const ImageToolbar = ({ chrome, nodeId }: { chrome: ImageChromeState; nodeId: string }) => {
    const { api, t, execute, shown, unfinished, status, review, reviewId, paused, animated, altText, setPlayed } =
        chrome;

    return (
        <NodeChromeToolbar aria-label={t('RichTextEditor_image')}>
            {status !== undefined && (
                <UploadControls nodeId={nodeId} status={status} t={t} onRemove={() => removeFigure(api, nodeId)} />
            )}
            {unfinished && status === undefined && (
                <NodeChromeButton
                    label={t('RichTextEditor_imageChooseAgain')}
                    onClick={() => execute('image.replace', { nodeId })}
                />
            )}
            <NodeChromeButton
                label={altText}
                {...(review ? { describedBy: reviewId } : {})}
                onClick={() => api?.overlays.open(AltTextDialog, { nodeId, strings: altTextStrings(t) })}
            />
            {review && (
                <NodeChromeButton
                    label={t('RichTextEditor_imageAltKeep')}
                    onClick={() => api?.nodeState.set(nodeId, REPLACED_ASSET, null)}
                />
            )}
            <SizeMenu chrome={chrome} />
            <AlignMenu chrome={chrome} />
            {!unfinished && (
                <NodeChromeButton
                    label={t('RichTextEditor_imageReplace')}
                    icon={<IconArrowSwap size={16} aria-hidden />}
                    onClick={() => execute('image.replace', { nodeId })}
                />
            )}
            {animated && shown.kind === 'image' && (
                <NodeChromeButton
                    label={paused ? t('RichTextEditor_imagePlay') : t('RichTextEditor_imagePause')}
                    icon={paused ? <IconPlay size={16} aria-hidden /> : <IconPause size={16} aria-hidden />}
                    onClick={() => setPlayed({ src: shown.src, paused: !paused })}
                />
            )}
        </NodeChromeToolbar>
    );
};
