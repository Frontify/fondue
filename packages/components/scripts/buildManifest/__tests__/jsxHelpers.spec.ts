/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { createSourceFile, isVariableStatement, ScriptKind, ScriptTarget, type Expression } from 'typescript';
import { describe, expect, it } from 'vitest';

import {
    isJsxLike,
    extractJsxFromRender,
    serializeArgsAsProps,
    resolveArgsSpread,
    cleanCode,
    synthesizeJsx,
} from '../utils/jsxHelpers';

function parseExpression(code: string): Expression {
    const src = createSourceFile('test.tsx', `const x = ${code};`, ScriptTarget.Latest, true, ScriptKind.TSX);
    const stmt = src.statements[0];
    if (!isVariableStatement(stmt)) {
        throw new Error('Expected variable statement');
    }
    return stmt.declarationList.declarations[0].initializer;
}

function withSource(code: string): { expr: Expression; sourceText: string } {
    const sourceText = `const x = ${code};`;
    const src = createSourceFile('test.tsx', sourceText, ScriptTarget.Latest, true, ScriptKind.TSX);
    const stmt = src.statements[0];
    if (!isVariableStatement(stmt)) {
        throw new Error('Expected variable statement');
    }
    return { expr: stmt.declarationList.declarations[0].initializer, sourceText };
}

describe('isJsxLike', () => {
    it('returns true for JSX elements', () => {
        expect(isJsxLike(parseExpression('<div></div>'))).toBe(true);
    });

    it('returns true for self-closing JSX', () => {
        expect(isJsxLike(parseExpression('<br />'))).toBe(true);
    });

    it('returns true for JSX fragments', () => {
        expect(isJsxLike(parseExpression('<></>'))).toBe(true);
    });

    it('returns false for non-JSX expressions', () => {
        expect(isJsxLike(parseExpression('42'))).toBe(false);
    });
});

describe('extractJsxFromRender', () => {
    it('returns null for non-function expressions', () => {
        const { expr, sourceText } = withSource('42');
        expect(extractJsxFromRender(expr, sourceText)).toBeNull();
    });

    it('extracts JSX from arrow expression body', () => {
        const { expr, sourceText } = withSource('() => <div />');
        expect(extractJsxFromRender(expr, sourceText)).toContain('<div />');
    });

    it('extracts JSX from parenthesized arrow expression body', () => {
        const { expr, sourceText } = withSource('() => (<div />)');
        const result = extractJsxFromRender(expr, sourceText);
        expect(result).toContain('<div />');
    });

    it('returns null for arrow expression body with non-JSX', () => {
        const { expr, sourceText } = withSource('() => 42');
        expect(extractJsxFromRender(expr, sourceText)).toBeNull();
    });

    it('extracts JSX from block body with return', () => {
        const { expr, sourceText } = withSource('() => { return <div />; }');
        expect(extractJsxFromRender(expr, sourceText)).toContain('<div />');
    });

    it('extracts JSX from block body with parenthesized return', () => {
        const { expr, sourceText } = withSource('() => { return (<div />); }');
        const result = extractJsxFromRender(expr, sourceText);
        expect(result).toContain('<div />');
    });

    it('returns null for block body with no return', () => {
        const { expr, sourceText } = withSource('() => { const a = 1; }');
        expect(extractJsxFromRender(expr, sourceText)).toBeNull();
    });

    it('extracts JSX from function expression', () => {
        const { expr, sourceText } = withSource('function() { return <div />; }');
        expect(extractJsxFromRender(expr, sourceText)).toContain('<div />');
    });

    it('skips non-return statements in block body', () => {
        const { expr, sourceText } = withSource('() => { const a = 1; return <div />; }');
        expect(extractJsxFromRender(expr, sourceText)).toContain('<div />');
    });
});

