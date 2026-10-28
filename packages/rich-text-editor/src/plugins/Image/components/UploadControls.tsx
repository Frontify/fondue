/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef } from 'react';

import { NodeChromeButton } from '#/bridge/pluginApi/define';
import { type UploadStatus, useEditorApi } from '#/bridge/pluginApi/plugin';
import { type CodecContext } from '#/model';

import { isRunning } from '../helpers/isRunning';
import { useUploadControlFocus } from '../hooks/useUploadControlFocus';
import styles from '../styles/upload.module.scss';

const CANCEL = 'media.upload.cancel';
const RETRY = 'media.upload.retry';

export type UploadControlsProps = {
    nodeId: string;
    status: UploadStatus;
    translate: CodecContext['translate'];
    onRemove: () => void;
};

/**
 * The upload's buttons in the image chrome toolbar: Cancel while it runs or waits, then Retry and Remove once it
 * failed or stopped. Cancel and Retry show where `media.upload` is installed. When the upload's change takes away
 * the button that has focus, the button that takes its place gets focus, or once the upload completes the image's
 * first button, else the surface.
 */
export const UploadControls = ({ nodeId, status, translate, onRemove }: UploadControlsProps) => {
    const api = useEditorApi();
    // These keep their identity when a locale change gives a new API, which reruns no effect.
    const focus = api?.focus;
    const surface = api?.surface;
    const wrapperRef = useRef<HTMLSpanElement>(null);
    // Whether one of these buttons had focus last, which a button that left the DOM keeps.
    const focusedRef = useRef(false);
    const running = isRunning(status);
    const onBlur = useUploadControlFocus(wrapperRef, focusedRef, running, focus, surface);
    const installed = (id: string) => api?.commands.query(id, { nodeId }).disabledReason !== 'unknown-command';
    let buttons;
    if (running) {
        buttons = installed(CANCEL) && (
            <NodeChromeButton
                label={translate('RichTextEditor_uploadCancel')}
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
                        label={translate('RichTextEditor_uploadRetry')}
                        onClick={() => api?.commands.execute(RETRY, { nodeId })}
                    />
                )}
                <NodeChromeButton label={translate('RichTextEditor_uploadRemove')} onClick={onRemove} />
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

UploadControls.displayName = 'UploadControls';
