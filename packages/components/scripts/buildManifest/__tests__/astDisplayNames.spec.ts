// @vitest-environment node
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { beforeAll, describe, expect, it } from 'vitest';

import { scanDisplayNames, getForwardRefInnerName } from '../utils/astDisplayNames';

const TMP_DIR = join(tmpdir(), 'manifest-test-astDisplayNames');

beforeAll(() => {
    mkdirSync(TMP_DIR, { recursive: true });
});

function writeTempFile(name: string, content: string): string {
    const filePath = join(TMP_DIR, `${name}.tsx`);
    writeFileSync(filePath, content, 'utf-8');
    return filePath;
}

// ---------------------------------------------------------------------------
// scanDisplayNames
// ---------------------------------------------------------------------------

describe('scanDisplayNames', () => {
    it('returns empty map for file with no displayName assignments', () => {
        const file = writeTempFile(
            'no-display',
            `
            const MyComp = () => <div />;
            export default MyComp;
        `,
        );
        const { displayNameMap } = scanDisplayNames(file);
        expect(displayNameMap.size).toBe(0);
    });

    it('captures X.displayName = "Y" assignments', () => {
        const file = writeTempFile(
            'basic-display',
            `
            const _Inner = () => <div />;
            _Inner.displayName = 'MyComp.Root';
            export const MyComp = _Inner;
        `,
        );
        const { displayNameMap } = scanDisplayNames(file);
        expect(displayNameMap.get('_Inner')).toBe('MyComp.Root');
    });

    it('captures multiple displayName assignments', () => {
        const file = writeTempFile(
            'multi-display',
            `
            const A = () => null;
            A.displayName = 'CompA';
            const B = () => null;
            B.displayName = 'CompB';
        `,
        );
        const { displayNameMap } = scanDisplayNames(file);
        expect(displayNameMap.get('A')).toBe('CompA');
        expect(displayNameMap.get('B')).toBe('CompB');
    });

    it('ignores non-displayName property assignments', () => {
        const file = writeTempFile(
            'other-prop',
            `
            const A = () => null;
            A.propTypes = {};
        `,
        );
        const { displayNameMap } = scanDisplayNames(file);
        expect(displayNameMap.size).toBe(0);
    });

    it('ignores nested property access (X.Y.displayName)', () => {
        const file = writeTempFile(
            'nested-prop',
            `
            const A = { B: {} };
            A.B.displayName = 'Nested';
        `,
        );
        const { displayNameMap } = scanDisplayNames(file);
        expect(displayNameMap.size).toBe(0);
    });

    it('ignores non-string literal displayName values', () => {
        const file = writeTempFile(
            'non-string',
            `
            const A = () => null;
            A.displayName = someVariable;
        `,
        );
        const { displayNameMap } = scanDisplayNames(file);
        expect(displayNameMap.size).toBe(0);
    });

    it('ignores non-equals expressions', () => {
        const file = writeTempFile(
            'non-equals',
            `
            const A = () => null;
            A.displayName === 'CompA';
        `,
        );
        const { displayNameMap } = scanDisplayNames(file);
        expect(displayNameMap.size).toBe(0);
    });

    it('returns a valid SourceFile alongside the map', () => {
        const file = writeTempFile('source-file', 'const A = 1;');
        const { sourceFile } = scanDisplayNames(file);
        expect(sourceFile).toBeDefined();
        expect(sourceFile.statements.length).toBeGreaterThan(0);
    });
});

// ---------------------------------------------------------------------------
// getForwardRefInnerName
// ---------------------------------------------------------------------------

describe('getForwardRefInnerName', () => {
    it('returns inner component name for forwardRef(InnerComp)', () => {
        const file = writeTempFile(
            'fwd-basic',
            `
            const InnerBtn = () => null;
            const Btn = forwardRef(InnerBtn);
        `,
        );
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Btn')).toBe('InnerBtn');
    });

    it('returns inner name for React.forwardRef(InnerComp)', () => {
        const file = writeTempFile(
            'fwd-react',
            `
            const InnerBtn = () => null;
            const Btn = React.forwardRef(InnerBtn);
        `,
        );
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Btn')).toBe('InnerBtn');
    });

    it('returns null when variable is not found', () => {
        const file = writeTempFile(
            'fwd-not-found',
            `
            const Other = forwardRef(InnerBtn);
        `,
        );
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Btn')).toBeNull();
    });

    it('returns null when initializer is not forwardRef', () => {
        const file = writeTempFile(
            'fwd-not-fwd',
            `
            const Btn = someOtherFn(InnerBtn);
        `,
        );
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Btn')).toBeNull();
    });

    it('returns null when forwardRef argument is not an identifier', () => {
        const file = writeTempFile(
            'fwd-inline',
            `
            const Btn = forwardRef((props, ref) => <button ref={ref} />);
        `,
        );
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Btn')).toBeNull();
    });

    it('returns null when variable has no initializer', () => {
        const file = writeTempFile('fwd-no-init', 'let Btn: any;');
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Btn')).toBeNull();
    });

    it('returns null when initializer is not a call expression', () => {
        const file = writeTempFile(
            'fwd-not-call',
            `
            const Btn = InnerBtn;
        `,
        );
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Btn')).toBeNull();
    });

    it('returns null for non-variable statements', () => {
        const file = writeTempFile(
            'fwd-func',
            `
            function Btn() { return null; }
        `,
        );
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Btn')).toBeNull();
    });

    // Object literal pattern: export const Comp = { Trigger: forwardRef(Inner) }
    it('resolves forwardRef inside object literal property', () => {
        const file = writeTempFile(
            'fwd-obj-literal',
            `
            const DialogTrigger = () => null;
            export const Dialog = {
                Trigger: forwardRef(DialogTrigger),
            };
        `,
        );
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Trigger')).toBe('DialogTrigger');
    });

    it('resolves React.forwardRef inside object literal property', () => {
        const file = writeTempFile(
            'fwd-obj-react',
            `
            const Inner = () => null;
            export const Comp = {
                Content: React.forwardRef(Inner),
            };
        `,
        );
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Content')).toBe('Inner');
    });

    it('returns null for non-forwardRef call in object literal', () => {
        const file = writeTempFile(
            'fwd-obj-not-fwd',
            `
            const Inner = () => null;
            export const Comp = {
                Trigger: memo(Inner),
            };
        `,
        );
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Trigger')).toBeNull();
    });

    it('returns null for inline arrow in object literal forwardRef', () => {
        const file = writeTempFile(
            'fwd-obj-inline',
            `
            export const Comp = {
                Trigger: forwardRef((props, ref) => <button ref={ref} />),
            };
        `,
        );
        const { sourceFile } = scanDisplayNames(file);
        expect(getForwardRefInnerName(sourceFile, 'Trigger')).toBeNull();
    });
});
