// @vitest-environment node
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';
import {
    createSourceFile,
    isVariableStatement,
    ScriptKind,
    ScriptTarget,
    type Expression,
    type ObjectLiteralExpression,
} from 'typescript';

import {
    getStringValue,
    extractArgsFromObject,
    extractMetaArgsOnly,
    findProp,
    extractMetaStatus,
    extractDescription,
    extractIsCanonical,
} from '../utils/valueExtractors';

function parseExpression(code: string, kind = ScriptKind.TS): Expression {
    const src = createSourceFile('test.ts', `const x = ${code};`, ScriptTarget.Latest, true, kind);
    const stmt = src.statements[0];
    if (!isVariableStatement(stmt)) {
        throw new Error('Expected variable statement');
    }
    return stmt.declarationList.declarations[0].initializer!;
}

function parseObject(code: string): { obj: ObjectLiteralExpression; sourceText: string } {
    const sourceText = `const x = ${code};`;
    return { obj: parseExpression(code) as ObjectLiteralExpression, sourceText };
}

// ---------------------------------------------------------------------------
// getStringValue
// ---------------------------------------------------------------------------

describe('getStringValue', () => {
    it('returns text for string literals', () => {
        expect(getStringValue(parseExpression("'hello'"))).toBe('hello');
    });

    it('returns text for double-quoted strings', () => {
        expect(getStringValue(parseExpression('"hello"'))).toBe('hello');
    });

    it('returns text for template literals without substitutions', () => {
        expect(getStringValue(parseExpression('`hello`'))).toBe('hello');
    });

    it('returns null for numeric literals', () => {
        expect(getStringValue(parseExpression('42'))).toBeNull();
    });

    it('returns null for identifiers', () => {
        expect(getStringValue(parseExpression('myVar'))).toBeNull();
    });
});

// ---------------------------------------------------------------------------
// extractArgsFromObject
// ---------------------------------------------------------------------------

describe('extractArgsFromObject', () => {
    it('extracts simple key-value pairs', () => {
        const { obj, sourceText } = parseObject("{ color: 'red', size: 42 }");
        const result = extractArgsFromObject(obj, sourceText);
        expect(result.color).toBe("'red'");
        expect(result.size).toBe('42');
    });

    it('warns on spread assignments', () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const { obj, sourceText } = parseObject('{ ...base, color: "red" }');
        const result = extractArgsFromObject(obj, sourceText);
        expect(result.color).toBe('"red"');
        expect(warnSpy).toHaveBeenCalledOnce();
        warnSpy.mockRestore();
    });

    it('handles string-literal property names', () => {
        const { obj, sourceText } = parseObject("{ 'data-id': 'test' }");
        const result = extractArgsFromObject(obj, sourceText);
        expect(result['data-id']).toBe("'test'");
    });

    it('skips computed property names', () => {
        const { obj, sourceText } = parseObject('{ [dynamicKey]: "value" }');
        const result = extractArgsFromObject(obj, sourceText);
        expect(Object.keys(result)).toHaveLength(0);
    });

    it('returns empty object for empty literal', () => {
        const { obj, sourceText } = parseObject('{}');
        expect(extractArgsFromObject(obj, sourceText)).toEqual({});
    });
});

// ---------------------------------------------------------------------------
// extractMetaArgsOnly
// ---------------------------------------------------------------------------

describe('extractMetaArgsOnly', () => {
    it('extracts args sub-object', () => {
        const { obj, sourceText } = parseObject("{ args: { color: 'red' } }");
        const result = extractMetaArgsOnly(obj, sourceText);
        expect(result.color).toBe("'red'");
    });

    it('returns empty when no args property', () => {
        const { obj, sourceText } = parseObject("{ component: Button }");
        expect(extractMetaArgsOnly(obj, sourceText)).toEqual({});
    });

    it('returns empty when args is not an object literal', () => {
        const { obj, sourceText } = parseObject('{ args: someVariable }');
        expect(extractMetaArgsOnly(obj, sourceText)).toEqual({});
    });
});

