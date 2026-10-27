/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TranslationStrings } from '#/model';

/**
 * Languages lowlight's `common` set registers, except `plaintext`, which a block stores as no `languageId`. A language
 * or product name stays literal; a descriptive label reads through a locale key.
 */
export const CODE_LANGUAGES: readonly (
    | { id: string; label: string }
    | { id: string; labelKey: keyof TranslationStrings }
)[] = [
    { id: 'arduino', label: 'Arduino' },
    { id: 'bash', label: 'Bash' },
    { id: 'c', label: 'C' },
    { id: 'cpp', label: 'C++' },
    { id: 'csharp', label: 'C#' },
    { id: 'css', label: 'CSS' },
    { id: 'diff', label: 'Diff' },
    { id: 'go', label: 'Go' },
    { id: 'graphql', label: 'GraphQL' },
    { id: 'ini', label: 'INI' },
    { id: 'java', label: 'Java' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'json', label: 'JSON' },
    { id: 'kotlin', label: 'Kotlin' },
    { id: 'less', label: 'Less' },
    { id: 'lua', label: 'Lua' },
    { id: 'makefile', label: 'Makefile' },
    { id: 'markdown', label: 'Markdown' },
    { id: 'objectivec', label: 'Objective-C' },
    { id: 'perl', label: 'Perl' },
    { id: 'php', label: 'PHP' },
    { id: 'php-template', labelKey: 'RichTextEditor_codeLanguagePhpTemplate' },
    { id: 'python', label: 'Python' },
    { id: 'python-repl', labelKey: 'RichTextEditor_codeLanguagePythonRepl' },
    { id: 'r', label: 'R' },
    { id: 'ruby', label: 'Ruby' },
    { id: 'rust', label: 'Rust' },
    { id: 'scss', label: 'SCSS' },
    { id: 'shell', labelKey: 'RichTextEditor_codeLanguageShell' },
    { id: 'sql', label: 'SQL' },
    { id: 'swift', label: 'Swift' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'vbnet', label: 'VB.NET' },
    { id: 'wasm', label: 'WebAssembly' },
    { id: 'xml', label: 'HTML, XML' },
    { id: 'yaml', label: 'YAML' },
];

/** The language menu's choices for a block of `languageId`: plain text, the listed languages, and a stored unlisted one. */
export const languageChoices = (
    languageId: string | null,
    t: (key: keyof TranslationStrings) => string,
): readonly { id: string | null; label: string }[] => {
    const choices: { id: string | null; label: string }[] = [{ id: null, label: t('RichTextEditor_codePlainText') }];
    for (const language of CODE_LANGUAGES) {
        if ('labelKey' in language) {
            choices.push({ id: language.id, label: t(language.labelKey) });
        } else {
            choices.push(language);
        }
    }

    // A stored language the menu does not list stays a choice, so the menu never hides the block's value.
    if (languageId !== null && !CODE_LANGUAGES.some(({ id }) => id === languageId)) {
        choices.push({ id: languageId, label: languageId });
    }

    return choices;
};
