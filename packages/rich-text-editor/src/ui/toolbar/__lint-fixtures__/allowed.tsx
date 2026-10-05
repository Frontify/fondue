/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-react/AC-098 and SPEC-rich-text-accessibility/AC-027: the toolbar may import Radix and keep focus on pointer down.
import '@radix-ui/react-toolbar';
// expect-lint: eslint(no-restricted-imports)
import '#/definition/compiler';

declare const label: string;

export const Item = () => <button type="button" aria-label={label} onPointerDown={(event) => event.preventDefault()} />;
