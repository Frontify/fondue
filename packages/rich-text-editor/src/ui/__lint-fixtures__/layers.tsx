/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `ui` imports `model`, `runtime`, `bridge` and `locales`.
import '#/bridge/portals';
import '#/locales/en-US';
// expect-lint: eslint(no-restricted-imports)
import '#/definition/compiler';
// expect-lint: eslint(no-restricted-imports)
import '../../definition/compiler';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-model';

declare const t: (key: string) => string;

// SPEC-rich-text-react/AC-057: strings come from the locale.
export const Label = () => (
    // expect-lint: rte-style(no-jsx-string-literal)
    <p title={t('RichTextEditor_bold')}>Bold</p>
);
export const Translated = () => <p>{t('RichTextEditor_bold')}</p>;
export const Quoted = () => (
    // expect-lint: rte-style(no-jsx-string-literal)
    <p>{'Bold'}</p>
);
// expect-lint: rte-style(no-jsx-string-literal)
export const Named = () => <span aria-label="Bold" />;
