/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { IconClipboard } from '@frontify/fondue-icons';
import { useRef } from 'react';

import { NodeChromeMenu } from '#/bridge/chrome-toolbar';
import { NodeChromeButton, NodeChromeToolbar, type NodeViewDeclaration, useRichTextNodeView } from '#/bridge/define';

import { CODE_LANGUAGES } from './languages';
import styles from './styles/code.module.scss';

type CodeCommands = { readonly 'code-block.language.set': { readonly languageId: string | null } };

/** The language menu and Copy button of `code_block`. */
const CodeChrome = () => {
    const { attrs, contentId, context, execute } = useRichTextNodeView<CodeCommands>();
    const barRef = useRef<HTMLDivElement>(null);
    let languageId: string | null = null;
    if (typeof attrs.languageId === 'string') {
        languageId = attrs.languageId;
    }
    const options = [{ id: null, label: context.t('RichTextEditor_codePlainText') }, ...CODE_LANGUAGES];
    // A stored language the menu does not list stays an option, so the menu never hides the block's value.
    if (languageId !== null && !CODE_LANGUAGES.some(({ id }) => id === languageId)) {
        options.push({ id: languageId, label: languageId });
    }
    const current = options.find(({ id }) => id === languageId)?.label ?? '';
    // The chrome may render in an iframe, so the content element is read from the chrome's own document.
    const copy = () => {
        const content = contentId === null ? null : barRef.current?.ownerDocument.getElementById(contentId);
        navigator.clipboard.writeText(content?.textContent ?? '').catch(() => undefined);
    };
    return (
        <div ref={barRef} className={styles.bar}>
            <NodeChromeToolbar aria-label={context.t('RichTextEditor_codeBlock')}>
                <NodeChromeMenu label={context.t('RichTextEditor_codeLanguage', { language: current })} text={current}>
                    {options.map((option) => (
                        <Dropdown.Item
                            key={option.id ?? ''}
                            // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
                            {...{ role: 'menuitemradio', 'aria-checked': option.id === languageId }}
                            onSelect={() => execute('code-block.language.set', { languageId: option.id })}
                        >
                            {option.label}
                        </Dropdown.Item>
                    ))}
                </NodeChromeMenu>
                <NodeChromeButton
                    label={context.t('RichTextEditor_copyCode')}
                    icon={<IconClipboard size={16} aria-hidden />}
                    onClick={copy}
                />
            </NodeChromeToolbar>
        </div>
    );
};

/** The chrome of `code_block`, which `defineEditor` attaches through the shipped views. */
export const codeBlockView: NodeViewDeclaration = { node: 'code_block', component: CodeChrome };
