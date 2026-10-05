/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-react/AC-098: menus use the Fondue overlays, never Radix directly.
// expect-lint: eslint(no-restricted-imports)
import '@radix-ui/react-popover';

declare const label: string;
declare const element: HTMLElement;

// SPEC-rich-text-accessibility/AC-027: no pointer-down `preventDefault` outside the toolbars and the suggestion list.
export const Item = () => (
    <button
        type="button"
        aria-label={label}
        // expect-lint: rte-style(no-pointer-prevent-default)
        onPointerDown={(event) => event.preventDefault()}
        onClick={(event) => event.preventDefault()}
    />
);

export const listen = () => {
    element.addEventListener('mousedown', (event) => {
        // expect-lint: rte-style(no-pointer-prevent-default)
        event.preventDefault();
    });
};
