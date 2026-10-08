/* (c) Copyright Frontify Ltd., all rights reserved. */

// Generates /llms.txt (https://llmstxt.org) and an /agents.txt alias for the
// deployed Storybook. Both serve the SDK usage guide, so an agent landing on
// the docs site learns to install the Fondue skill or query the SDK.

import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { guides } from '@frontify/fondue-sdk';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '../static');

const usage = guides.get('sdk/Usage');
if (!usage) {
    throw new Error('Guide "sdk/Usage" not found in @frontify/fondue-sdk');
}

/**
 * Pushes every markdown heading one level down so the guide nests under the
 * llms.txt H1. Fenced code blocks are left alone.
 * @param {string} markdown
 */
const demoteHeadings = (markdown) => {
    let inFence = false;
    return markdown
        .split('\n')
        .map((line) => {
            if (line.startsWith('```')) {
                inFence = !inFence;
            }
            return !inFence && /^#{1,5} /.test(line) ? `#${line}` : line;
        })
        .join('\n');
};

const otherGuides = guides
    .list()
    .filter((guide) => guide.id !== usage.id)
    .map((guide) => `- \`${guide.id}\`: ${guide.title}`)
    .join('\n');

const content = `# Fondue

> Fondue is Frontify's React design system: components, icons and design tokens, published as \`@frontify/fondue\`. Don't scrape this Storybook. Install the Fondue agent skill, or query \`@frontify/fondue/sdk\` from the project, which describes the exact version installed there.

${demoteHeadings(usage.content).trim()}

## All guides

Read any of these from code with \`guides.get('<id>')?.content\` (\`import { guides } from '@frontify/fondue/sdk'\`):

${otherGuides}
`;

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'llms.txt'), content);
writeFileSync(join(outDir, 'agents.txt'), content);

console.log('Generated static/llms.txt and static/agents.txt');
