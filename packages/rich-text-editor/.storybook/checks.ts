/* (c) Copyright Frontify Ltd., all rights reserved. */

import axe from 'axe-core';

import { AXE_TAGS } from '../src/features/conformance/axe-tags';
import { probeRuntimes } from '../src/testing/probe';

import { featureTagsOf } from './feature-tags';

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

/** A story's `feature:` tags name exactly the features each editor it mounts installs (SPEC-rich-text/AC-053). */
export const featureTagFaults = (tags: readonly string[]): string[] => {
    const tagged = featureTagsOf(tags).sort().join(', ');
    if (tagged === '') {
        return [];
    }
    const { installedFeatures } = probeRuntimes();
    if (installedFeatures.length === 0) {
        return [`the story mounts no editor, while its feature tags name ${tagged}`];
    }
    const faults: string[] = [];
    for (const installed of installedFeatures) {
        const features = [...installed].sort().join(', ');
        if (features !== tagged) {
            faults.push(`the story installs ${features}, while its feature tags name ${tagged}`);
        }
    }
    return faults;
};

/** Announcements reach the one polite region: no assertive region, no alert and no live surface (SPEC-rich-text-accessibility/AC-038). */
export const liveRegionFaults = (canvasElement: HTMLElement): string[] => {
    const faults: string[] = [];
    for (const element of canvasElement.querySelectorAll('[aria-live="assertive"]')) {
        faults.push(`a live region is assertive: ${element.outerHTML}`);
    }
    for (const element of canvasElement.querySelectorAll('[role="alert"]')) {
        faults.push(`a live region is an alert: ${element.outerHTML}`);
    }
    for (const element of canvasElement.querySelectorAll('[data-rte-surface][aria-live]')) {
        faults.push(`the surface is a live region: ${element.outerHTML}`);
    }
    return faults;
};
