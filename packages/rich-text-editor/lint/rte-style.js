/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * @typedef {Parameters<import('oxlint/plugins-dev').RuleTester['run']>[1]} Rule
 * @typedef {Parameters<NonNullable<ReturnType<NonNullable<Rule['create']>>['CallExpression']>>[0]} CallNode
 * @typedef {CallNode['parent']} AnyNode
 */

const FUNCTION_TYPES = new Set(['ArrowFunctionExpression', 'FunctionExpression', 'FunctionDeclaration']);

const EXPRESSION_TYPES = new Set([
    'ArrayExpression',
    'AssignmentExpression',
    'AwaitExpression',
    'BinaryExpression',
    'CallExpression',
    'ChainExpression',
    'ConditionalExpression',
    'ImportExpression',
    'LogicalExpression',
    'MemberExpression',
    'NewExpression',
    'ObjectExpression',
    'ParenthesizedExpression',
    'SequenceExpression',
    'TaggedTemplateExpression',
    'TemplateLiteral',
    'TSAsExpression',
    'TSInstantiationExpression',
    'TSNonNullExpression',
    'TSSatisfiesExpression',
    'TSTypeAssertion',
    'UnaryExpression',
    'UpdateExpression',
    'YieldExpression',
]);

/**
 * Strips the parentheses and type-only wrappers that leave the runtime value alone.
 * @param {AnyNode | null | undefined} node
 */
const unwrap = (node) => {
    if (
        node?.type === 'ParenthesizedExpression' ||
        node?.type === 'TSAsExpression' ||
        node?.type === 'TSNonNullExpression' ||
        node?.type === 'TSSatisfiesExpression'
    ) {
        return unwrap(node.expression);
    }
    return node;
};

/** @param {AnyNode | null | undefined} node */
const isEmptyObject = (node) => {
    const value = unwrap(node);
    return value?.type === 'ObjectExpression' && value.properties.length === 0;
};

/** @param {AnyNode | null | undefined} rawNode */
const isEmptyObjectFallback = (rawNode) => {
    const node = unwrap(rawNode);
    if (isEmptyObject(node)) {
        return true;
    }
    return (
        node?.type === 'LogicalExpression' &&
        (node.operator === '??' || node.operator === '||') &&
        isEmptyObject(node.right)
    );
};

/** @param {AnyNode | null | undefined} node */
const propertyName = (node) => {
    if (node?.type === 'Identifier') {
        return node.name;
    }
    if (node?.type === 'Literal' && typeof node.value === 'string') {
        return node.value;
    }
    return undefined;
};

/** @param {AnyNode} node */
const calleeName = (node) => {
    if (node.type !== 'CallExpression') {
        return undefined;
    }
    if (node.callee.type === 'MemberExpression') {
        return propertyName(node.callee.property);
    }
    return propertyName(node.callee);
};

/** @param {AnyNode} node */
const isFunction = (node) => FUNCTION_TYPES.has(node.type);

/**
 * Yields each function that encloses `node`, innermost first.
 * @param {AnyNode} node
 */
function* enclosingFunctions(node) {
    let current = node.parent;
    while (current !== null) {
        if (isFunction(current)) {
            yield current;
        }
        current = current.parent;
    }
}

/** @type {Rule} */
const noEmptyObjectFallback = {
    meta: {
        type: 'problem',
        docs: { description: 'SPEC-rich-text/AC-086: no destructuring from `{}`, `x ?? {}` or `x || {}`' },
    },
    create: (context) => {
        const message =
            'Test the value with `if` and handle the missing case in the open instead of destructuring an empty-object fallback.';
        return {
            VariableDeclarator: (node) => {
                if (node.id.type === 'ObjectPattern' && isEmptyObjectFallback(node.init)) {
                    context.report({ node, message });
                }
            },
            AssignmentPattern: (node) => {
                if (node.left.type === 'ObjectPattern' && isEmptyObjectFallback(node.right)) {
                    context.report({ node, message });
                }
            },
            AssignmentExpression: (node) => {
                if (node.left.type === 'ObjectPattern' && isEmptyObjectFallback(node.right)) {
                    context.report({ node, message });
                }
            },
        };
    },
};

/** @type {Rule} */
const noObjectSpreadMerge = {
    meta: {
        type: 'problem',
        docs: {
            description: 'SPEC-rich-text/AC-087: no object merge through two spreads or a multi-source `Object.assign`',
        },
    },
    create: (context) => ({
        ObjectExpression: (node) => {
            if (node.properties.filter((property) => property.type === 'SpreadElement').length > 1) {
                context.report({
                    node,
                    message: 'Use one spread followed by named fields, never two spreads in one object literal.',
                });
            }
        },
        CallExpression: (node) => {
            const { callee } = node;
            const isAssign =
                callee.type === 'MemberExpression' &&
                propertyName(callee.object) === 'Object' &&
                propertyName(callee.property) === 'assign';
            const sources = node.arguments.slice(1);
            if (isAssign && (sources.length > 1 || sources.some((source) => source.type === 'SpreadElement'))) {
                context.report({
                    node,
                    message:
                        'Use one spread followed by named fields, never `Object.assign` with more than one source.',
                });
            }
        },
    }),
};

