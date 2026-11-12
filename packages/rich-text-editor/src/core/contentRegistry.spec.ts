/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { buildContentRegistry } from './contentRegistry';
import { defineContent, defineMark, definePlugin } from './plugin';
import { buildPluginRegistry } from './registry';

const UNKNOWN_MODIFIER_HOTKEY = 'Hyper-b';

const bold = defineMark({ toHtml: () => ({ tag: 'strong', children: true }), parse: [] });

const icon = () => null;

const boldPlugin = definePlugin({
    id: 'bold',
    content: defineContent({ marks: { bold } }),
    hotkeys: { [UNKNOWN_MODIFIER_HOTKEY]: { label: 'Bold', run: () => {} } },
    toolbar: [{ icon, label: 'Bold' }],
});

describe('buildContentRegistry', () => {
    it('reads only the content of a plugin with hotkeys and a toolbar', () => {
        const registry = buildContentRegistry([boldPlugin]);

        expect(Object.keys(registry).sort()).toEqual([
            'blockAttributes',
            'blocks',
            'contentClassNames',
            'contentProperties',
            'inlines',
            'itemTypeByList',
            'marks',
        ]);
        expect([...registry.marks.keys()]).toEqual(['bold']);
    });

    it('does not parse hotkeys, which the plugin registry still rejects', () => {
        expect(() => buildContentRegistry([boldPlugin])).not.toThrow();
        expect(() => buildPluginRegistry([boldPlugin])).toThrow(
            `Unknown modifier "Hyper" in hotkey "${UNKNOWN_MODIFIER_HOTKEY}".`,
        );
    });

    it('names the first type of a hand-built plugin with no id', () => {
        // @ts-expect-error a hand-written plugin can leave out the `id`
        expect(() => buildContentRegistry([{ kind: 'plugin' }])).toThrow('Plugin has no id: no type declared');
    });
});
