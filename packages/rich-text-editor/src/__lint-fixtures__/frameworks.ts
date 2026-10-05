/* (c) Copyright Frontify Ltd., all rights reserved. */

// SPEC-rich-text/AC-077: one import per framework pattern.
// expect-lint: eslint(no-restricted-imports)
import 'next';
// expect-lint: eslint(no-restricted-imports)
import 'next/router';
// expect-lint: eslint(no-restricted-imports)
import 'react-router-dom';
// expect-lint: eslint(no-restricted-imports)
import '@remix-run/react';
// expect-lint: eslint(no-restricted-imports)
import 'react-server-dom-webpack/client';