/** @type {Rule} */
const oneOptionalPerExpression = {
    meta: {
        type: 'problem',
        docs: { description: 'SPEC-rich-text/AC-088: at most one `?.` or `??` per full expression' },
    },
    create: (context) => {
        /** @type {Map<AnyNode, number>} */
        const counts = new Map();

        /** @param {AnyNode} node */
        const count = (node) => {
            let root = node;
            while (root.parent !== null && EXPRESSION_TYPES.has(root.parent.type)) {
                root = root.parent;
            }
            counts.set(root, (counts.get(root) ?? 0) + 1);
        };

        return {
            MemberExpression: (node) => {
                if (node.optional) {
                    count(node);
                }
            },
            CallExpression: (node) => {
                if (node.optional) {
                    count(node);
                }
            },
            LogicalExpression: (node) => {
                if (node.operator === '??') {
                    count(node);
                }
            },
            'Program:exit': () => {
                for (const [node, total] of counts) {
                    if (total > 1) {
                        context.report({
                            node,
                            message: `This expression holds ${total} of \`?.\` and \`??\`; name the intermediate values or use \`if\` statements.`,
                        });
                    }
                }
            },
        };
    },
};

/** @type {Rule} */
const noEffectsInSelector = {
    meta: {
        type: 'problem',
        docs: { description: 'SPEC-rich-text-react/AC-026: selectors read no DOM geometry and dispatch nothing' },
        schema: [
            {
                type: 'object',
                properties: { hooks: { type: 'array', items: { type: 'string' } } },
                additionalProperties: false,
            },
        ],
    },
    create: (context) => {
        const [options] = context.options;
        const hooks = new Set(/** @type {{ hooks?: string[] } | undefined} */ (options)?.hooks);
        const forbidden = new Set(['getBoundingClientRect', 'execute', 'enqueue']);
        return {
            CallExpression: (node) => {
                const name = calleeName(node);
                if (name === undefined || !forbidden.has(name)) {
                    return;
                }
                for (const fn of enclosingFunctions(node)) {
                    const hook = fn.parent;
                    if (
                        hook !== null &&
                        hook.type === 'CallExpression' &&
                        hook.arguments[0] === fn &&
                        hooks.has(calleeName(hook) ?? '')
                    ) {
                        context.report({
                            node,
                            message: `A selector passed to \`${calleeName(hook)}\` must not call \`${name}\`.`,
                        });
                        return;
                    }
                }
            },
        };
    },
};

const USER_FACING_ATTRIBUTES = new Set([
    'alt',
    'aria-description',
    'aria-label',
    'aria-placeholder',
    'aria-roledescription',
    'aria-valuetext',
    'label',
    'placeholder',
    'title',
]);

/** @param {AnyNode | null | undefined} node */
const isStaticString = (node) => {
    if (node?.type === 'Literal' && typeof node.value === 'string') {
        return /\S/.test(node.value);
    }
    return (
        node?.type === 'TemplateLiteral' && node.expressions.length === 0 && /\S/.test(node.quasis[0]?.value.raw ?? '')
    );
};

/** @type {Rule} */
const noJsxStringLiteral = {
    meta: {
        type: 'problem',
        docs: { description: 'SPEC-rich-text-react/AC-057: every string comes from the package locale' },
    },
    create: (context) => {
        const message = 'Take this string from the package locale through `t(RichTextEditor_<label>)`.';
        return {
            JSXText: (node) => {
                if (/\S/.test(node.value)) {
                    context.report({ node, message });
                }
            },
            JSXExpressionContainer: (node) => {
                if (node.parent.type !== 'JSXAttribute' && isStaticString(node.expression)) {
                    context.report({ node, message });
                }
            },
            JSXAttribute: (node) => {
                if (node.name.type !== 'JSXIdentifier' || !USER_FACING_ATTRIBUTES.has(node.name.name)) {
                    return;
                }
                const value = node.value?.type === 'JSXExpressionContainer' ? node.value.expression : node.value;
                if (isStaticString(value)) {
                    context.report({ node, message });
                }
            },
        };
    },
};

