/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-react/AC-075: no `dangerouslySetInnerHTML`.
export const Markup = ({ html }: { html: string }) => (
    // expect-lint: react(no-danger)
    <div dangerouslySetInnerHTML={{ __html: html }} />
);
