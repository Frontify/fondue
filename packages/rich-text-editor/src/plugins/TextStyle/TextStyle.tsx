/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    definePlugin,
    type HotkeyHandler,
    PARAGRAPH,
    type RteBlockCommand,
    type RtePlugin,
    type ToolbarItemProps,
} from '#/core';

import { HeadingLevelIcon } from './components/HeadingLevelIcon';
import { TextStyleSelect } from './components/TextStyleSelect';
import { textStyleContent, type TextStylePluginOptions } from './content';
import { ALL_TEXT_STYLES, isTextStyle, markdownRuleFor, presetsFor } from './helpers/presets';

const HEADING_LEVEL: Partial<Record<string, number>> = { h1: 1, h2: 2, h3: 3, h4: 4 };

/** Words the `/` menu also finds a heading by. */
const HEADING_KEYWORDS: Partial<Record<number, readonly string[]>> = {
    1: ['h1', 'title'],
    2: ['h2', 'subtitle'],
    3: ['h3'],
    4: ['h4'],
};

/**
 * Which styles an editor offers is a product decision — a comment box wants
 * none, a page editor wants all — so it is an option. `styles` is the dropdown,
 * in the order given, and it is also what pasted HTML may become: an editor
 * that does not offer `heading3` turns a pasted `h3` into a paragraph.
 *
 * Rendering is not restricted the same way, so a document written by a
 * differently configured editor still displays as it was authored.
 */
export const textStylePlugin = ({ styles: options = ALL_TEXT_STYLES }: TextStylePluginOptions = {}): RtePlugin => {
    const offered = presetsFor(options);

    // The shortcuts other editors use: `Mod-Alt-0` for a paragraph, `Mod-Alt-1`
    // to `Mod-Alt-4` for the headings — each only when this editor offers it.
    const hotkeys: Record<string, HotkeyHandler> = {};
    if (options.includes(PARAGRAPH)) {
        hotkeys['Mod-Alt-0'] = (api) => api.blocks.setType(PARAGRAPH);
    }
    for (const preset of offered) {
        const level = HEADING_LEVEL[preset.tag];
        if (level !== undefined) {
            hotkeys[`Mod-Alt-${level}`] = (api) => api.blocks.setType('textStyle', { style: preset.name });
        }
    }

    // The paragraph is the editor's own "Text" command, so only the presets are listed.
    const commands: RteBlockCommand[] = offered.map((preset) => {
        const level = HEADING_LEVEL[preset.tag];
        return {
            id: preset.tag === 'p' ? preset.name : `heading-${level}`,
            label: preset.label,
            icon: level === undefined ? undefined : <HeadingLevelIcon level={level} />,
            keywords: level === undefined ? [] : (HEADING_KEYWORDS[level] ?? []),
            group: 'turnInto',
            isActive: (selection) => isTextStyle(selection.block) && selection.block.style === preset.name,
            run: (api) => api.blocks.setType('textStyle', { style: preset.name }),
        };
    });

    // Made here, not at module level: the dropdown needs this editor's `styles`.
    const TextStyleToolbar = ({ api, selection }: ToolbarItemProps) => (
        <TextStyleSelect selection={selection} api={api} options={options} />
    );

    return definePlugin({
        id: 'text-style',
        content: textStyleContent({ styles: options }),
        toolbar: [{ render: TextStyleToolbar }],
        hotkeys,
        // `# ` through `#### `, for the headings this editor offers.
        inputRules: offered.flatMap(markdownRuleFor),
        commands,
    });
};
