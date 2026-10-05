/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-010: `react` imports every folder except `testing`.
import '#/bridge/portals';
import '#/react/views';
import '#/features/registry';
// expect-lint: eslint(no-restricted-imports)
import '#/testing';
// expect-lint: eslint(no-restricted-imports)
import '../../testing';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-view';

declare const source: string;

// SPEC-rich-text-accessibility/AC-010: chrome icons come from `@frontify/fondue-icons`.
export const Picture = () => (
    // expect-lint: rte-style(no-image-chrome)
    <img src={source} alt="" />
);
export const Backdrop = () => (
    <span
        style={{
            // expect-lint: rte-style(no-image-chrome)
            backgroundImage: `url(${source})`,
            // expect-lint: rte-style(no-image-chrome)
            background: `center / cover url(${source})`,
            color: 'inherit',
        }}
    />
);
