/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEvent, useRef } from 'react';

import { NodeChromeButton } from '#/bridge/pluginApi/define';
import { type UploadStatus, useClientLayoutEffect, useEditorApi } from '#/bridge/pluginApi/plugin';
import { type CodecContext } from '#/model';

import { isRunning } from '../helpers/isRunning';
import { surfaceFocused } from '../hooks/useUploadStatus';
import styles from '../styles/upload.module.scss';

const CANCEL = 'media.upload.cancel';
const RETRY = 'media.upload.retry';

/**
 * The upload's buttons in the image chrome toolbar: Cancel while it runs or waits, then Retry and Remove once it
 * failed or stopped. Cancel and Retry show where `media.upload` is installed. When the upload's change takes away
 * the button that has focus, the button that takes its place gets focus, or once the upload completes the image's
 * first button, else the surface.
 */
export const UploadControls = ({
    nodeId,
    status,
    t,
    onRemove,
}: {
    nodeId: string;
    status: UploadStatus;
    t: CodecContext['t'];
    onRemove: () => void;
}) => {
    const api = useEditorApi();
    // These keep their identity when a locale change gives a new API, which reruns no effect.
    const focus = api?.focus;
    const surface = api?.surface;
    const wrapperRef = useRef<HTMLSpanElement>(null);
    // Whether one of these buttons had focus last, which a button that left the DOM keeps.
    const focusedRef = useRef(false);
    const running = isRunning(status);
    useClientLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        if (!focusedRef.current || wrapper === null || wrapper.contains(wrapper.ownerDocument.activeElement)) {
            return;
        }

        const next = wrapper.querySelector<HTMLElement>('button');
        if (next === null) {
            focusedRef.current = false;
            focus?.();

            return;
        }

        next.focus();
    }, [running, focus]);
    useClientLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        let toolbar: HTMLElement | null = null;
        if (wrapper !== null) {
            toolbar = wrapper.closest<HTMLElement>('[data-rte-node-chrome]');
        }

        return () => {
            if (!focusedRef.current) {
                return;
            }

            focus?.();
            // A completed upload leaves the image and its toolbar, whose first button then takes focus; a removed
            // image takes its toolbar along, which leaves focus on the surface.
            queueMicrotask(() => {
                if (toolbar === null || !toolbar.isConnected || !surfaceFocused(surface)) {
                    return;
                }

                const next = toolbar.querySelector<HTMLElement>('button');
                if (next !== null && !wrapper?.contains(next)) {
                    next.focus();
                }
            });
        };
    }, [focus, surface]);
    const onBlur = (event: FocusEvent<HTMLSpanElement>) => {
        const { target } = event;
        // A button that leaves the DOM blurs too, which is no move of the author's.
        queueMicrotask(() => {
            if (target.isConnected && !wrapperRef.current?.contains(target.ownerDocument.activeElement)) {
                focusedRef.current = false;
            }
        });
    };

    const installed = (id: string) => api?.commands.query(id, { nodeId }).disabledReason !== 'unknown-command';
    let buttons;
    if (running) {
        buttons = installed(CANCEL) && (
            <NodeChromeButton
                label={t('RichTextEditor_uploadCancel')}
                onClick={() => {
                    // The slot and this button leave, so focus goes to the surface where the slot was.
                    focusedRef.current = false;
                    api?.commands.execute(CANCEL, { nodeId });
                    api?.focus();
                }}
            />
        );
    } else {
        buttons = (
            <>
                {installed(RETRY) && (
                    <NodeChromeButton
                        label={t('RichTextEditor_uploadRetry')}
                        onClick={() => api?.commands.execute(RETRY, { nodeId })}
                    />
                )}
                <NodeChromeButton label={t('RichTextEditor_uploadRemove')} onClick={onRemove} />
            </>
        );
    }

    return (
        <span
            ref={wrapperRef}
            className={styles.controls}
            onFocus={() => {
                focusedRef.current = true;
            }}
            onBlur={onBlur}
        >
            {buttons}
        </span>
    );
};
