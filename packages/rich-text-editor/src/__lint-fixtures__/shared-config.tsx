/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-083: rules the shared config sets to `error` stay errors.
const load = (): Promise<number> => Promise.resolve(1);

export const start = (): void => {
    // expect-lint: typescript(no-floating-promises)
    load();
};

// expect-lint: typescript(no-unsafe-assignment)
export const value: number = JSON.parse('1');

// expect-lint: @eslint-react(dom-no-missing-button-type)
export const Button = ({ label }: { label: string }) => <button aria-label={label} />;