/** @type {Rule} */
const noImageChrome = {
    meta: {
        type: 'problem',
        docs: { description: 'SPEC-rich-text-accessibility/AC-010: chrome icons come from @frontify/fondue-icons' },
    },
    create: (context) => ({
        JSXOpeningElement: (node) => {
            if (node.name.type === 'JSXIdentifier' && (node.name.name === 'img' || node.name.name === 'image')) {
                context.report({
                    node,
                    message: 'Render chrome icons with `@frontify/fondue-icons`, never an image element.',
                });
            }
        },
        Property: (node) => {
            const key = propertyName(node.key);
            const isBackgroundImage =
                key === 'backgroundImage' ||
                (key === 'background' && /url\(|image-set\(/.test(context.sourceCode.getText(node.value)));
            if (isBackgroundImage && node.parent.parent?.type === 'JSXExpressionContainer') {
                context.report({
                    node,
                    message: 'Render chrome icons with `@frontify/fondue-icons`, never a background image.',
                });
            }
        },
    }),
};

const POINTER_HANDLER_ATTRIBUTES = new Set([
    'onMouseDown',
    'onMouseDownCapture',
    'onPointerDown',
    'onPointerDownCapture',
]);
const POINTER_EVENTS = new Set(['mousedown', 'pointerdown']);

/** @param {AnyNode} fn */
const isPointerDownHandler = (fn) => {
    const { parent } = fn;
    if (parent === null) {
        return false;
    }
    if (parent.type === 'JSXExpressionContainer' && parent.parent.type === 'JSXAttribute') {
        const { name } = parent.parent;
        return name.type === 'JSXIdentifier' && POINTER_HANDLER_ATTRIBUTES.has(name.name);
    }
    if (parent.type === 'CallExpression' && calleeName(parent) === 'addEventListener' && parent.arguments[1] === fn) {
        const event = parent.arguments[0];
        return event?.type === 'Literal' && typeof event.value === 'string' && POINTER_EVENTS.has(event.value);
    }
    return false;
};

/** @type {Rule} */
const noPointerPreventDefault = {
    meta: {
        type: 'problem',
        docs: {
            description:
                'SPEC-rich-text-accessibility/AC-027: pointer-down preventDefault only where focus stays in the surface',
        },
    },
    create: (context) => ({
        CallExpression: (node) => {
            if (calleeName(node) !== 'preventDefault') {
                return;
            }
            for (const fn of enclosingFunctions(node)) {
                if (isPointerDownHandler(fn)) {
                    context.report({
                        node,
                        message:
                            'Only bubble toolbar buttons, suggestion options and toolbar items may prevent the default of `pointerdown` or `mousedown`.',
                    });
                    return;
                }
            }
        },
    }),
};

/** @type {Rule} */
const noComposingAssignment = {
    meta: {
        type: 'problem',
        docs: {
            description: 'SPEC-rich-text-quality/AC-012: drive composition through CDP, never by setting `composing`',
        },
    },
    create: (context) => {
        const message =
            'Drive composition through CDP `Input.imeSetComposition` and `Input.insertText`, never by setting `composing`.';
        return {
            AssignmentExpression: (node) => {
                if (node.left.type === 'MemberExpression' && propertyName(node.left.property) === 'composing') {
                    context.report({ node, message });
                }
            },
            CallExpression: (node) => {
                const { callee } = node;
                const isDefineProperty =
                    callee.type === 'MemberExpression' &&
                    propertyName(callee.object) === 'Object' &&
                    propertyName(callee.property) === 'defineProperty';
                if (isDefineProperty && propertyName(node.arguments[1]) === 'composing') {
                    context.report({ node, message });
                }
            },
        };
    },
};

const VIEW_INTERNALS = new Set(['input', 'domObserver']);

/**
 * Reports a read of `input` or `domObserver` by name on any value, member, bracket or destructure, since a view
 * reaches code under any name and the plugin has no types.
 * @type {Rule}
 */
const noViewInternals = {
    meta: {
        type: 'problem',
        docs: { description: 'SPEC-rich-text/AC-095: no read of the editor view input state or DOM observer' },
    },
    create: (context) => {
        const message = 'Read no `input` or `domObserver` of the editor view; they are ProseMirror internals.';
        return {
            MemberExpression: (node) => {
                // A computed key counts only as a string literal, since `view[name]` names a variable.
                if (node.computed && node.property.type !== 'Literal') {
                    return;
                }
                if (VIEW_INTERNALS.has(propertyName(node.property) ?? '')) {
                    context.report({ node, message });
                }
            },
            Property: (node) => {
                if (node.parent.type === 'ObjectPattern' && VIEW_INTERNALS.has(propertyName(node.key) ?? '')) {
                    context.report({ node, message });
                }
            },
        };
    },
};

export default {
    meta: { name: 'rte-style' },
    rules: {
        'no-composing-assignment': noComposingAssignment,
        'no-effects-in-selector': noEffectsInSelector,
        'no-empty-object-fallback': noEmptyObjectFallback,
        'no-image-chrome': noImageChrome,
        'no-jsx-string-literal': noJsxStringLiteral,
        'no-object-spread-merge': noObjectSpreadMerge,
        'no-pointer-prevent-default': noPointerPreventDefault,
        'no-view-internals': noViewInternals,
        'one-optional-per-expression': oneOptionalPerExpression,
    },
};
