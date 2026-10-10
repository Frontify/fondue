/* (c) Copyright Frontify Ltd., all rights reserved. */

export const Toolbar = ({ pressed }: { readonly pressed: boolean }) => (
    <div role="toolbar" aria-label="Text formatting" aria-keyshortcuts="Alt+F10">
        <button type="button" role={pressed ? 'switch' : 'button'} aria-pressed={pressed} />
        <span role="none presentation" aria-hidden />
    </div>
);

export const mark = (element: HTMLElement) => {
    element.setAttribute('role', 'status');
    element.setAttribute('aria-live', 'polite');
    return { role: 'group', 'aria-describedby': 'hint', selector: '[aria-selected="true"]' };
};
