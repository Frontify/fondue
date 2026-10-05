/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-051: one use per host-owned capability.
export const network = [
    // expect-lint: eslint(no-restricted-globals)
    fetch,
    // expect-lint: eslint(no-restricted-globals)
    XMLHttpRequest,
    // expect-lint: eslint(no-restricted-globals)
    WebSocket,
    // expect-lint: eslint(no-restricted-globals)
    EventSource,
    // expect-lint: eslint(no-restricted-globals)
    localStorage,
    // expect-lint: eslint(no-restricted-globals)
    sessionStorage,
    // expect-lint: eslint(no-restricted-globals)
    indexedDB,
    // expect-lint: eslint(no-restricted-properties)
    navigator.sendBeacon,
    // expect-lint: eslint(no-restricted-properties)
    document.cookie,
    // expect-lint: eslint(no-restricted-properties)
    globalThis.fetch,
];
