/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { reactRenderProbe } from '#/adapters/reactProbe/renderProbe';
import { type RtePlugin } from '#/domain';

import { buildSchema } from './schema';

/**
 * These are about WHEN a render is probed, which is the one cost in the schema
 * build worth caring about: probing renders React and reads the markup back, and
 * a page mounting twenty editors pays for whatever the build asks of it twenty
 * times over.
 *
 * The plugin objects are declared once, at module level, the way a host is meant
 * to declare them — the sharing tested at the bottom is what that buys.
 */
const plugins: RtePlugin[] = [
    {
        id: 'bold',
        schema: {
            marks: [{ key: 'bold', render: ({ children }) => <strong>{children}</strong>, parseRules: [{ tag: 'b' }] }],
        },
    },
    {
        id: 'link',
        schema: {
            marks: [
                {
                    key: 'link',
                    attributes: { href: { parseFromDomAttribute: 'href' } },
                    // A render function reads its own value, the way a real plugin does.
                    render: ({ children, value }) => <a href={(value as { href?: string }).href}>{children}</a>,
                },
            ],
        },
    },
];

describe('buildSchema', () => {
    it('renders nothing while building the schema', () => {
        const probe = vi.fn(reactRenderProbe);

        buildSchema(plugins, probe);

        // Every probe a mark needs is for recognizing pasted HTML, and nothing has
        // been pasted. A mounted editor that has not been typed in or pasted into
        // should not have rendered a thing.
        expect(probe).not.toHaveBeenCalled();
    });

    it('probes a mark for its tag the first time its parse rules are read, and only then', () => {
        const probe = vi.fn(reactRenderProbe);
        const { schema } = buildSchema(plugins, probe);

        // What the engine does when it first has HTML to make sense of.
        const rules = schema.marks.bold?.spec.parseDOM;

        expect(probe).toHaveBeenCalledTimes(1);
        // The element the mark renders, then the rules it declared itself.
        expect(rules?.map((rule) => rule.tag)).toEqual(['strong', 'b']);

        // Asked again: remembered, not probed again.
        expect(schema.marks.bold?.spec.parseDOM).toBe(rules);
        expect(probe).toHaveBeenCalledTimes(1);
    });

    it('probes once for two editors built over the same plugin objects', () => {
        const probe = vi.fn(reactRenderProbe);
        const first = buildSchema(plugins, probe);
        const second = buildSchema(plugins, probe);

        // The cache hangs off the declaration rather than off the editor, which is
        // what makes a page of editors over one `defaultPlugins` array cheap: the
        // second one asks the same question and is answered from what the first
        // already worked out.
        expect(first.schema.marks.link?.spec.parseDOM).toBeDefined();
        expect(second.schema.marks.link?.spec.parseDOM).toBeDefined();
        expect(probe).toHaveBeenCalledTimes(1);
    });
});
