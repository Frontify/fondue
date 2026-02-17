/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';
import { addons, types } from 'storybook/manager-api';

import fonduePackageJson from '../../packages/fondue/package.json';

import { dark } from './frontifyTheme';

addons.setConfig({
    theme: dark,
});

addons.register('frontify/version-display', () => {
    addons.add('frontify/version-display/fondue', {
        title: 'Fondue Version',
        type: types.TOOL,
        match: () => {
            return true;
        },
        render: () =>
            createElement(
                'span',
                {
                    style: {
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                        color: 'rgb(210, 210, 210)',
                    },
                },
                `v${fonduePackageJson.version}`,
            ),
    });
});

// Workaround for Storybook composition bug: when the page initially loads with
// a composed ref story active, the root preview iframe permanently points to the
// ref's iframe.html (FramesRenderer sets it once via useRef and never updates it).
// Navigating to a root story then fails with MissingStoryAfterHmrError because
// the composed storybook's preview doesn't have the root stories.
// Detect when the preview iframe becomes active while pointing at the wrong origin
// and force a full page reload so the iframe is re-initialised with the correct URL.
addons.register('frontify/fix-composition-preview', () => {
    const correctOrigin = window.location.origin;

    const observer = new MutationObserver(() => {
        const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement | null;
        if (!iframe?.src) {
            return;
        }

        const isActive = iframe.getAttribute('data-is-storybook') === 'true';
        if (!isActive) {
            return;
        }

        try {
            if (new URL(iframe.src).origin !== correctOrigin) {
                observer.disconnect();
                window.location.reload();
            }
        } catch {
            // ignore URL parse errors
        }
    });

    observer.observe(document.documentElement, {
        subtree: true,
        attributes: true,
        attributeFilter: ['data-is-storybook'],
    });
});
