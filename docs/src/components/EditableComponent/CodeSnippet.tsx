/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tag, Divider } from '@frontify/fondue-ui';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import { CopyCodeButton } from './CopyCodeButton';
import { editorTheme } from './editorTheme';

type EditableContentProps = {
    code: string;
    language?: string;
    disabled?: boolean;
};

const LANGUAGES_WITH_PREVIEW = ['tsx'];

export const CodeSnippet = ({ code, language, disabled }: EditableContentProps) => {
    const handleCopyCode = async (successCallback: () => void) => {
        try {
            await navigator.clipboard.writeText(code);
            successCallback();
        } catch (error) {
            throw new Error('Failed to copy code to clipboard');
        }
    };

    if (code === undefined || code === null || code === '') {
        return null;
    }

    return (
        <LiveProvider
            code={code.trim()}
            scope={{ Tag, Divider }}
            language={language}
            disabled={disabled}
            theme={editorTheme}
        >
            <div className="tw-border-black-60 tw-border-2 tw-rounded-lg tw-overflow-hidden tw-mt-4 tw-mb-8 tw-relative">
                {language && LANGUAGES_WITH_PREVIEW.includes(language) ? (
                    <>
                        <LivePreview className="tw-p-4" />
                        <LiveError className="tw-p-2 tw-text-red-90 tw-bg-red-40" />
                    </>
                ) : null}

                <CopyCodeButton onClick={handleCopyCode} />
                <LiveEditor />
            </div>
        </LiveProvider>
    );
};
