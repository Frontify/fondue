/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-react/AC-057, SPEC-rich-text-accessibility/AC-010, SPEC-rich-text-accessibility/AC-027: test files may hold what `src/ui` chrome rules forbid; each `off` in the test override suppresses one rule.
// These violations are unannotated: `no-jsx-string-literal`, `no-image-chrome` and `no-pointer-prevent-default` are `off` for `*.test.tsx`.
export const Literal = () => <p>Bold</p>;
export const Image = () => <img alt="" src="bold.svg" />;
export const Background = () => <span style={{ backgroundImage: 'url(bold.svg)' }} />;
export const PointerDown = () => <button type="button" onPointerDown={(event) => event.preventDefault()} />;
