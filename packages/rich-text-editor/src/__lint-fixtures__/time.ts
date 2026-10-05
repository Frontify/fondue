/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text-quality/AC-002: time, IDs, randomness and scheduling outside `RuntimeEnvironment`.
export const time = [
    // expect-lint: eslint(no-restricted-globals)
    Date,
    // expect-lint: eslint(no-restricted-globals)
    setTimeout,
    // expect-lint: eslint(no-restricted-globals)
    setInterval,
    // expect-lint: eslint(no-restricted-globals)
    clearTimeout,
    // expect-lint: eslint(no-restricted-globals)
    queueMicrotask,
    // expect-lint: eslint(no-restricted-globals)
    requestAnimationFrame,
    // expect-lint: eslint(no-restricted-globals)
    requestIdleCallback,
    // expect-lint: eslint(no-restricted-globals)
    crypto,
    // expect-lint: eslint(no-restricted-properties)
    Math.random,
    // expect-lint: eslint(no-restricted-properties)
    performance.now,
    // expect-lint: eslint(no-restricted-properties)
    globalThis.setTimeout,
    // expect-lint: eslint(no-restricted-properties)
    window.queueMicrotask,
];
