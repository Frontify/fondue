/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';
import { useEffect, useRef } from 'react';

import type * as Codecs from '#/codecs/codecs';
import { type RichTextDocument } from '#/model';
import { readerContext } from '#/reader/helpers/context';
import { ReaderWith } from '#/reader/ReaderWith/ReaderWith';

import { writeClipboard } from '../helpers/writeClipboard';
import { type ShellProps } from '../types';

import { CopyButton } from './CopyButton';

/** Copies `document` as plain text and HTML from the codecs, which needs no `RecoveryService`. */
const copyContent = async ({ model, limits, locale }: ShellProps, document: RichTextDocument) => {
    let codecsModule: typeof Codecs;
    try {
        codecsModule = await import('#/codecs/codecs');
    } catch {
        // A chunk that fails to load is a failed copy, which the button names.
        return false;
    }

    const codecs = codecsModule.createCodecs(model, { limits });

    return writeClipboard(codecs.toPlainText(document).text, codecs.toHTML(document, { locale }).html);
};

export type RecoveryShellProps = ShellProps & { document: RichTextDocument; onRetry: () => void };

/**
 * The editor after a render error: the last published snapshot through the reader, never an empty editor, with Retry
 * to mount the editor again from it and Copy content.
 */
export const RecoveryShell = ({ document, onRetry, ...shell }: RecoveryShellProps) => {
    const { model, readers, limits, presentation, locale, testId } = shell;
    const { t } = readerContext(locale, presentation);
    const messageRef = useRef<HTMLParagraphElement>(null);

    // The shell replaces the root and its polite region, so focus carries the crash to a screen reader,
    // unless the author was elsewhere: only the removed surface leaves focus on the body.
    useEffect(() => {
        const message = messageRef.current;
        const { activeElement, body } = window.document;
        if (message !== null && (activeElement === null || activeElement === body)) {
            message.focus();
        }
    }, []);

    return (
        <div data-test-id={testId} data-rte-shell="recovery">
            <p ref={messageRef} tabIndex={-1}>
                {t('RichTextEditor_recoveryMessage')}
            </p>
            <ReaderWith
                document={document}
                model={model}
                overrides={readers}
                limits={limits}
                presentation={presentation}
                locale={locale}
            />
            <Button onPress={onRetry}>{t('RichTextEditor_retry')}</Button>
            <CopyButton copy={() => copyContent(shell, document)} failure={t('RichTextEditor_copyFailed')}>
                {t('RichTextEditor_copyContent')}
            </CopyButton>
        </div>
    );
};

RecoveryShell.displayName = 'RecoveryShell';
