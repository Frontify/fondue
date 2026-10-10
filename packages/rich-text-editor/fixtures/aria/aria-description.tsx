/* (c) Copyright Frontify Ltd., all rights reserved. */

// `aria-description` and the `comment` role come with WAI-ARIA 1.3, not 1.2.
export const Described = () => (
    <div role="comment" aria-description="Says more">
        <span role={Math.random() > 0.5 ? 'note' : 'callout'} />
    </div>
);

export const describe = (element: HTMLElement) => {
    element.setAttribute('aria-description', 'Says more');
    element.setAttribute('role', 'mark');
    return { role: 'suggestion', 'aria-braillelabel': 'b' };
};

export const computed = { ['role']: 'callout' };

const role = 'comment';
export const shorthand = { role };
