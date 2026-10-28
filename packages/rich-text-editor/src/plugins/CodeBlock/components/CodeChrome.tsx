/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconClipboard } from '@frontify/fondue-icons';
import { useRef } from 'react';

import {
    NodeChromeButton,
    NodeChromeMenu,
    NodeChromeToolbar,
    NodeChromeTurnInto,
    OptionItem,
    type NodeViewDeclaration,
    type TurnIntoCommands,
    useRichTextNodeView,
} from '#/bridge/pluginApi/define';

import { languageChoices } from '../helpers/languages';
import styles from '../styles/code.module.scss';

type CodeCommands = { 'code-block.language.set': { languageId: string | null } };

/** The language menu and Copy button of `code_block`. */
const CodeChrome = () => {
    const { attrs, contentId, context, execute } = useRichTextNodeView<CodeCommands>();
    const turnable = useRichTextNodeView<TurnIntoCommands>();
    const barRef = useRef<HTMLDivElement>(null);

    let languageId: string | null = null;
    if (typeof attrs.languageId === 'string') {
        languageId = attrs.languageId;
    }

    const options = languageChoices(languageId, context.translate);
    let current = '';
    const chosen = options.find(({ id }) => id === languageId);
    if (chosen !== undefined) {
        current = chosen.label;
    }

    // The chrome may render in an iframe, so the content element is read from the chrome's own document.
    const copy = () => {
        let text: string | null | undefined;
        if (contentId !== null) {
            text = barRef.current?.ownerDocument.getElementById(contentId)?.textContent;
        }

        navigator.clipboard.writeText(text ?? '').catch(() => undefined);
    };

    return (
        <div ref={barRef} className={styles.bar}>
            <NodeChromeToolbar aria-label={context.translate('RichTextEditor_codeBlock')}>
                <NodeChromeMenu
                    label={context.translate('RichTextEditor_codeLanguage', { language: current })}
                    text={current}
                >
                    {options.map((option) => (
                        <OptionItem
                            key={option.id ?? ''}
                            checked={option.id === languageId}
                            onSelect={() => execute('code-block.language.set', { languageId: option.id })}
                        >
                            {option.label}
                        </OptionItem>
                    ))}
                </NodeChromeMenu>
                <NodeChromeButton
                    label={context.translate('RichTextEditor_copyCode')}
                    icon={<IconClipboard size={16} aria-hidden />}
                    onClick={copy}
                />
                <NodeChromeTurnInto current={context.translate('RichTextEditor_codeBlock')} node={turnable} />
            </NodeChromeToolbar>
        </div>
    );
};

/** The chrome of `code_block`, which `defineEditor` attaches through the shipped views. */
export const codeBlockView: NodeViewDeclaration = {
    node: 'code_block',
    component: CodeChrome,
    contentAttributes: { spellcheck: 'false', autocorrect: 'off', autocapitalize: 'off' },
};