describe('serializeArgsAsProps', () => {
    it('returns empty string for empty args', () => {
        expect(serializeArgsAsProps({})).toBe('');
    });

    it('skips children key', () => {
        expect(serializeArgsAsProps({ children: 'text' })).toBe('');
    });

    it('skips action() calls', () => {
        expect(serializeArgsAsProps({ onClick: "action('click')" })).toBe('');
    });

    it('skips () => arrow functions', () => {
        expect(serializeArgsAsProps({ onChange: '() => console.log()' })).toBe('');
    });

    it('renders true as bare prop', () => {
        expect(serializeArgsAsProps({ disabled: 'true' })).toBe('disabled');
    });

    it('omits false values', () => {
        expect(serializeArgsAsProps({ disabled: 'false' })).toBe('');
    });

    it('omits null values', () => {
        expect(serializeArgsAsProps({ value: 'null' })).toBe('');
    });

    it('omits undefined values', () => {
        expect(serializeArgsAsProps({ value: 'undefined' })).toBe('');
    });

    it('renders double-quoted string values directly', () => {
        expect(serializeArgsAsProps({ label: '"hello"' })).toBe('label="hello"');
    });

    it('renders single-quoted string values directly', () => {
        expect(serializeArgsAsProps({ label: "'hello'" })).toBe("label='hello'");
    });

    it('wraps other values in braces', () => {
        expect(serializeArgsAsProps({ count: '42' })).toBe('count={42}');
    });

    it('joins multiple props with spaces', () => {
        expect(serializeArgsAsProps({ a: 'true', b: '"x"' })).toBe('a b="x"');
    });
});

describe('resolveArgsSpread', () => {
    it('returns code unchanged when no spread present', () => {
        expect(resolveArgsSpread('<Foo bar />', {})).toBe('<Foo bar />');
    });

    it('replaces {...args} with serialized props', () => {
        const result = resolveArgsSpread('<Foo {...args} />', { size: '"lg"' });
        expect(result).toContain('size="lg"');
        expect(result).not.toContain('{...args}');
    });

    it('handles whitespace in spread expression', () => {
        const result = resolveArgsSpread('<Foo {... args } />', { a: 'true' });
        expect(result).toContain('a');
    });
});

describe('cleanCode', () => {
    it('replaces action() with () => {}', () => {
        expect(cleanCode(`onClick={action('click')}`)).toBe('onClick={() => {}}');
    });

    it('preserves non-action code', () => {
        expect(cleanCode('<Foo bar />')).toBe('<Foo bar />');
    });

    it('replaces multiple action calls', () => {
        const result = cleanCode(`a={action('a')} b={action('b')}`);
        expect(result).not.toContain('action');
        expect(result).toContain('() => {}');
    });
});

describe('synthesizeJsx', () => {
    it('creates self-closing element with no args', () => {
        expect(synthesizeJsx('Foo', {})).toBe('<Foo />');
    });

    it('creates self-closing element with props', () => {
        expect(synthesizeJsx('Foo', { size: '"lg"' })).toBe('<Foo size="lg" />');
    });

    it('creates element with children', () => {
        const result = synthesizeJsx('Button', { children: "'Click me'" });
        expect(result).toContain('<Button>');
        expect(result).toContain('Click me');
        expect(result).toContain('</Button>');
    });

    it('excludes children from props string', () => {
        const result = synthesizeJsx('Button', { children: "'text'", size: '"lg"' });
        expect(result).toContain('size="lg"');
        expect(result).not.toContain('children');
    });

    it('skips action and arrow function args', () => {
        const result = synthesizeJsx('Foo', { onClick: "action('click')", onChange: '() => {}' });
        expect(result).toBe('<Foo />');
    });

    it('renders boolean true as bare prop', () => {
        const result = synthesizeJsx('Foo', { disabled: 'true' });
        expect(result).toBe('<Foo disabled />');
    });

    it('omits false/null/undefined args', () => {
        const result = synthesizeJsx('Foo', { a: 'false', b: 'null', c: 'undefined' });
        expect(result).toBe('<Foo />');
    });
});
