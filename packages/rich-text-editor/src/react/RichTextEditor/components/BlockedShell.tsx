/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DecodeResult, type DiagnosticCode } from '#/model';
import { readerContext } from '#/reader/helpers/context';
import { ReaderWith } from '#/reader/ReaderWith/ReaderWith';

import { writeClipboard } from '../helpers/writeClipboard';
import { type ShellProps } from '../types';

import { CopyButton } from './CopyButton';

type Blocked = Extract<DecodeResult, { status: 'blocked' }>;

const ENVELOPE_CODES: ReadonlySet<DiagnosticCode> = new Set(['format.unknown-format-version', 'format.wrong-model']);

/** Why editing is unavailable: the format or model, a migration, unreadable input, or a limit. */
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
 * A document that decodes as `blocked`: the reader output and why it cannot be edited, with its original to copy and
 * no editable surface, so nothing can save an empty document over it.
 */
export const BlockedShell = ({
    result,
    model,
    readers,
    limits,
    presentation,
    locale,
    testId,
}: ShellProps & { result: Blocked }) => {
    const { t } = readerContext(locale, presentation);

    return (
        <div data-test-id={testId} data-rte-shell="blocked">
            <ReaderWith
                document={result.original}
                model={model}
                overrides={readers}
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

BlockedShell.displayName = 'BlockedShell';
