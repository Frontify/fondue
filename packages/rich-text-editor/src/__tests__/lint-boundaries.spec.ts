/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, realpath, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const run = promisify(execFile);

const PACKAGE_ROOT = fileURLToPath(new URL('../../', import.meta.url));

const RULE = 'eslint(no-restricted-imports)';

interface Case {
    readonly name: string;
    readonly file: string;
    readonly source: string;
    readonly banned: boolean;
}

interface Diagnostic {
    readonly code: string;
    readonly filename: string;
    readonly labels: readonly { readonly span: { readonly line: number } }[];
}

const banned = (name: string, file: string, source: string): Case => ({ name, file, source, banned: true });

const allowed = (name: string, file: string, source: string): Case => ({ name, file, source, banned: false });

// One import per line, so a reported line is the verdict for that import alone. A case sits on the line after the
// earlier cases of its file, and the names of a shared file differ, as a repeated name is a syntax error.
const CASES: readonly Case[] = [
    // Base rules of every source file
    banned('base: a framework router', 'src/ui/framework.ts', "import { useRouter } from 'next/router';"),
    allowed('base: react', 'src/ui/react.ts', "import { memo } from 'react';"),
    banned('base: flushSync', 'src/ui/flush-sync.ts', "import { flushSync } from 'react-dom';"),
    allowed('base: another react-dom export', 'src/ui/portal.ts', "import { createPortal } from 'react-dom';"),
    banned(
        'base: prosemirror-history outside runtime/history',
        'src/ui/history.ts',
        "import { history } from 'prosemirror-history';",
    ),
    allowed('base: prosemirror-state', 'src/runtime/state.ts', "import { EditorState } from 'prosemirror-state';"),
    banned(
        'base: an underscore export of prosemirror-tables',
        'src/ui/tables-internals.ts',
        "import { _insert } from 'prosemirror-tables';",
    ),
    allowed(
        'base: a public export of prosemirror-tables',
        'src/runtime/tables-public.ts',
        "import { tableEditing } from 'prosemirror-tables';",
    ),
    allowed(
        'base: a layer override skips tests',
        'src/model/__tests__/layers.ts',
        "import { run } from '#/runtime/run';",
    ),
    banned(
        'base: the base rules still hold in tests',
        'src/model/__tests__/framework.ts',
        "import { useRouter } from 'next/router';",
    ),

    // model
    banned('model: another layer by alias', 'src/model/alias.ts', "import { run } from '#/runtime/run';"),
    banned('model: another layer by relative path', 'src/model/relative.ts', "import { run } from '../runtime/run';"),
    banned('model: the engine', 'src/model/engine.ts', "import { Schema } from 'prosemirror-model';"),
    banned('model: react', 'src/model/react.ts', "import { memo } from 'react';"),
    allowed('model: a sibling file', 'src/model/sibling.ts', "import { node } from './node';"),

    // model files outside the model folder
    banned('model files: a model file', 'src/ui/model-file.ts', "import { node } from '#/model/node';"),
    allowed('model files: the internal barrel', 'src/ui/model-internal.ts', "import { node } from '#/model/internal';"),

    // definition
    banned('definition: a later layer', 'src/definition/layer.ts', "import { run } from '#/runtime/run';"),
    banned('definition: react', 'src/definition/react.ts', "import { memo } from 'react';"),
    allowed('definition: model', 'src/definition/model.ts', "import { node } from '#/model';"),
    allowed('definition: the engine model', 'src/definition/engine.ts', "import { Schema } from 'prosemirror-model';"),
    allowed('definition: a sibling file', 'src/definition/sibling.ts', "import { schema } from './schema';"),

    // definition/schema
    banned('schema: a sibling file', 'src/definition/schema.ts', "import { other } from './other';"),
    banned(
        'schema: the rest of the definition',
        'src/definition/schema.ts',
        "import { shared } from '#/definition/shared';",
    ),
    allowed('schema: model', 'src/definition/schema.ts', "import { node } from '#/model';"),
    banned('schema: the engine view', 'src/definition/schema.ts', "import { EditorView } from 'prosemirror-view';"),
    allowed('schema: prosemirror-model', 'src/definition/schema.ts', "import { Schema } from 'prosemirror-model';"),

    // clipboard/import
    banned('clipboard/import: another layer', 'src/clipboard/import/layer.ts', "import { run } from '#/runtime/run';"),
    banned(
        'clipboard/import: the clipboard plugin',
        'src/clipboard/import/plugin.ts',
        "import { plugin } from '#/runtime/clipboard/plugin';",
    ),
    banned(
        'clipboard/import: the engine view',
        'src/clipboard/import/view.ts',
        "import { EditorView } from 'prosemirror-view';",
    ),
    banned('clipboard/import: react', 'src/clipboard/import/react.ts', "import { memo } from 'react';"),
    allowed('clipboard/import: model', 'src/clipboard/import/model.ts', "import { node } from '#/model';"),
    allowed(
        'clipboard/import: prosemirror-model',
        'src/clipboard/import/engine.ts',
        "import { Slice } from 'prosemirror-model';",
    ),
    allowed('clipboard/import: a sibling file', 'src/clipboard/import/sibling.ts', "import { parse } from './parse';"),
    allowed(
        'clipboard/import: itself by alias',
        'src/clipboard/import/alias.ts',
        "import { parse } from '#/clipboard/import';",
    ),

    // clipboard engine files
    banned(
        'runtime/clipboard: react by alias',
        'src/runtime/clipboard/react.ts',
        "import { Editor } from '#/react/editor';",
    ),
    banned('runtime/clipboard: ui by alias', 'src/runtime/clipboard/ui.ts', "import { Toolbar } from '#/ui/toolbar';"),
    banned(
        'runtime/clipboard: ui by relative path',
        'src/runtime/clipboard/relative.ts',
        "import { Toolbar } from '../../ui/toolbar';",
    ),
    banned('runtime/clipboard: react', 'src/runtime/clipboard/package.ts', "import { memo } from 'react';"),
    allowed(
        'runtime/clipboard: runtime/history',
        'src/runtime/clipboard/history.ts',
        "import { run } from '#/runtime/history';",
    ),
    allowed('runtime/clipboard: model', 'src/runtime/clipboard/model.ts', "import { node } from '#/model';"),
    allowed('runtime/clipboard: codecs', 'src/runtime/clipboard/codecs.ts', "import { planOf } from '#/codecs/plan';"),
    allowed(
        'runtime/clipboard: clipboard/import',
        'src/runtime/clipboard/import.ts',
        "import { parse } from '#/clipboard/import';",
    ),
    banned(
        'runtime/clipboard: persistence',
        'src/runtime/clipboard/persistence.ts',
        "import { save } from '#/persistence/save';",
    ),
    banned(
        'clipboard/import: runtime/history, which its parent folder may import',
        'src/clipboard/import/history.ts',
        "import { run } from '#/runtime/history';",
    ),

    // html
    banned('html: another layer', 'src/html/layer.ts', "import { run } from '#/runtime/run';"),
    banned('html: the engine view', 'src/html/view.ts', "import { EditorView } from 'prosemirror-view';"),
    banned('html: the rest of the definition', 'src/html/definition.ts', "import { other } from '#/definition/other';"),
    allowed('html: the schema', 'src/html/schema.ts', "import { schema } from '#/definition/schema';"),
    allowed('html: clipboard/import', 'src/html/import.ts', "import { parse } from '#/clipboard/import';"),
    allowed('html: prosemirror-model', 'src/html/engine.ts', "import { Slice } from 'prosemirror-model';"),
    allowed('html: model', 'src/html/model.ts', "import { node } from '#/model';"),

    // feature.ts and migration.ts
    banned('feature file: a model subpath', 'src/features/bold/feature.ts', "import { node } from '#/model/node';"),
    banned('feature file: its view', 'src/features/bold/migration.ts', "import { view } from './view';"),
    banned(
        'feature file: another feature view',
        'src/features/bold/feature.ts',
        "import { view } from '#/features/italic/view';",
    ),
    banned('feature file: another layer', 'src/features/italic/feature.ts', "import { run } from '#/runtime/run';"),
    banned('feature file: a package', 'src/features/link/feature.ts', "import { memo } from 'react';"),
    allowed('feature file: the model entry', 'src/features/list/feature.ts', "import { node } from '#/model';"),
    allowed('feature file: its migration', 'src/features/table/feature.ts', "import { migrate } from './migration';"),
    allowed(
        'feature file: a dependency feature',
        'src/features/image/feature.ts',
        "import { feature } from '#/features/link/feature';",
    ),

    // feature editor files
    banned('editor part: another layer', 'src/features/bold/view.tsx', "import { run } from '#/runtime/run';"),
    banned(
        'editor part: another feature',
        'src/features/bold/toolbar.tsx',
        "import { feature } from '#/features/italic/feature';",
    ),
    banned('editor part: a model subpath', 'src/features/bold/model.tsx', "import { node } from '#/model/node';"),
    banned(
        'editor part: the engine',
        'src/features/bold/engine.tsx',
        "import { EditorState } from 'prosemirror-state';",
    ),
    banned('editor part: a Node built-in', 'src/features/bold/node.tsx', "import { readFile } from 'node:fs';"),
    banned('editor part: a parent folder', 'src/features/bold/parent.tsx', "import { other } from '../italic/view';"),
    allowed(
        'editor part: the plugin bridge',
        'src/features/bold/plugin.tsx',
        "import { definePlugin } from '#/bridge/plugin';",
    ),
    allowed(
        'editor part: the define bridge',
        'src/features/bold/define.tsx',
        "import { defineView } from '#/bridge/define';",
    ),
    allowed('editor part: model', 'src/features/bold/entry.tsx', "import { node } from '#/model';"),
    allowed('editor part: react', 'src/features/bold/react.tsx', "import { memo } from 'react';"),
    allowed(
        'editor part: fondue components',
        'src/features/bold/components.tsx',
        "import { Button } from '@frontify/fondue-components';",
    ),
    allowed('editor part: its own folder', 'src/features/bold/folder.tsx', "import { icon } from './icon';"),

    // feature wiring
    banned('wiring: a view', 'src/features/registry.ts', "import { view } from '#/features/bold/view';"),
    banned('wiring: a reader', 'src/features/index.ts', "import { reader } from '#/features/bold/reader';"),
    banned('wiring: a model subpath', 'src/features/profiles/model.ts', "import { node } from '#/model/node';"),
    banned('wiring: another layer', 'src/features/profiles/layer.ts', "import { run } from '#/runtime/run';"),
    banned('wiring: react', 'src/features/profiles/react.tsx', "import { memo } from 'react';"),
    allowed('wiring: model', 'src/features/profiles/entry.ts', "import { node } from '#/model';"),
    allowed(
        'wiring: a feature file',
        'src/features/profiles/feature.ts',
        "import { feature } from '#/features/bold/feature';",
    ),
    allowed('wiring: the registry', 'src/features/profiles/registry.ts', "import { registry } from '../registry';"),

    // feature reader.tsx
    banned('feature reader: another layer', 'src/features/bold/reader.tsx', "import { run } from '#/runtime/run';"),
    banned('feature reader: a model subpath', 'src/features/italic/reader.tsx', "import { node } from '#/model/node';"),
    banned('feature reader: its view', 'src/features/link/reader.tsx', "import { view } from './view';"),
    banned(
        'feature reader: a feature view',
        'src/features/list/reader.tsx',
        "import { view } from '#/features/bold/view';",
    ),
    banned(
        'feature reader: the engine',
        'src/features/table/reader.tsx',
        "import { EditorState } from 'prosemirror-state';",
    ),
    banned('feature reader: a Node built-in', 'src/features/image/reader.tsx', "import { readFile } from 'node:fs';"),
    allowed('feature reader: react', 'src/features/code/reader.tsx', "import { memo } from 'react';"),
    allowed('feature reader: model', 'src/features/quote/reader.tsx', "import { node } from '#/model';"),
    allowed(
        'feature reader: the reader define entry',
        'src/features/heading/reader.tsx',
        "import { defineReader } from '#/reader/define';",
    ),
    allowed('feature reader: its feature', 'src/features/divider/reader.tsx', "import { feature } from './feature';"),
    allowed(
        'feature reader: a dependency feature',
        'src/features/emoji/reader.tsx',
        "import { feature } from '#/features/link/feature';",
    ),

    // feature index.ts
    banned('feature index: another layer', 'src/features/bold/index.ts', "import { run } from '#/runtime/run';"),
    banned('feature index: the model', 'src/features/bold/index.ts', "import { node } from '#/model';"),
    banned(
        'feature index: another bridge module',
        'src/features/bold/index.ts',
        "import { define } from '#/bridge/define';",
    ),
    banned('feature index: its migration', 'src/features/bold/index.ts', "import { migrate } from './migration';"),
    banned('feature index: its view', 'src/features/bold/index.ts', "import { view } from './view';"),
    banned(
        'feature index: another feature',
        'src/features/bold/index.ts',
        "import { italic } from '../italic/feature';",
    ),
    banned(
        'feature index: another feature by alias',
        'src/features/bold/index.ts',
        "import { italicPlugin } from '#/features/italic';",
    ),
    banned('feature index: react', 'src/features/bold/index.ts', "import { memo } from 'react';"),
    banned('feature index: a Node built-in', 'src/features/bold/index.ts', "import { readFile } from 'node:fs';"),
    allowed(
        'feature index: the plugin definer',
        'src/features/bold/index.ts',
        "import { definePlugin } from '#/bridge/definePlugin';",
    ),
    allowed('feature index: its editor part', 'src/features/bold/index.ts', "import { boldEditor } from './editor';"),
    allowed('feature index: its feature', 'src/features/bold/index.ts', "import { bold } from './feature';"),
    allowed('feature index: its reader', 'src/features/bold/index.ts', "import { boldReader } from './reader';"),

    // feature plugins registry
    banned('feature plugins: another layer', 'src/features/plugins.ts', "import { run } from '#/runtime/run';"),
    banned('feature plugins: a model subpath', 'src/features/plugins.ts', "import { node } from '#/model/node';"),
    banned(
        'feature plugins: another bridge module',
        'src/features/plugins.ts',
        "import { define } from '#/bridge/define';",
    ),
    banned('feature plugins: a feature file', 'src/features/plugins.ts', "import { bold } from './bold/feature';"),
    banned(
        'feature plugins: a feature editor part',
        'src/features/plugins.ts',
        "import { boldEditor } from './bold/editor';",
    ),
    banned('feature plugins: the registry', 'src/features/plugins.ts', "import { registry } from './registry';"),
    banned(
        'feature plugins: a feature by alias',
        'src/features/plugins.ts',
        "import { boldPlugin } from '#/features/bold';",
    ),
    banned('feature plugins: react', 'src/features/plugins.ts', "import { memo } from 'react';"),
    allowed('feature plugins: the model', 'src/features/plugins.ts', "import { DefinitionError } from '#/model';"),
    allowed(
        'feature plugins: the plugin definer',
        'src/features/plugins.ts',
        "import { type RichTextPlugin } from '#/bridge/definePlugin';",
    ),
    allowed('feature plugins: a feature index', 'src/features/plugins.ts', "import { boldIndex } from './bold/index';"),

    // feature fixtures
    banned(
        'feature fixtures: a model subpath',
        'src/features/bold/fixtures/subpath.ts',
        "import { node } from '#/model/node';",
    ),
    banned(
        'feature fixtures: the model folder by relative path',
        'src/features/bold/fixtures/relative.ts',
        "import { node } from '../../../model/node';",
    ),
    allowed(
        'feature fixtures: the model entry',
        'src/features/bold/fixtures/entry.ts',
        "import { node } from '#/model';",
    ),

    // feature internals outside the feature folder
    banned(
        'internals: an editor part',
        'src/react/editor-part.ts',
        "import { boldEditor } from '#/features/bold/editor';",
    ),
    banned('internals: a reader', 'src/react/reader-part.ts', "import { boldReader } from '#/features/bold/reader';"),
    banned(
        'internals: a view by relative path',
        'src/react/view-part.ts',
        "import { view } from '../features/bold/view';",
    ),
    banned('internals: a dialog', 'src/ui/dialog-part.ts', "import { dialog } from '#/features/link/link-dialog';"),
    banned(
        'internals: a migration',
        'src/ui/migration-part.ts',
        "import { migrate } from '#/features/bold/migration';",
    ),
    banned(
        'internals: a nested file',
        'src/testing/nested.ts',
        "import { toolbar } from '#/features/bold/parts/toolbar';",
    ),
    banned(
        'internals: an editor part inside conformance',
        'src/testing/conformance/editor-part.ts',
        "import { boldEditor } from '#/features/bold/editor';",
    ),
    banned(
        'internals: a file beside the entry',
        'src/internals.ts',
        "import { boldEditor } from '#/features/bold/editor';",
    ),
    allowed(
        'internals: a feature file',
        'src/react/feature-file.ts',
        "import { bold } from '#/features/bold/feature';",
    ),
    allowed(
        'internals: a feature index',
        'src/react/feature-index.ts',
        "import { boldPlugin } from '#/features/bold/index';",
    ),
    allowed(
        'internals: a feature folder',
        'src/react/feature-folder.ts',
        "import { boldPlugin } from '#/features/bold';",
    ),
    allowed(
        'internals: a shipped profile',
        'src/react/profile.ts',
        "import { commentModel } from '#/features/profiles/comment';",
    ),
    allowed(
        'internals: a feature fixture',
        'src/testing/fixture.ts',
        "import bold from '#/features/bold/fixtures/bold.json';",
    ),
    allowed('internals: the feature registry', 'src/index.ts', "import { registry } from '#/features/registry';"),
    allowed(
        'internals: a test',
        'src/react/__tests__/editor-part.ts',
        "import { boldEditor } from '#/features/bold/editor';",
    ),
    allowed(
        'internals: the units registry glob',
        'src/features/plugins.ts',
        "const unitModules = import.meta.glob('./*/index.ts', { eager: true });",
    ),
    allowed(
        'internals: the feature registry glob',
        'src/features/registry.ts',
        "const featureModules = import.meta.glob('./*/feature.ts', { eager: true });",
    ),
    allowed(
        'internals: the shipped readers glob',
        'src/entries/shippedReaders.ts',
        "const readerModules = import.meta.glob('../features/*/reader.tsx', { eager: true });",
    ),

    // feature units in the server side layers
    banned('units: model', 'src/model/unit.ts', "import { boldPlugin } from '#/features/bold/index';"),
    banned('units: html', 'src/html/unit.ts', "import { boldPlugin } from '#/features/bold/index';"),
    banned('units: reader', 'src/reader/unit.ts', "import { boldPlugin } from '#/features/bold/index';"),
    banned(
        'units: reader by relative path',
        'src/reader/unit-relative.ts',
        "import { boldPlugin } from '../features/bold/index';",
    ),
    banned('units: codecs', 'src/codecs/unit.ts', "import { boldPlugin } from '#/features/bold/index';"),
    banned('units: the features entry', 'src/features/index.ts', "import { boldPlugin } from '#/features/bold/index';"),
    banned(
        'units: another features file',
        'src/features/stages.ts',
        "import { boldPlugin } from '#/features/bold/index';",
    ),
    allowed(
        'units: a feature file in another features file',
        'src/features/stages.ts',
        "import { bold } from '#/features/bold/feature';",
    ),

    // reader
    banned('reader: another layer', 'src/reader/layer.ts', "import { run } from '#/runtime/run';"),
    banned('reader: the engine', 'src/reader/engine.ts', "import { Schema } from 'prosemirror-model';"),
    banned('reader: a feature file', 'src/reader/feature.ts', "import { feature } from '#/features/bold/feature';"),
    banned('reader: a feature view', 'src/reader/view.ts', "import { view } from '#/features/bold/view';"),
    banned('reader: the feature registry', 'src/reader/registry.ts', "import { registry } from '#/features/registry';"),
    banned('reader: a client hook', 'src/reader/hook.tsx', "import { useState } from 'react';"),
    banned('reader: the react default export', 'src/reader/default.tsx', "import React from 'react';"),
    allowed('reader: a server safe react export', 'src/reader/server.tsx', "import { Fragment } from 'react';"),
    allowed('reader: model', 'src/reader/model.ts', "import { node } from '#/model';"),
    allowed('reader: locales', 'src/reader/locales.ts', "import { en } from '#/locales/en';"),
    banned(
        'reader: a feature reader',
        'src/reader/feature-reader.ts',
        "import { reader } from '#/features/bold/reader';",
    ),
    banned(
        'reader: a feature reader by a relative path',
        'src/reader/feature-reader-relative.ts',
        "import { reader } from '../features/bold/reader';",
    ),
    banned('reader: an entry module', 'src/reader/entry.ts', "import { RichTextReader } from '#/entries/reader';"),
    allowed('reader: a sibling file', 'src/reader/sibling.ts', "import { render } from './render';"),

    // entries
    banned('entries: another layer', 'src/entries/layer.ts', "import { run } from '#/runtime/run';"),
    banned('entries: model', 'src/entries/model.ts', "import { node } from '#/model';"),
    banned('entries: the engine', 'src/entries/engine.ts', "import { Schema } from 'prosemirror-model';"),
    banned('entries: a feature file', 'src/entries/feature.ts', "import { feature } from '#/features/bold/feature';"),
    banned('entries: a feature view', 'src/entries/view.ts', "import { view } from '#/features/bold/view';"),
    banned(
        'entries: the feature registry',
        'src/entries/registry.ts',
        "import { registry } from '#/features/registry';",
    ),
    banned('entries: a client hook', 'src/entries/hook.tsx', "import { useState } from 'react';"),
    allowed('entries: a server safe react export', 'src/entries/server.tsx', "import { Fragment } from 'react';"),
    allowed('entries: a reader module', 'src/entries/reader-module.ts', "import { render } from '#/reader/render';"),
    allowed(
        'entries: a feature reader',
        'src/entries/feature-reader.ts',
        "import { reader } from '#/features/bold/reader';",
    ),
    allowed('entries: a sibling file', 'src/entries/sibling.ts', "import { overrides } from './shipped-readers';"),

    // codecs
    banned('codecs: another layer', 'src/codecs/layer.ts', "import { run } from '#/runtime/run';"),
    banned('codecs: react', 'src/codecs/react.ts', "import { memo } from 'react';"),
    banned('codecs: the engine', 'src/codecs/engine.ts', "import { Schema } from 'prosemirror-model';"),
    banned('codecs: a feature', 'src/codecs/feature.ts', "import { feature } from '#/features/bold/feature';"),
    allowed('codecs: model', 'src/codecs/model.ts', "import { node } from '#/model';"),
    allowed('codecs: locales', 'src/codecs/locales.ts', "import { en } from '#/locales/en';"),
    allowed('codecs: a sibling file', 'src/codecs/sibling.ts', "import { encode } from './encode';"),

    // locales
    banned('locales: model', 'src/locales/model.ts', "import { node } from '#/model';"),
    banned('locales: react', 'src/locales/react.ts', "import { memo } from 'react';"),
    allowed('locales: a sibling file', 'src/locales/sibling.ts', "import { en } from './en';"),

    // testing
    banned('testing: the react layer', 'src/testing/react.ts', "import { Editor } from '#/react/editor';"),
    banned('testing: a feature view', 'src/testing/view.ts', "import { view } from '#/features/bold/view';"),
    banned(
        'testing: another clipboard module',
        'src/testing/clipboard.ts',
        "import { copy } from '#/runtime/clipboard/copy';",
    ),
    banned('testing: react', 'src/testing/engine-react.ts', "import { memo } from 'react';"),
    banned('testing: the engine', 'src/testing/engine.ts', "import { EditorState } from 'prosemirror-state';"),
    allowed('testing: runtime', 'src/testing/runtime.ts', "import { run } from '#/runtime/run';"),
    allowed(
        'testing: the clipboard plugin',
        'src/testing/plugin.ts',
        "import { plugin } from '#/runtime/clipboard/plugin';",
    ),
    allowed(
        'testing: feature conformance',
        'src/testing/conformance.ts',
        "import { check } from '#/testing/conformance/check';",
    ),
    allowed('testing: model', 'src/testing/model.ts', "import { node } from '#/model';"),
    allowed('testing: an entry module', 'src/testing/entry.ts', "import { RichTextReader } from '#/entries/reader';"),
    allowed(
        'testing: the engine inside conformance',
        'src/testing/conformance/x.ts',
        "import { editorEngine } from '#/react/engine';",
    ),
    banned(
        'testing: prosemirror-state inside conformance',
        'src/testing/conformance/x.ts',
        "import { EditorState } from 'prosemirror-state';",
    ),
    banned(
        'testing: the units registry outside conformance',
        'src/testing/units.ts',
        "import { pluginsById } from '#/features/plugins';",
    ),
    allowed(
        'testing: the units registry inside conformance',
        'src/testing/conformance/units.ts',
        "import { pluginsById } from '#/features/plugins';",
    ),
    banned(
        'testing: the unit cover check inside conformance',
        'src/testing/conformance/shipped.ts',
        "import { checkCover } from '#/react/units';",
    ),
    banned(
        'testing: the engine outside conformance',
        'src/testing/x.ts',
        "import { editorEngine } from '#/react/engine';",
    ),

    // runtime
    banned('runtime: the react layer', 'src/runtime/react-layer.ts', "import { Editor } from '#/react/editor';"),
    banned('runtime: persistence by alias', 'src/runtime/alias.ts', "import { save } from '#/persistence/save';"),
    banned(
        'runtime: persistence by relative path',
        'src/runtime/relative.ts',
        "import { save } from '../persistence/save';",
    ),
    banned('runtime: the clipboard plugin', 'src/runtime/plugin.ts', "import { plugin } from '#/clipboard/plugin';"),
    banned('runtime: react', 'src/runtime/react.ts', "import { memo } from 'react';"),
    banned(
        'runtime: prosemirror-history outside runtime/history',
        'src/runtime/history.ts',
        "import { history } from 'prosemirror-history';",
    ),
    allowed('runtime: definition', 'src/runtime/definition.ts', "import { schema } from '#/definition/schema';"),
    allowed('runtime: clipboard/import', 'src/runtime/import.ts', "import { parse } from '#/clipboard/import';"),
    allowed('runtime: the engine', 'src/runtime/engine.ts', "import { EditorState } from 'prosemirror-state';"),
    allowed('runtime: model', 'src/runtime/model.ts', "import { node } from '#/model';"),

    // runtime/history
    allowed(
        'runtime/history: prosemirror-history',
        'src/runtime/history/history.ts',
        "import { history } from 'prosemirror-history';",
    ),
    banned(
        'runtime/history: persistence',
        'src/runtime/history/persistence.ts',
        "import { save } from '../../persistence/save';",
    ),
    banned('runtime/history: react', 'src/runtime/history/react.ts', "import { memo } from 'react';"),
    banned(
        'runtime/history: a framework',
        'src/runtime/history/framework.ts',
        "import { useRouter } from 'next/router';",
    ),
    banned('runtime/history: flushSync', 'src/runtime/history/flush-sync.ts', "import { flushSync } from 'react-dom';"),
    banned(
        'runtime/history: a prosemirror-tables internal',
        'src/runtime/history/tables.ts',
        "import { _insert } from 'prosemirror-tables';",
    ),
    allowed(
        'runtime/history: the engine',
        'src/runtime/history/state.ts',
        "import { EditorState } from 'prosemirror-state';",
    ),

    // bridge
    banned('bridge: the react layer', 'src/bridge/react-layer.ts', "import { Editor } from '#/react/editor';"),
    banned('bridge: the ui layer', 'src/bridge/ui.ts', "import { Toolbar } from '#/ui/toolbar';"),
    banned('bridge: prosemirror-state', 'src/bridge/engine.ts', "import { EditorState } from 'prosemirror-state';"),
    allowed('bridge: runtime', 'src/bridge/runtime.ts', "import { run } from '#/runtime/run';"),
    banned(
        'bridge: the clipboard plugin',
        'src/bridge/clipboard.ts',
        "import { plugin } from '#/runtime/clipboard/plugin';",
    ),
    allowed('bridge: persistence', 'src/bridge/persistence.ts', "import { save } from '#/persistence/save';"),
    banned('bridge: prosemirror-view', 'src/bridge/view.ts', "import { EditorView } from 'prosemirror-view';"),
    banned('bridge: prosemirror-model', 'src/bridge/model.ts', "import { Schema } from 'prosemirror-model';"),
    allowed('bridge: react', 'src/bridge/react.ts', "import { memo } from 'react';"),

    // react
    banned('react: the testing layer', 'src/react/testing.tsx', "import { render } from '#/testing/render';"),
    banned('react: react-dom', 'src/react/dom.tsx', "import { createRoot } from 'react-dom/client';"),
    banned('react: the engine', 'src/react/engine.tsx', "import { EditorView } from 'prosemirror-view';"),
    allowed('react: the runtime port', 'src/react/port.tsx', "import { type EditorPort } from '#/runtime/port';"),
    banned('react: another runtime module', 'src/react/runtime.tsx', "import { run } from '#/runtime/run';"),
    banned(
        'react: another runtime module by relative path',
        'src/react/runtime-relative.tsx',
        "import { run } from '../runtime/run';",
    ),
    banned(
        'react: the port engine file',
        'src/react/port-engine.tsx',
        "import { engineOf } from '#/runtime/portEngine';",
    ),
    banned('react: the runtime assembly', 'src/react/foo.ts', "import { createPort } from '#/runtime/assembly';"),
    allowed(
        'react: the runtime assembly in the engine compiler',
        'src/react/compile-editor.ts',
        "import { createPort } from '#/runtime/assembly';",
    ),
    allowed('react: react', 'src/react/react.tsx', "import { memo } from 'react';"),

    // persistence
    banned('persistence: the bridge layer', 'src/persistence/bridge.ts', "import { bridge } from '#/bridge/bridge';"),
    banned('persistence: react', 'src/persistence/react.ts', "import { memo } from 'react';"),
    banned(
        'persistence: the clipboard plugin',
        'src/persistence/clipboard.ts',
        "import { plugin } from '#/runtime/clipboard/plugin';",
    ),
    banned('persistence: the engine', 'src/persistence/engine.ts', "import { EditorView } from 'prosemirror-view';"),
    allowed('persistence: runtime', 'src/persistence/runtime.ts', "import { run } from '#/runtime/run';"),
    allowed('persistence: model', 'src/persistence/model.ts', "import { node } from '#/model';"),

    // stories
    banned('stories: another layer', 'src/ui/layer.stories.tsx', "import { run } from '#/runtime/run';"),
    banned('stories: a model subpath', 'src/ui/subpath.stories.tsx', "import { node } from '#/model/node';"),
    banned('stories: a parent folder', 'src/ui/parent.stories.tsx', "import { Toolbar } from '../toolbar';"),
    banned('stories: the engine', 'src/ui/engine.stories.tsx', "import { EditorState } from 'prosemirror-state';"),
    banned('stories: a Node built-in', 'src/ui/node.stories.tsx', "import { readFile } from 'node:fs';"),
    allowed('stories: a public entry', 'src/ui/entry.stories.tsx', "import { node } from '#/model';"),
    allowed(
        'stories: the plugin bridge',
        'src/ui/plugin.stories.tsx',
        "import { definePlugin } from '#/bridge/plugin';",
    ),
    allowed(
        'stories: the shared examples',
        'src/ui/examples.stories.tsx',
        "import { example } from '#/react/examples/basic';",
    ),
    allowed('stories: its own folder', 'src/ui/folder.stories.tsx', "import { Toolbar } from './toolbar';"),
    allowed('stories: react', 'src/ui/react.stories.tsx', "import { memo } from 'react';"),
    allowed('stories: storybook', 'src/ui/storybook.stories.tsx', "import { fn } from 'storybook/test';"),
    allowed(
        'stories: a storybook package',
        'src/ui/framework.stories.tsx',
        "import type { Meta } from '@storybook/react-vite';",
    ),

    // ui
    banned(
        'ui: a value import of the runtime module',
        'src/ui/runtime.ts',
        "import { createRuntime } from '#/runtime/runtime';",
    ),
    banned(
        'ui: a value import of the runtime module by relative path',
        'src/ui/runtime-relative.ts',
        "import { createRuntime } from '../runtime/runtime';",
    ),
    banned(
        'ui: a type import of the runtime module',
        'src/ui/runtime-type.ts',
        "import type { EditorRuntime } from '#/runtime/runtime';",
    ),
    banned('ui: the port engine file', 'src/ui/port-engine.ts', "import { engineOf } from '#/runtime/portEngine';"),
    allowed('ui: the runtime port', 'src/ui/port.ts', "import { type EditorPort } from '#/runtime/port';"),
    allowed(
        'ui: the runtime port by relative path',
        'src/ui/port-relative.ts',
        "import { type EditorPort } from '../runtime/port';",
    ),
    banned('ui: the engine', 'src/ui/engine.ts', "import { EditorState } from 'prosemirror-state';"),
    banned('ui: the react layer', 'src/ui/react-layer.ts', "import { Editor } from '#/react/editor';"),
    banned('ui: persistence', 'src/ui/persistence.ts', "import { save } from '#/persistence/save';"),
    banned('ui: the clipboard plugin', 'src/ui/clipboard.ts', "import { plugin } from '#/runtime/clipboard/plugin';"),
    allowed('ui: the bridge', 'src/ui/bridge.ts', "import { definePlugin } from '#/bridge/plugin';"),

    // docs
    banned('docs: an internal module', 'src/docs/internal.tsx', "import { run } from '#/runtime/run';"),
    banned('docs: a model subpath', 'src/docs/subpath.tsx', "import { node } from '#/model/node';"),
    banned('docs: a parent folder', 'src/docs/parent.tsx', "import { example } from '../examples/basic';"),
    allowed('docs: a public entry', 'src/docs/entry.tsx', "import { node } from '#/model';"),
    allowed(
        'docs: the reader entry',
        'src/docs/reader-entry.tsx',
        "import { RichTextReader } from '#/entries/reader';",
    ),
    banned('docs: the reader folder', 'src/docs/reader-folder.tsx', "import { render } from '#/reader/render';"),
    allowed('docs: its own folder', 'src/docs/folder.tsx', "import { example } from './example';"),

    // styles
    banned('styles: model', 'src/styles/model.ts', "import { node } from '#/model';"),
    banned('styles: react', 'src/styles/react.ts', "import { memo } from 'react';"),
    allowed('styles: a sibling file', 'src/styles/sibling.ts', "import { tokens } from './tokens';"),
];

