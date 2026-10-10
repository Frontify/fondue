/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { createCodecs } from '#/codecs/codecs';
import {
    type ContentModel,
    type DecodeResult,
    type DiagnosticCode,
    type ResourceLimits,
    type RichTextDocument,
    type RichTextLocale,
} from '#/model';
import { readerContext } from '#/reader/context';
import { type ReaderPresentation, RichTextReader } from '#/reader/reader';

type Blocked = Extract<DecodeResult, { readonly status: 'blocked' }>;

/** What both shells read the document with, in place of the editor. */
interface ShellProps {
    readonly model: ContentModel;
    /** The definition's limits, which a host may have loosened. */
    readonly limits: ResourceLimits;
    readonly presentation: ReaderPresentation;
    readonly locale: RichTextLocale;
    readonly testId: string;
}

const ENVELOPE_CODES: ReadonlySet<DiagnosticCode> = new Set(['format.unknown-format-version', 'format.wrong-model']);

/** Why editing is unavailable: the format or model, a migration, unreadable input, or a limit (SPEC-rich-text-react/AC-087). */
const blockedKey = ({ reason, diagnostics }: Blocked) => {
    if (reason === 'invalid') {
        return 'RichTextEditor_blockedInvalid';
    }
    if (reason === 'limit-exceeded') {
        return 'RichTextEditor_blockedLimit';
    }
    // The envelope check blocks with one of these codes; a migration step may refuse with any code.
    if (diagnostics.some(({ code }) => ENVELOPE_CODES.has(code))) {
        return 'RichTextEditor_blockedVersion';
    }
    return 'RichTextEditor_blockedMigration';
};

const originalText = (original: unknown): string => {
    if (typeof original === 'string') {
        return original;
    }
    return JSON.stringify(original) ?? '';
};

/**
 * Writes `plain` and `html` as one clipboard item, or `plain` alone where the browser has no `ClipboardItem`;
 * `false` when nothing was copied, as on a page with no clipboard access.
 */
const writeClipboard = async (plain: string, html?: string): Promise<boolean> => {
    const clipboard = navigator.clipboard as Clipboard | undefined;
    if (clipboard === undefined) {
        return false;
    }
    try {
        if (html === undefined || typeof ClipboardItem !== 'function') {
            await clipboard.writeText(plain);
            return true;
        }
        const item = new ClipboardItem({
            'text/plain': new Blob([plain], { type: 'text/plain' }),
            'text/html': new Blob([html], { type: 'text/html' }),
        });
        await clipboard.write([item]);
        return true;
    } catch {
        return false;
    }
};

/** A copy action that names a failed copy instead of failing silently. */
const CopyButton = ({
    copy,
    failure,
    children,
}: {
    readonly copy: () => Promise<boolean>;
    readonly failure: string;
    readonly children: ReactNode;
}) => {
    const [failed, setFailed] = useState(false);
    return (
        <>
            <Button
                emphasis="default"
                onPress={async () => {
                    setFailed(!(await copy()));
                }}
            >
                {children}
            </Button>
            {failed && <p role="status">{failure}</p>}
        </>
    );
};

/**
 * A document that decodes as `blocked`: the reader output and why it cannot be edited, with its original to copy and
 * no editable surface, so nothing can save an empty document over it (SPEC-rich-text-format/AC-020).
 */
export const BlockedShell = ({
    result,
    model,
    limits,
    presentation,
    locale,
    testId,
}: ShellProps & { readonly result: Blocked }) => {
    const { t } = readerContext(locale, presentation);
    return (
        <div data-test-id={testId} data-rte-shell="blocked">
            <RichTextReader
                document={result.original}
                model={model}
                limits={limits}
                presentation={presentation}
                locale={locale}
            />
            <p>{t(blockedKey(result))}</p>
            <CopyButton
                copy={() => writeClipboard(originalText(result.original))}
                failure={t('RichTextEditor_copyFailed')}
            >
                {t('RichTextEditor_copyOriginal')}
            </CopyButton>
        </div>
    );
};

/** Copies `document` as plain text and HTML from the codecs, which needs no `RecoveryService` (SPEC-rich-text-react/AC-086). */
const copyContent = ({ model, limits, locale }: ShellProps, document: RichTextDocument) => {
    const codecs = createCodecs(model, { limits });
    return writeClipboard(codecs.toPlainText(document).text, codecs.toHTML(document, { locale }).html);
};

/**
 * The editor after a render error: the last published snapshot through the reader, never an empty editor, with Retry
 * to mount the editor again from it and Copy content (SPEC-rich-text-react/AC-022, AC-085).
 */
export const RecoveryShell = ({
    document,
    onRetry,
    ...shell
}: ShellProps & { readonly document: RichTextDocument; readonly onRetry: () => void }) => {
    const { model, limits, presentation, locale, testId } = shell;
    const { t } = readerContext(locale, presentation);
    const messageRef = useRef<HTMLParagraphElement>(null);
    // The shell replaces the root and its polite region, so focus carries the crash to a screen reader (SPEC-rich-text-accessibility/AC-038).
    useEffect(() => messageRef.current?.focus(), []);
    return (
        <div data-test-id={testId} data-rte-shell="recovery">
            <p ref={messageRef} tabIndex={-1}>
                {t('RichTextEditor_recoveryMessage')}
            </p>
            <RichTextReader
                document={document}
                model={model}
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