// ---------------------------------------------------------------------------
// findProp
// ---------------------------------------------------------------------------

describe('findProp', () => {
    it('finds a named property', () => {
        const { obj } = parseObject("{ status: 'released' }");
        const result = findProp(obj, 'status');
        expect(result).not.toBeNull();
    });

    it('returns null when property is missing', () => {
        const { obj } = parseObject("{ other: 'value' }");
        expect(findProp(obj, 'status')).toBeNull();
    });

    it('returns null for empty object', () => {
        const { obj } = parseObject('{}');
        expect(findProp(obj, 'status')).toBeNull();
    });
});

// ---------------------------------------------------------------------------
// extractMetaStatus
// ---------------------------------------------------------------------------

describe('extractMetaStatus', () => {
    it('extracts status from parameters.status.type', () => {
        const expr = parseExpression("{ status: { type: 'released' } }");
        expect(extractMetaStatus(expr)).toBe('released');
    });

    it('returns empty for non-object expression', () => {
        expect(extractMetaStatus(parseExpression('42'))).toBe('');
    });

    it('returns empty when status property is missing', () => {
        const expr = parseExpression('{ other: {} }');
        expect(extractMetaStatus(expr)).toBe('');
    });

    it('returns empty when status is not an object', () => {
        const expr = parseExpression("{ status: 'string' }");
        expect(extractMetaStatus(expr)).toBe('');
    });

    it('returns empty when type property is missing', () => {
        const expr = parseExpression('{ status: { other: "value" } }');
        expect(extractMetaStatus(expr)).toBe('');
    });
});

// ---------------------------------------------------------------------------
// extractDescription
// ---------------------------------------------------------------------------

describe('extractDescription', () => {
    it('extracts from parameters.docs.description.story', () => {
        const expr = parseExpression("{ docs: { description: { story: 'My description' } } }");
        expect(extractDescription(expr)).toBe('My description');
    });

    it('returns empty for non-object expression', () => {
        expect(extractDescription(parseExpression('42'))).toBe('');
    });

    it('returns empty when docs is missing', () => {
        expect(extractDescription(parseExpression('{ other: {} }'))).toBe('');
    });

    it('returns empty when docs is not an object', () => {
        expect(extractDescription(parseExpression("{ docs: 'string' }"))).toBe('');
    });

    it('returns empty when description is missing', () => {
        expect(extractDescription(parseExpression('{ docs: { other: {} } }'))).toBe('');
    });

    it('returns empty when description is not an object', () => {
        expect(extractDescription(parseExpression("{ docs: { description: 'string' } }"))).toBe('');
    });

    it('returns empty when story is missing', () => {
        expect(extractDescription(parseExpression('{ docs: { description: { other: "x" } } }'))).toBe('');
    });
});

// ---------------------------------------------------------------------------
// extractIsCanonical
// ---------------------------------------------------------------------------

describe('extractIsCanonical', () => {
    it('returns true when manifest.canonical is true', () => {
        const expr = parseExpression('{ manifest: { canonical: true } }');
        expect(extractIsCanonical(expr)).toBe(true);
    });

    it('returns false when manifest.canonical is false', () => {
        const expr = parseExpression('{ manifest: { canonical: false } }');
        expect(extractIsCanonical(expr)).toBe(false);
    });

    it('returns false for non-object expression', () => {
        expect(extractIsCanonical(parseExpression('42'))).toBe(false);
    });

    it('returns false when manifest is missing', () => {
        expect(extractIsCanonical(parseExpression('{ other: {} }'))).toBe(false);
    });

    it('returns false when manifest is not an object', () => {
        expect(extractIsCanonical(parseExpression("{ manifest: 'string' }"))).toBe(false);
    });

    it('returns false when canonical is missing', () => {
        expect(extractIsCanonical(parseExpression('{ manifest: { other: true } }'))).toBe(false);
    });
});