let directory = '';

// The diagnostic count per reported `file:line`: a name that two groups ban is reported twice.
const reported = new Map<string, number>();

beforeAll(async () => {
    const root = await realpath(await mkdtemp(join(tmpdir(), 'lint-boundaries-')));
    directory = join(root, 'packages', 'rich-text-editor');
    await mkdir(directory, { recursive: true });

    // The config's plugins resolve from the package and from the repository root, so the copy of the layout links both.
    await symlink(join(PACKAGE_ROOT, '../../node_modules'), join(root, 'node_modules'), 'dir');
    await symlink(join(PACKAGE_ROOT, 'node_modules'), join(directory, 'node_modules'), 'dir');

    // Keeps the package config as the single source and turns off the type-aware rules, as the sources import nothing real.
    const configUrl = pathToFileURL(join(PACKAGE_ROOT, 'oxlint.config.ts')).href;
    await writeFile(
        join(directory, 'oxlint.config.ts'),
        `import base from '${configUrl}';\n\nexport default { ...base, options: { ...base.options, typeAware: false } };\n`,
    );
    await Promise.all(
        [...new Set(CASES.map(({ file }) => file))].map(async (file) => {
            const path = join(directory, file);
            const lines = CASES.filter((entry) => entry.file === file).map(({ source }) => source);
            await mkdir(dirname(path), { recursive: true });
            await writeFile(path, `${lines.join('\n')}\n`);
        }),
    );

    let output: string;
    try {
        ({ stdout: output } = await run(
            join(PACKAGE_ROOT, 'node_modules/.bin/oxlint'),
            ['-c', 'oxlint.config.ts', '--format', 'json', 'src'],
            { cwd: directory, maxBuffer: 64 * 1024 * 1024 },
        ));
    } catch (error) {
        // oxlint exits non-zero when it reports errors, which the banned imports are.
        output = (error as { stdout: string }).stdout;
    }

    const { diagnostics } = JSON.parse(output) as { diagnostics: Diagnostic[] };
    for (const { code, filename, labels } of diagnostics) {
        if (code === RULE) {
            for (const { span } of labels) {
                const key = `${filename}:${span.line}`;
                reported.set(key, (reported.get(key) ?? 0) + 1);
            }
        }
    }
}, 60_000);

afterAll(async () => {
    await rm(join(directory, '../..'), { recursive: true, force: true });
});

const located = CASES.map((entry, index) => ({
    ...entry,
    location: `${entry.file}:${CASES.slice(0, index).filter(({ file }) => file === entry.file).length + 1}`,
    title: `${entry.name} is ${entry.banned ? 'rejected' : 'accepted'}`,
}));

describe('the layer rules in oxlint.config.ts', () => {
    it.each(located.map((entry) => [entry.title, entry] as const))('%s', (_title, { location, banned: isBanned }) => {
        expect((reported.get(location) ?? 0) > 0).toBe(isBanned);
    });

    it('rejects exactly the banned imports', () => {
        const expected = located.filter(({ banned: isBanned }) => isBanned).map(({ location }) => location);
        expect([...reported.keys()].sort()).toEqual(expected.sort());
    });
});
