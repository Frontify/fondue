// @vitest-environment node
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { beforeAll, describe, expect, it } from 'vitest';

import { parseStories } from '../parseStories';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TMP_DIR = join(tmpdir(), 'manifest-test-parseStories');

beforeAll(() => {
    mkdirSync(TMP_DIR, { recursive: true });
});

function writeTempStory(name: string, content: string): string {
    const filePath = join(TMP_DIR, `${name}.stories.tsx`);
    writeFileSync(filePath, content, 'utf-8');
    return filePath;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('parseStories', () => {
    describe('edge cases', () => {
        it('returns empty result for an empty file list', () => {
            expect(parseStories([])).toEqual({ examples: [], status: '' });
        });

        it('skips non-existent file paths', () => {
            expect(parseStories(['/does/not/exist.stories.tsx'])).toEqual({ examples: [], status: '' });
        });
    });

    describe('meta parsing', () => {
        it('extracts status from meta parameters.status.type', () => {
            const file = writeTempStory(
                'meta-status',
                `
                const meta = {
                    component: Button,
                    parameters: { status: { type: 'released' } },
                };
                export default meta;
            `,
            );
            const { status } = parseStories([file]);
            expect(status).toBe('released');
        });

        it('returns empty string when meta has no parameters', () => {
            const file = writeTempStory(
                'meta-no-params',
                `
                const meta = { component: Button };
                export default meta;
            `,
            );
            const { status } = parseStories([file]);
            expect(status).toBe('');
        });
    });

    describe('canonical flag', () => {
        it('marks story as canonical when parameters.manifest.canonical is true', () => {
            const file = writeTempStory(
                'canonical-true',
                `
                const meta = { component: Button };
                export default meta;
                export const Default = {
                    parameters: { manifest: { canonical: true } },
                    render: () => <Button />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].isCanonical).toBe(true);
        });

        it('does not mark story as canonical when the flag is absent', () => {
            const file = writeTempStory(
                'canonical-absent',
                `
                const meta = { component: Button };
                export default meta;
                export const Default = {
                    render: () => <Button />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].isCanonical).toBe(false);
        });

        it('does not mark story as canonical when manifest.canonical is false', () => {
            const file = writeTempStory(
                'canonical-false',
                `
                const meta = { component: Button };
                export default meta;
                export const Default = {
                    parameters: { manifest: { canonical: false } },
                    render: () => <Button />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].isCanonical).toBe(false);
        });

        it('only one story is canonical when multiple stories exist', () => {
            const file = writeTempStory(
                'canonical-one-of-many',
                `
                const meta = { component: Button };
                export default meta;
                export const Default = {
                    parameters: { manifest: { canonical: true } },
                    render: () => <Button />,
                };
                export const Disabled = {
                    render: () => <Button disabled />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            const canonicals = examples.filter((e) => e.isCanonical);
            expect(canonicals).toHaveLength(1);
            expect(canonicals[0].name).toBe('Default');
        });
    });

    describe('code extraction from render', () => {
        it('extracts JSX from an arrow function with expression body', () => {
            const file = writeTempStory(
                'render-expr',
                `
                const meta = { component: MyComp };
                export default meta;
                export const Expr = {
                    render: (args) => <MyComp label="hello" />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].code).toContain('<MyComp');
            expect(examples[0].code).toContain('label="hello"');
        });

        it('extracts JSX from an arrow function with block body and return', () => {
            const file = writeTempStory(
                'render-block',
                `
                const meta = { component: MyComp };
                export default meta;
                export const Block = {
                    render: (args) => {
                        return <MyComp value={42} />;
                    },
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].code).toContain('<MyComp');
            expect(examples[0].code).toContain('value={42}');
        });

        it('replaces action() calls with () => {} in extracted code', () => {
            const file = writeTempStory(
                'render-action',
                `
                const meta = { component: MyComp };
                export default meta;
                export const WithAction = {
                    render: () => <MyComp onClick={action('click')} />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].code).not.toContain("action('click')");
            expect(examples[0].code).toContain('() => {}');
        });
    });

    describe('args spread resolution', () => {
        it('resolves {..args} spread with merged meta and story args', () => {
            const file = writeTempStory(
                'spread-resolved',
                `
                const meta = {
                    component: MyComp,
                    args: { color: 'red' },
                };
                export default meta;
                export const Spread = {
                    args: { size: 'large' },
                    render: (args) => <MyComp {...args} />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            // args are serialized preserving the original quote style from source
            expect(examples[0].code).toContain("color='red'");
            expect(examples[0].code).toContain("size='large'");
        });

        it('story args override meta args in spread', () => {
            const file = writeTempStory(
                'spread-override',
                `
                const meta = {
                    component: MyComp,
                    args: { size: 'medium' },
                };
                export default meta;
                export const Override = {
                    args: { size: 'large' },
                    render: (args) => <MyComp {...args} />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].code).toContain("size='large'");
            expect(examples[0].code).not.toContain("size='medium'");
        });
    });

    describe('JSX synthesis from args (no render)', () => {
        it('synthesizes a self-closing element when there are no children', () => {
            const file = writeTempStory(
                'synth-self-closing',
                `
                const meta = {
                    component: MyComp,
                    args: { value: 42 },
                };
                export default meta;
                export const Default = {};
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].code).toMatch(/^<MyComp/);
            expect(examples[0].code).toContain('value={42}');
            expect(examples[0].code).toContain('/>');
        });

        it('synthesizes an element with children when children arg is present', () => {
            const file = writeTempStory(
                'synth-children',
                `
                const meta = {
                    component: Button,
                    args: { children: 'Click me' },
                };
                export default meta;
                export const Default = {};
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].code).toContain('<Button>');
            expect(examples[0].code).toContain('Click me');
            expect(examples[0].code).toContain('</Button>');
        });

        it('omits false/null/undefined args from synthesized JSX', () => {
            const file = writeTempStory(
                'synth-omit-falsy',
                `
                const meta = {
                    component: MyComp,
                    args: { disabled: false, value: null, label: undefined },
                };
                export default meta;
                export const Default = {};
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].code).not.toContain('disabled');
            expect(examples[0].code).not.toContain('value');
            expect(examples[0].code).not.toContain('label');
        });

        it('emits boolean true as a bare prop attribute', () => {
            const file = writeTempStory(
                'synth-bool-true',
                `
                const meta = {
                    component: MyComp,
                    args: { required: true },
                };
                export default meta;
                export const Default = {};
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].code).toContain('required');
            expect(examples[0].code).not.toContain('required={true}');
        });

        it('skips stories with no render and no meta component name', () => {
            const file = writeTempStory(
                'synth-no-component',
                `
                const meta = { title: 'Components/Button' };
                export default meta;
                export const Default = {};
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples).toHaveLength(0);
        });
    });

    describe('story name', () => {
        it('uses the export name as the example name', () => {
            const file = writeTempStory(
                'name-export',
                `
                const meta = { component: MyComp };
                export default meta;
                export const SimpleSelect = {
                    render: () => <MyComp />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].name).toBe('SimpleSelect');
        });

        it('uses the name property as storyName when present', () => {
            const file = writeTempStory(
                'name-override',
                `
                const meta = { component: MyComp };
                export default meta;
                export const SimpleSelect = {
                    name: 'Select',
                    render: () => <MyComp />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].name).toBe('SimpleSelect');
            expect(examples[0].storyName).toBe('Select');
        });

        it('falls back to export name as storyName when name is absent', () => {
            const file = writeTempStory(
                'name-fallback',
                `
                const meta = { component: MyComp };
                export default meta;
                export const WithRender = {
                    render: () => <MyComp />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].storyName).toBe('WithRender');
        });
    });

    describe('description', () => {
        it('extracts description from parameters.docs.description.story', () => {
            const file = writeTempStory(
                'description',
                `
                const meta = { component: MyComp };
                export default meta;
                export const WithDesc = {
                    render: () => <MyComp />,
                    parameters: {
                        docs: { description: { story: 'This is the story description' } },
                    },
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].description).toBe('This is the story description');
        });

        it('returns empty description when parameters.docs is absent', () => {
            const file = writeTempStory(
                'description-absent',
                `
                const meta = { component: MyComp };
                export default meta;
                export const Default = {
                    render: () => <MyComp />,
                };
            `,
            );
            const { examples } = parseStories([file]);
            expect(examples[0].description).toBe('');
        });
    });

    describe('multiple story files', () => {
        it('accumulates examples from multiple files', () => {
            const file1 = writeTempStory(
                'multi-a',
                `
                const meta = { component: CompA };
                export default meta;
                export const StoryA = { render: () => <CompA /> };
            `,
            );
            const file2 = writeTempStory(
                'multi-b',
                `
                const meta = { component: CompB };
                export default meta;
                export const StoryB = { render: () => <CompB /> };
            `,
            );
            const { examples } = parseStories([file1, file2]);
            expect(examples).toHaveLength(2);
            expect(examples.map((e) => e.name)).toEqual(expect.arrayContaining(['StoryA', 'StoryB']));
        });

        it('uses status from the first file that has one', () => {
            const file1 = writeTempStory(
                'multi-status-a',
                `
                const meta = { component: CompA, parameters: { status: { type: 'beta' } } };
                export default meta;
                export const StoryA = { render: () => <CompA /> };
            `,
            );
            const file2 = writeTempStory(
                'multi-status-b',
                `
                const meta = { component: CompB, parameters: { status: { type: 'released' } } };
                export default meta;
                export const StoryB = { render: () => <CompB /> };
            `,
            );
            const { status } = parseStories([file1, file2]);
            expect(status).toBe('beta');
        });
    });
});
