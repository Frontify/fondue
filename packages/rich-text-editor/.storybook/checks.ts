/* (c) Copyright Frontify Ltd., all rights reserved. */

import axe from 'axe-core';

// SPEC-rich-text-accessibility/AC-036: the tags every story is checked against.
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const PROVIDER = '.fondue-theme-provider';

/** Every violation axe finds in the story, as one line each; none when the story is clean. */
export const axeViolations = async (canvasElement: HTMLElement): Promise<string[]> => {
    const { violations } = await axe.run(canvasElement, { runOnly: { type: 'tag', values: AXE_TAGS } });
    return violations.map(({ id, nodes }) => `${id}: ${nodes.map(({ html }) => html).join(' | ')}`);
};

/** One provider per rendered theme with its theme class, and the direction as the `dir` of each (SPEC-rich-text/AC-094). */
export const globalsFaults = (
    canvasElement: HTMLElement,
    { theme = 'light', direction = 'ltr' }: { theme?: string; direction?: string },
): string[] => {
    const providers = [...canvasElement.querySelectorAll<HTMLElement>(PROVIDER)];
    let themes = [theme];
    if (theme === 'both') {
        themes = ['light', 'dark'];
    }
    const faults: string[] = [];
    if (providers.length !== themes.length) {
        faults.push(`${providers.length} theme providers rendered for theme ${theme}, expected ${themes.length}`);
    }
    for (const [index, name] of themes.entries()) {
        const provider = providers[index];
        if (provider !== undefined && !provider.className.includes(`_${name}_`)) {
            faults.push(`provider ${index} has class "${provider.className}", expected the ${name} theme class`);
        }
    }
    for (const provider of providers) {
        if (provider.getAttribute('dir') !== direction) {
            faults.push(`a provider has dir "${provider.getAttribute('dir')}", expected ${direction}`);
        }
    }
    return faults;
};

const FEATURE_TAG = 'feature:';

/** A story's `feature:` tags name exactly the features its `definition` arg installs (SPEC-rich-text/AC-053). */
export const featureTagFaults = (tags: readonly string[], args: Readonly<Record<string, unknown>>): string[] => {
    const tagged = tags.filter((tag) => tag.startsWith(FEATURE_TAG)).map((tag) => tag.slice(FEATURE_TAG.length));
    if (tagged.length === 0) {
        return [];
    }
    let installed: string[] = [];
    const definition = args.definition as { readonly capabilities?: readonly { readonly id: string }[] } | undefined;
    if (definition !== undefined && definition.capabilities !== undefined) {
        installed = definition.capabilities.map(({ id }) => id);
    }
    if (installed.sort().join(', ') === tagged.sort().join(', ')) {
        return [];
    }
    return [`the story installs ${installed.join(', ')}, while its feature tags name ${tagged.join(', ')}`];
};
