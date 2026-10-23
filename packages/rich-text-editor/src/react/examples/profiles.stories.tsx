/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';

import { RichTextEditor, type RichTextProfile } from '#/index';

import { AREAS, INPUT_RULE_ROWS, SHORTCUT_ROWS, SURFACE_KEY_ROWS } from './keyboard';
import { PROFILE_MODELS, recordOf, text } from './records';

const shown = (text: string) => {
    if (text === '') {
        return 'none';
    }
    return text;
};

/** The profile's shortcuts by area, its surface keys and its input rules, on Apple and other platforms. */
const KeyboardReference = ({ profile }: { readonly profile: RichTextProfile }) => {
    const shortcuts = SHORTCUT_ROWS.filter(({ profiles }) => profiles.includes(profile));
    return (
        <section aria-label="Keyboard reference">
            <h2>Keyboard shortcuts</h2>
            {AREAS.filter((area) => shortcuts.some((entry) => entry.area === area)).map((area) => (
                <table key={area}>
                    <caption>{area}</caption>
                    <thead>
                        <tr>
                            <th scope="col">Action</th>
                            <th scope="col">Command</th>
                            <th scope="col">Apple</th>
                            <th scope="col">Other platforms</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shortcuts
                            .filter((entry) => entry.area === area)
                            .map(({ action, command, key, apple, other }) => (
                                <tr key={`${command} ${key}`}>
                                    <td>{action}</td>
                                    <td>
                                        <code>{command}</code>
                                    </td>
                                    <td>{shown(apple)}</td>
                                    <td>{shown(other)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            ))}
            <table>
                <caption>Surface keys</caption>
                <thead>
                    <tr>
                        <th scope="col">Action</th>
                        <th scope="col">Apple</th>
                        <th scope="col">Other platforms</th>
                    </tr>
                </thead>
                <tbody>
                    {SURFACE_KEY_ROWS.filter(({ profiles }) => profiles.includes(profile)).map(
                        ({ action, key, apple, other }) => (
                            <tr key={`${action} ${key}`}>
                                <td>{action}</td>
                                <td>{shown(apple)}</td>
                                <td>{shown(other)}</td>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>
            <table>
                <caption>Input rules</caption>
                <thead>
                    <tr>
                        <th scope="col">Rule</th>
                        <th scope="col">Type</th>
                        <th scope="col">Result</th>
                    </tr>
                </thead>
                <tbody>
                    {INPUT_RULE_ROWS.filter(({ profiles }) => profiles.includes(profile)).map(
                        ({ id, trigger, result }) => (
                            <tr key={id}>
                                <td>
                                    <code>{id}</code>
                                </td>
                                <td>{trigger}</td>
                                <td>{result}</td>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>
        </section>
    );
};

const meta: Meta<typeof RichTextEditor> = {
    title: 'Rich Text Editor/Profiles',
    component: RichTextEditor,
    tags: ['autodocs', 'documents-behavior'],
    parameters: {
        docs: {
            description: {
                component: `
A shipped profile is a definition and a default toolbar that \`profile\` loads on first use: \`inline\`, \`comment\`, \`document\` (the default) or \`brand-document\`. Each story below is one profile, with the keyboard reference of its compiled keymap: every shortcut grouped by area on Apple and other platforms, the keys the surface handles itself, and each input rule it installs.

A key runs only where the profile's authoring policy allows the change, so in a profile that lets no author create a feature, such as alignment outside Brand document, its key changes only content that already has it.

In Comment, Mod+Enter submits, so no shortcut binds it; Shift+Enter breaks the line until the policy's \`enterBehavior\` is \`submit\`, when it runs as Enter. A form that submits a comment is the [submit example](?path=/story/rich-text-editor-examples--submit-snapshot).
`,
            },
        },
    },
    render: (args) => (
        <div style={{ display: 'grid', gap: '1rem' }}>
            <RichTextEditor {...args} />
            <KeyboardReference profile={args.profile ?? 'document'} />
        </div>
    ),
    argTypes: { defaultValue: { control: false }, profile: { control: false } },
};
export default meta;

type Story = StoryObj<typeof RichTextEditor>;

/** A row of a keyboard reference table: its cells in order, as the story shows them. */
type Cells = readonly string[];

// The profile loads on first use, so the reference and the surface wait for it.
const LOAD = { timeout: 10_000 };

// The Apple column is `none` where a binding applies only on the other platforms.
const HISTORY_ROWS: readonly Cells[] = [
    ['Undo', 'history.undo', '⌘Z', 'Ctrl+Z'],
    ['Redo', 'history.redo', '⇧⌘Z', 'Ctrl+Shift+Z'],
    ['Redo', 'history.redo', 'none', 'Ctrl+Y'],
    ['Bold', 'mark.bold.toggle', '⌘B', 'Ctrl+B'],
];
const INLINE_TABLES = ['History', 'Text formatting', 'Links', 'Blocks', 'Alignment', 'Surface keys', 'Input rules'];
const MULTILINE_TABLES = [
    'History',
    'Text formatting',
    'Links',
    'Blocks',
    'Alignment',
    'Lists',
    'Code blocks',
    'Surface keys',
    'Input rules',
];

/** The editor named `surface` is editable, and the reference holds the `tables` and each of the `rows`, but none of the `absent` commands. */
const documents =
    (
        surface: string,
        tables: readonly string[],
        rows: readonly Cells[],
        absent: readonly string[] = [],
    ): NonNullable<Story['play']> =>
    async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const reference = await canvas.findByRole('region', { name: 'Keyboard reference' }, LOAD);
        const editor = await canvas.findByRole('textbox', { name: surface }, LOAD);
        await waitFor(() => expect(editor).toHaveAttribute('contenteditable', 'true'), LOAD);
        await expect([...reference.querySelectorAll('caption')].map(({ textContent }) => textContent)).toEqual(tables);
        for (const cells of rows) {
            // The first and last cell tell apart the rows that share a command, such as the two Redo keys.
            const matching = within(reference)
                .getAllByRole('row')
                .filter(
                    ({ textContent }) =>
                        textContent?.includes(cells[0] ?? '') === true &&
                        textContent.includes(cells.at(-1) ?? '') === true,
                );
            await expect(matching).toHaveLength(1);
            await expect(
                within(matching[0] as HTMLElement)
                    .getAllByRole('cell')
                    .map(({ textContent }) => textContent),
            ).toEqual([...cells]);
        }
        for (const command of absent) {
            // The whole cell, since `list.task.toggle` holds `task.toggle`.
            await expect(
                within(reference)
                    .queryAllByRole('cell')
                    .filter(({ textContent }) => textContent === command),
            ).toHaveLength(0);
        }
    };

/** One line that submits with Enter: marks and links, no blocks. */
export const Inline: Story = {
    args: {
        profile: 'inline',
        'aria-label': 'Title',
        defaultValue: recordOf(
            PROFILE_MODELS.inline,
            'story-profile-inline',
            text('A single line with bold, italic and links.'),
        ),
    },
    play: documents(
        'Title',
        INLINE_TABLES,
        [...HISTORY_ROWS, ['Submit, when the host sets onSubmit', 'Enter', 'Enter']],
        ['mark.strike.toggle', 'list.bullet.toggle'],
    ),
};

/** A comment: lists, quotes, code, mentions and emoji, submitted with Mod+Enter. */
export const Comment: Story = {
    args: {
        profile: 'comment',
        'aria-label': 'Comment',
        defaultValue: recordOf(
            PROFILE_MODELS.comment,
            'story-profile-comment',
            text('A comment with lists, quotes, code, mentions and emoji.'),
        ),
    },
    play: documents(
        'Comment',
        MULTILINE_TABLES,
        [
            ...HISTORY_ROWS,
            ['Strikethrough', 'mark.strike.toggle', '⇧⌘X', 'Ctrl+Shift+X'],
            ['Submit, when the host sets onSubmit', '⌘Enter', 'Ctrl+Enter'],
        ],
        ['task.toggle', 'heading.set'],
    ),
};

/** A document: headings, images, dividers, the outline and the accessibility checks. */
export const Document: Story = {
    args: {
        profile: 'document',
        'aria-label': 'Document',
        defaultValue: recordOf(
            PROFILE_MODELS.document,
            'story-profile-document',
            text('A document with headings, images, dividers and the outline.'),
        ),
    },
    play: documents('Document', MULTILINE_TABLES, [
        ...HISTORY_ROWS,
        ['Check or uncheck a task', 'task.toggle', '⌘Enter', 'Ctrl+Enter'],
        ['Leave a code block for a new paragraph after it', '⌘Enter', 'Ctrl+Enter'],
    ]),
};

/** A brand document: the Document features with brand styles and columns. */
export const BrandDocument: Story = {
    args: {
        profile: 'brand-document',
        'aria-label': 'Brand document',
        defaultValue: recordOf(
            PROFILE_MODELS['brand-document'],
            'story-profile-brand-document',
            text('A brand document with brand styles and columns.'),
        ),
    },
    play: documents('Brand document', MULTILINE_TABLES, [
        ...HISTORY_ROWS,
        ['Column break, while the presentation has columns', 'column.break.insert', '⇧⌘Enter', 'Ctrl+Shift+Enter'],
    ]),
};
