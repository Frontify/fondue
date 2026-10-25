/* (c) Copyright Frontify Ltd., all rights reserved. */

/* oxlint-disable typescript/no-unsafe-assignment, typescript/no-unsafe-call, typescript/no-unsafe-member-access -- the app's packages and shared document exist only in its scratch install */

import { readFileSync, writeFileSync } from 'node:fs';

import { commentModel } from '@frontify/fondue-rich-text-editor/features';
import { RichTextReader } from '@frontify/fondue-rich-text-editor/reader';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { storedDocument } from './document.js';

// The reader renders on the server into the built page, which the client then hydrates.
const reader = renderToString(createElement(RichTextReader, { document: storedDocument, model: commentModel }));
const page = readFileSync('dist/index.html', 'utf8');
writeFileSync('dist/index.html', page.replace('<!--reader-->', reader));

/* oxlint-enable typescript/no-unsafe-assignment, typescript/no-unsafe-call, typescript/no-unsafe-member-access */
