/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-061: `view.tsx` imports only its `feature.ts`, its CSS Module, `#/bridge/define`, React and Fondue; the file matches several overrides.
import './feature';
import './styles/view.module.scss';
import '#/bridge/define';
import '@frontify/fondue-icons';
import 'react';
// expect-lint: eslint(no-restricted-imports)
import '#/index';
// expect-lint: eslint(no-restricted-imports)
import '#/bridge/node-views';
// expect-lint: eslint(no-restricted-imports)
import '../../bridge/node-views';
// expect-lint: eslint(no-restricted-imports)
import 'prosemirror-view';
// expect-lint: eslint(no-restricted-imports)
import '@radix-ui/react-popover';
// expect-lint: eslint(no-restricted-imports)
import 'next/router';

declare const source: string;

export const Chrome = () => (
    // expect-lint: rte-style(no-jsx-string-literal)
    <p>Checked</p>
);
// expect-lint: rte-style(no-image-chrome)
export const Picture = () => <img src={source} alt="" />;
