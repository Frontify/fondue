/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';

import { createCodecs } from '#/codecs/codecs';
import {
    type ContentModel,
    type DecodeResult,
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

/** Why editing is unavailable: the format or model, a migration, unreadable input, or a limit (SPEC-rich-text-react/AC-087). */
const blockedKey = ({ reason, diagnostics }: Blocked) => {
    if (reason === 'invalid') {
        return 'RichTextEditor_blockedInvalid';
    }
    if (reason === 'limit-exceeded') {
        return 'RichTextEditor_blockedLimit';
    }
    if (diagnostics.some(({ code }) => code.startsWith('migration.'))) {
        return 'RichTextEditor_blockedMigration';
    }
    return 'RichTextEditor_blockedVersion';
};

const originalText = (original: unknown): string => {
    if (typeof original === 'string') {
        return original;
    }
    return JSON.stringify(original) ?? '';
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
            <Button
                emphasis="default"
                onPress={async () => {
                    await navigator.clipboard.writeText(originalText(result.original));
                }}
            >
                {t('RichTextEditor_copyOriginal')}
            </Button>
        </div>
    );
};

/** Copies `document` as plain text and HTML from the codecs, which needs no `RecoveryService` (SPEC-rich-text-react/AC-086). */
const copyContent = async ({ model, limits, locale }: ShellProps, document: RichTextDocument) => {
    const codecs = createCodecs(model, { limits });
    const item = new ClipboardItem({
        'text/plain': new Blob([codecs.toPlainText(document).text], { type: 'text/plain' }),
        'text/html': new Blob([codecs.toHTML(document, { locale }).html], { type: 'text/html' }),
    });
    await navigator.clipboard.write([item]);
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
    return (
        <div data-test-id={testId} data-rte-shell="recovery">
            <p role="alert">{t('RichTextEditor_recoveryMessage')}</p>
            <RichTextReader
                document={document}
                model={model}
                limits={limits}
                presentation={presentation}
                locale={locale}
            />
            <Button onPress={onRetry}>{t('RichTextEditor_retry')}</Button>
            <Button emphasis="default" onPress={() => copyContent(shell, document)}>
                {t('RichTextEditor_copyContent')}
            </Button>
        </div>
    );
};
