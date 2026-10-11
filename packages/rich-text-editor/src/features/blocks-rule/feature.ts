/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineFeature, insertNode } from '#/model';

/** Horizontal rules as `horizontal_rule`, a leaf block that the reader writes as `<hr>`. */
export const rule = defineFeature({
    id: 'blocks.rule',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        horizontal_rule: { group: 'block', attrs: {}, html: ['hr'], parse: [{ tag: 'hr' }] },
    },
    formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
    commands: { 'rule.insert': insertNode('horizontal_rule') },
    inputRules: [{ id: 'rule.dashes', kind: 'line-start', command: 'rule.insert', markers: ['---', '***', '___'] }],
    toolbar: [{ kind: 'button', command: 'rule.insert', labelKey: 'RichTextEditor_divider', icon: 'IconDividerSolid' }],
});
