/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, realpath, rm as remove, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const run = promisify(execFile);

const PACKAGE_ROOT = fileURLToPath(new URL('../../', import.meta.url));

const RULE = 'eslint(no-restricted-imports)';

type Case = {
    name: string;
    file: string;
    source: string;
    banned: boolean;
};

type Diagnostic = {
    code: string;
    filename: string;
    labels: readonly { span: { line: number } }[];
};

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
    banned('definition: a later layer', 'src/runtime/definition/layer.ts', "import { run } from '#/runtime/run';"),
    banned('definition: react', 'src/runtime/definition/react.ts', "import { memo } from 'react';"),
    allowed('definition: model', 'src/runtime/definition/model.ts', "import { node } from '#/model';"),
    allowed(
        'definition: the engine model',
        'src/runtime/definition/engine.ts',
        "import { Schema } from 'prosemirror-model';",
    ),
    allowed('definition: a sibling file', 'src/runtime/definition/sibling.ts', "import { schema } from './schema';"),

    // definition/schema
    banned('schema: a sibling file', 'src/runtime/definition/schema.ts', "import { other } from './other';"),
    banned(
        'schema: the rest of the definition',
        'src/runtime/definition/schema.ts',
        "import { shared } from '#/runtime/definition/shared';",
    ),
    allowed('schema: model', 'src/runtime/definition/schema.ts', "import { node } from '#/model';"),
    banned(
        'schema: the engine view',
        'src/runtime/definition/schema.ts',
        "import { EditorView } from 'prosemirror-view';",
    ),
    allowed(
        'schema: prosemirror-model',
        'src/runtime/definition/schema.ts',
        "import { Schema } from 'prosemirror-model';",
    ),

    // runtime/import
    banned('runtime/import: another layer', 'src/runtime/import/layer.ts', "import { run } from '#/runtime/run';"),
    banned(
        'runtime/import: the clipboard plugin',
        'src/runtime/import/plugin.ts',
        "import { plugin } from '#/runtime/clipboard/plugin';",
    ),
    banned(
        'runtime/import: the engine view',
        'src/runtime/import/view.ts',
        "import { EditorView } from 'prosemirror-view';",
    ),
    banned('runtime/import: react', 'src/runtime/import/react.ts', "import { memo } from 'react';"),
    allowed('runtime/import: model', 'src/runtime/import/model.ts', "import { node } from '#/model';"),
    allowed(
        'runtime/import: prosemirror-model',
        'src/runtime/import/engine.ts',
        "import { Slice } from 'prosemirror-model';",
    ),
    allowed('runtime/import: a sibling file', 'src/runtime/import/sibling.ts', "import { parse } from './parse';"),
    allowed(
        'runtime/import: itself by alias',
        'src/runtime/import/alias.ts',
        "import { parse } from '#/runtime/import';",
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
    allowed(
        'runtime/clipboard: codecs',
        'src/runtime/clipboard/codecs.ts',
        "import { codecPlanOf } from '#/codecs/plan';",
    ),
    allowed(
        'runtime/clipboard: runtime/import',
        'src/runtime/clipboard/import.ts',
        "import { parse } from '#/runtime/import';",
    ),
    banned(
        'runtime/clipboard: persistence',
        'src/runtime/clipboard/persistence.ts',
        "import { save } from '#/persistence/save';",
    ),
    banned(
        'runtime/import: runtime/history, which its parent folder may import',
        'src/runtime/import/history.ts',
        "import { run } from '#/runtime/history';",
    ),

    // runtime/import/fromHtml
    banned('fromHtml: another layer', 'src/runtime/import/fromHtml.ts', "import { run } from '#/runtime/run';"),
    banned(
        'fromHtml: the engine view',
        'src/runtime/import/fromHtml.ts',
        "import { EditorView } from 'prosemirror-view';",
    ),
    banned(
        'fromHtml: the rest of the definition',
        'src/runtime/import/fromHtml.ts',
        "import { other } from '#/runtime/definition/other';",
    ),
    allowed(
        'fromHtml: the schema',
        'src/runtime/import/fromHtml.ts',
        "import { schema } from '#/runtime/definition/schema';",
    ),
    allowed('fromHtml: runtime/import', 'src/runtime/import/fromHtml.ts', "import { parse } from '#/runtime/import';"),
    allowed(
        'fromHtml: prosemirror-model',
        'src/runtime/import/fromHtml.ts',
        "import { Slice } from 'prosemirror-model';",
    ),
    allowed('fromHtml: model', 'src/runtime/import/fromHtml.ts', "import { node } from '#/model';"),

    // feature.ts and migration.ts
    banned('feature file: a model subpath', 'src/plugins/bold/feature.ts', "import { node } from '#/model/node';"),
    banned('feature file: its view', 'src/plugins/bold/migration.ts', "import { view } from './view';"),
    banned(
        'feature file: another feature view',
        'src/plugins/bold/feature.ts',
        "import { view } from '#/plugins/italic/view';",
    ),
    banned('feature file: another layer', 'src/plugins/italic/feature.ts', "import { run } from '#/runtime/run';"),
    banned('feature file: a package', 'src/plugins/link/feature.ts', "import { memo } from 'react';"),
    allowed('feature file: the model entry', 'src/plugins/list/feature.ts', "import { node } from '#/model';"),
    allowed('feature file: its migration', 'src/plugins/table/feature.ts', "import { migrate } from './migration';"),
    allowed(
        'feature file: a dependency feature',
        'src/plugins/image/feature.ts',
        "import { feature } from '#/plugins/link/feature';",
    ),

    // feature editor files
    banned('editor part: another layer', 'src/plugins/bold/view.tsx', "import { run } from '#/runtime/run';"),
    banned(
        'editor part: another feature',
        'src/plugins/bold/toolbar.tsx',
        "import { feature } from '#/plugins/italic/feature';",
    ),
    banned('editor part: a model subpath', 'src/plugins/bold/model.tsx', "import { node } from '#/model/node';"),
    banned(
        'editor part: the engine',
        'src/plugins/bold/engine.tsx',
        "import { EditorState } from 'prosemirror-state';",
    ),
    banned('editor part: a Node built-in', 'src/plugins/bold/node.tsx', "import { readFile } from 'node:fs';"),
    banned('editor part: a parent folder', 'src/plugins/bold/parent.tsx', "import { other } from '../italic/view';"),
    allowed(
        'editor part: the plugin bridge',
        'src/plugins/bold/plugin.tsx',
        "import { definePlugin } from '#/bridge/pluginApi/plugin';",
    ),
    allowed(
        'editor part: the define bridge',
        'src/plugins/bold/define.tsx',
        "import { defineView } from '#/bridge/pluginApi/define';",
    ),
    allowed('editor part: model', 'src/plugins/bold/entry.tsx', "import { node } from '#/model';"),
    allowed('editor part: react', 'src/plugins/bold/react.tsx', "import { memo } from 'react';"),
    allowed(
        'editor part: fondue components',
        'src/plugins/bold/components.tsx',
        "import { Button } from '@frontify/fondue-components';",
    ),
    allowed('editor part: its own folder', 'src/plugins/bold/folder.tsx', "import { icon } from './icon';"),

    // feature folders: components, hooks, helpers
    banned(
        'component: the plugin index',
        'src/plugins/Callout/components/Index.tsx',
        "import { boldPlugin } from '../index';",
    ),
    banned(
        'component: the plugin editor',
        'src/plugins/Callout/components/Editor.tsx',
        "import { boldEditor } from '../editor';",
    ),
    banned(
        'component: the plugin reader',
        'src/plugins/Callout/components/Reader.tsx',
        "import { boldReader } from '../reader';",
    ),
    banned(
        'component: the plugin feature',
        'src/plugins/Callout/components/Feature.tsx',
        "import { bold } from '../feature';",
    ),
    banned('component: the plugin folder', 'src/plugins/Callout/components/Folder.tsx', "import { bold } from '..';"),
    allowed(
        'component: a hook',
        'src/plugins/Callout/components/Hook.tsx',
        "import { useBold } from '../hooks/useBold';",
    ),
    allowed(
        'component: a helper',
        'src/plugins/Callout/components/Helper.tsx',
        "import { boldOptions } from '../helpers/options';",
    ),
    allowed(
        'component: a sibling component',
        'src/plugins/Callout/components/Sibling.tsx',
        "import { Icon } from './Icon';",
    ),
    banned(
        'component: the editor part rules still hold',
        'src/plugins/Callout/components/Layer.tsx',
        "import { run } from '#/runtime/run';",
    ),
    banned(
        'hook: a component',
        'src/plugins/Callout/hooks/useComponent.ts',
        "import { Icon } from '../components/Icon';",
    ),
    banned(
        'hook: a component folder',
        'src/plugins/Callout/hooks/useComponentFolder.ts',
        "import { Icon } from '../components';",
    ),
    banned('hook: the plugin index', 'src/plugins/Callout/hooks/useIndex.ts', "import { boldPlugin } from '../index';"),
    banned(
        'hook: the plugin editor',
        'src/plugins/Callout/hooks/useEditor.ts',
        "import { boldEditor } from '../editor';",
    ),
    banned(
        'hook: the plugin reader',
        'src/plugins/Callout/hooks/useReader.ts',
        "import { boldReader } from '../reader';",
    ),
    banned('hook: the plugin feature', 'src/plugins/Callout/hooks/useFeature.ts', "import { bold } from '../feature';"),
    allowed(
        'hook: a helper',
        'src/plugins/Callout/hooks/useHelper.ts',
        "import { boldOptions } from '../helpers/options';",
    ),
    allowed('hook: a sibling hook', 'src/plugins/Callout/hooks/useSibling.ts', "import { useBold } from './useBold';"),
    banned(
        'hook: the editor part rules still hold',
        'src/plugins/Callout/hooks/useLayer.ts',
        "import { run } from '#/runtime/run';",
    ),
    banned('helper: a hook', 'src/plugins/Callout/helpers/hook.ts', "import { useBold } from '../hooks/useBold';"),
    banned(
        'helper: a component',
        'src/plugins/Callout/helpers/component.ts',
        "import { Icon } from '../components/Icon';",
    ),
    banned(
        'helper: a component folder',
        'src/plugins/Callout/helpers/component-folder.ts',
        "import { Icon } from '../components';",
    ),
    banned(
        'helper: the plugin index',
        'src/plugins/Callout/helpers/index.ts',
        "import { boldPlugin } from '../index';",
    ),
    banned(
        'helper: the plugin editor',
        'src/plugins/Callout/helpers/editor.ts',
        "import { boldEditor } from '../editor';",
    ),
    banned(
        'helper: the plugin reader',
        'src/plugins/Callout/helpers/reader.ts',
        "import { boldReader } from '../reader';",
    ),
    banned(
        'helper: the plugin feature',
        'src/plugins/Callout/helpers/feature.ts',
        "import { bold } from '../feature';",
    ),
    allowed(
        'helper: a lazy import of a component',
        'src/plugins/Callout/helpers/lazy.ts',
        "export const lazyIcon = () => import('../components/Icon');",
    ),
    allowed(
        'helper: a sibling helper',
        'src/plugins/Callout/helpers/sibling.ts',
        "import { boldOptions } from './options';",
    ),
    banned(
        'helper: the editor part rules still hold',
        'src/plugins/Callout/helpers/layer.ts',
        "import { run } from '#/runtime/run';",
    ),
    allowed(
        'editor: a lazy import of a component',
        'src/plugins/Callout/editor.ts',
        "export const lazyIcon = () => import('./components/Icon');",
    ),

    // feature wiring
    banned('wiring: a view', 'src/plugins/registry.ts', "import { view } from '#/plugins/bold/view';"),
    banned('wiring: a reader', 'src/plugins/index.ts', "import { reader } from '#/plugins/bold/reader';"),
    banned('wiring: a model subpath', 'src/plugins/profiles/model.ts', "import { node } from '#/model/node';"),
    banned('wiring: another layer', 'src/plugins/profiles/layer.ts', "import { run } from '#/runtime/run';"),
    banned('wiring: react', 'src/plugins/profiles/react.tsx', "import { memo } from 'react';"),
    allowed('wiring: model', 'src/plugins/profiles/entry.ts', "import { node } from '#/model';"),
    allowed(
        'wiring: a feature file',
        'src/plugins/profiles/feature.ts',
        "import { feature } from '#/plugins/bold/feature';",
    ),
    allowed('wiring: the registry', 'src/plugins/profiles/registry.ts', "import { registry } from '../registry';"),

    // feature reader.tsx
    banned('feature reader: another layer', 'src/plugins/bold/reader.tsx', "import { run } from '#/runtime/run';"),
    banned('feature reader: a model subpath', 'src/plugins/italic/reader.tsx', "import { node } from '#/model/node';"),
    banned('feature reader: its view', 'src/plugins/link/reader.tsx', "import { view } from './view';"),
    banned(
        'feature reader: a feature view',
        'src/plugins/list/reader.tsx',
        "import { view } from '#/plugins/bold/view';",
    ),
    banned(
        'feature reader: the engine',
        'src/plugins/table/reader.tsx',
        "import { EditorState } from 'prosemirror-state';",
    ),
    banned('feature reader: a Node built-in', 'src/plugins/image/reader.tsx', "import { readFile } from 'node:fs';"),
    allowed('feature reader: react', 'src/plugins/code/reader.tsx', "import { memo } from 'react';"),
    allowed('feature reader: model', 'src/plugins/quote/reader.tsx', "import { node } from '#/model';"),
    allowed(
        'feature reader: the reader define entry',
        'src/plugins/heading/reader.tsx',
        "import { defineReader } from '#/reader/define';",
    ),
    allowed('feature reader: its feature', 'src/plugins/divider/reader.tsx', "import { feature } from './feature';"),
    allowed(
        'feature reader: its component',
        'src/plugins/divider/reader.tsx',
        "import { Icon } from './components/Icon';",
    ),
    banned('feature reader: its hook', 'src/plugins/divider/reader.tsx', "import { useIcon } from './hooks/useIcon';"),
    allowed(
        'feature reader: a dependency feature',
        'src/plugins/emoji/reader.tsx',
        "import { feature } from '#/plugins/link/feature';",
    ),

    // feature index.ts
    banned('feature index: another layer', 'src/plugins/bold/index.ts', "import { run } from '#/runtime/run';"),
    banned('feature index: the model', 'src/plugins/bold/index.ts', "import { node } from '#/model';"),
    banned(
        'feature index: another bridge module',
        'src/plugins/bold/index.ts',
        "import { define } from '#/bridge/pluginApi/define';",
    ),
    banned('feature index: its migration', 'src/plugins/bold/index.ts', "import { migrate } from './migration';"),
    banned('feature index: its view', 'src/plugins/bold/index.ts', "import { view } from './view';"),
    banned(
        'feature index: another feature',
        'src/plugins/bold/index.ts',
        "import { italic } from '../italic/feature';",
    ),
    banned(
        'feature index: another feature by alias',
        'src/plugins/bold/index.ts',
        "import { italicPlugin } from '#/plugins/italic';",
    ),
    banned('feature index: react', 'src/plugins/bold/index.ts', "import { memo } from 'react';"),
    banned('feature index: a Node built-in', 'src/plugins/bold/index.ts', "import { readFile } from 'node:fs';"),
    allowed(
        'feature index: the plugin definer',
        'src/plugins/bold/index.ts',
        "import { definePlugin } from '#/bridge/pluginApi/definePlugin';",
    ),
    allowed('feature index: its editor part', 'src/plugins/bold/index.ts', "import { boldEditor } from './editor';"),
    allowed('feature index: its feature', 'src/plugins/bold/index.ts', "import { bold } from './feature';"),
    allowed('feature index: its reader', 'src/plugins/bold/index.ts', "import { boldReader } from './reader';"),

    // feature plugins registry
    banned('feature plugins: another layer', 'src/plugins/plugins.ts', "import { run } from '#/runtime/run';"),
    banned('feature plugins: a model subpath', 'src/plugins/plugins.ts', "import { node } from '#/model/node';"),
    banned(
        'feature plugins: another bridge module',
        'src/plugins/plugins.ts',
        "import { define } from '#/bridge/pluginApi/define';",
    ),
    banned('feature plugins: a feature file', 'src/plugins/plugins.ts', "import { bold } from './bold/feature';"),
    banned(
        'feature plugins: a feature editor part',
        'src/plugins/plugins.ts',
        "import { boldEditor } from './bold/editor';",
    ),
    banned('feature plugins: the registry', 'src/plugins/plugins.ts', "import { registry } from './registry';"),
    banned(
        'feature plugins: a feature by alias',
        'src/plugins/plugins.ts',
        "import { boldPlugin } from '#/plugins/bold';",
    ),
    banned('feature plugins: react', 'src/plugins/plugins.ts', "import { memo } from 'react';"),
    allowed('feature plugins: the model', 'src/plugins/plugins.ts', "import { DefinitionError } from '#/model';"),
    allowed(
        'feature plugins: the plugin definer',
        'src/plugins/plugins.ts',
        "import { type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';",
    ),
    allowed('feature plugins: a feature index', 'src/plugins/plugins.ts', "import { boldIndex } from './bold/index';"),

    // feature fixtures
    banned(
        'feature fixtures: a model subpath',
        'src/plugins/bold/fixtures/subpath.ts',
        "import { node } from '#/model/node';",
    ),
    banned(
        'feature fixtures: the model folder by relative path',
        'src/plugins/bold/fixtures/relative.ts',
        "import { node } from '../../../model/node';",
    ),
    allowed(
        'feature fixtures: the model entry',
        'src/plugins/bold/fixtures/entry.ts',
        "import { node } from '#/model';",
    ),

    // feature internals outside the feature folder
    banned(
        'internals: an editor part',
        'src/react/editor-part.ts',
        "import { boldEditor } from '#/plugins/bold/editor';",
    ),
    banned('internals: a reader', 'src/react/reader-part.ts', "import { boldReader } from '#/plugins/bold/reader';"),
    banned(
        'internals: a view by relative path',
        'src/react/view-part.ts',
        "import { view } from '../plugins/bold/view';",
    ),
    banned('internals: a dialog', 'src/ui/dialog-part.ts', "import { dialog } from '#/plugins/link/link-dialog';"),
    banned('internals: a migration', 'src/ui/migration-part.ts', "import { migrate } from '#/plugins/bold/migration';"),
    banned(
        'internals: a nested file',
        'src/testing/nested.ts',
        "import { toolbar } from '#/plugins/bold/parts/toolbar';",
    ),
    banned(
        'internals: an editor part inside conformance',
        'src/testing/conformance/editor-part.ts',
        "import { boldEditor } from '#/plugins/bold/editor';",
    ),
    banned(
        'internals: a file beside the entry',
        'src/internals.ts',
        "import { boldEditor } from '#/plugins/bold/editor';",
    ),
    allowed('internals: a feature file', 'src/react/feature-file.ts', "import { bold } from '#/plugins/bold/feature';"),
    allowed(
        'internals: a feature index',
        'src/react/feature-index.ts',
        "import { boldPlugin } from '#/plugins/bold/index';",
    ),
    allowed(
        'internals: a feature folder',
        'src/react/feature-folder.ts',
        "import { boldPlugin } from '#/plugins/bold';",
    ),
    allowed(
        'internals: a shipped profile',
        'src/react/profile.ts',
        "import { commentModel } from '#/plugins/profiles/comment';",
    ),
    allowed(
        'internals: a feature fixture',
        'src/testing/fixture.ts',
        "import bold from '#/plugins/bold/fixtures/bold.json';",
    ),
    allowed('internals: the feature registry', 'src/index.ts', "import { registry } from '#/plugins/registry';"),
    allowed(
        'internals: a test',
        'src/react/__tests__/editor-part.ts',
        "import { boldEditor } from '#/plugins/bold/editor';",
    ),
    allowed(
        'internals: the plugins registry glob',
        'src/plugins/plugins.ts',
        "const pluginModules = import.meta.glob('./*/index.ts', { eager: true });",
    ),
    allowed(
        'internals: the feature registry glob',
        'src/plugins/registry.ts',
        "const featureModules = import.meta.glob('./*/feature.ts', { eager: true });",
    ),
    allowed(
        'internals: the shipped readers glob',
        'src/entries/shippedReaders.ts',
        "const readerModules = import.meta.glob('../plugins/*/reader.tsx', { eager: true });",
    ),

    // feature plugins in the server side layers
    banned('plugins: model', 'src/model/plugin.ts', "import { boldPlugin } from '#/plugins/bold/index';"),
    banned('plugins: fromHtml', 'src/runtime/import/fromHtml.ts', "import { boldPlugin } from '#/plugins/bold/index';"),
    banned('plugins: reader', 'src/reader/plugin.ts', "import { boldPlugin } from '#/plugins/bold/index';"),
    banned(
        'plugins: reader by relative path',
        'src/reader/plugin-relative.ts',
        "import { boldPlugin } from '../plugins/bold/index';",
    ),
    banned('plugins: codecs', 'src/codecs/plugin.ts', "import { boldPlugin } from '#/plugins/bold/index';"),
    banned('plugins: the features entry', 'src/plugins/index.ts', "import { boldPlugin } from '#/plugins/bold/index';"),
    banned(
        'plugins: another features file',
        'src/plugins/stages.ts',
        "import { boldPlugin } from '#/plugins/bold/index';",
    ),
    allowed(
        'plugins: a feature file in another features file',
        'src/plugins/stages.ts',
        "import { bold } from '#/plugins/bold/feature';",
    ),

    // reader
    banned('reader: another layer', 'src/reader/layer.ts', "import { run } from '#/runtime/run';"),
    banned('reader: the engine', 'src/reader/engine.ts', "import { Schema } from 'prosemirror-model';"),
    banned('reader: a feature file', 'src/reader/feature.ts', "import { feature } from '#/plugins/bold/feature';"),
    banned('reader: a feature view', 'src/reader/view.ts', "import { view } from '#/plugins/bold/view';"),
    banned('reader: the feature registry', 'src/reader/registry.ts', "import { registry } from '#/plugins/registry';"),
    banned('reader: a client hook', 'src/reader/hook.tsx', "import { useState } from 'react';"),
    banned('reader: the react default export', 'src/reader/default.tsx', "import React from 'react';"),
    allowed('reader: a server safe react export', 'src/reader/server.tsx', "import { Fragment } from 'react';"),
    allowed('reader: model', 'src/reader/model.ts', "import { node } from '#/model';"),
    allowed('reader: locales', 'src/reader/locales.ts', "import { en } from '#/locales/en';"),
    banned(
        'reader: a feature reader',
        'src/reader/feature-reader.ts',
        "import { reader } from '#/plugins/bold/reader';",
    ),
    banned(
        'reader: a feature reader by a relative path',
        'src/reader/feature-reader-relative.ts',
        "import { reader } from '../plugins/bold/reader';",
    ),
    banned('reader: an entry module', 'src/reader/entry.ts', "import { RichTextReader } from '#/entries/reader';"),
    allowed('reader: a sibling file', 'src/reader/sibling.ts', "import { render } from './render';"),

    // entries
    banned('entries: another layer', 'src/entries/layer.ts', "import { run } from '#/runtime/run';"),
    banned('entries: model', 'src/entries/model.ts', "import { node } from '#/model';"),
    banned('entries: the engine', 'src/entries/engine.ts', "import { Schema } from 'prosemirror-model';"),
    banned('entries: a feature file', 'src/entries/feature.ts', "import { feature } from '#/plugins/bold/feature';"),
    banned('entries: a feature view', 'src/entries/view.ts', "import { view } from '#/plugins/bold/view';"),
    banned(
        'entries: the feature registry',
        'src/entries/registry.ts',
        "import { registry } from '#/plugins/registry';",
    ),
    banned('entries: a client hook', 'src/entries/hook.tsx', "import { useState } from 'react';"),
    allowed('entries: a server safe react export', 'src/entries/server.tsx', "import { Fragment } from 'react';"),
    allowed(
        'entries: a reader module',
        'src/entries/reader-module.ts',
        "import { render } from '#/reader/ReaderWith/helpers/render';",
    ),
    allowed(
        'entries: a feature reader',
        'src/entries/feature-reader.ts',
        "import { reader } from '#/plugins/bold/reader';",
    ),
    allowed('entries: a sibling file', 'src/entries/sibling.ts', "import { overrides } from './shipped-readers';"),

    // codecs
    banned('codecs: another layer', 'src/codecs/layer.ts', "import { run } from '#/runtime/run';"),
    banned('codecs: react', 'src/codecs/react.ts', "import { memo } from 'react';"),
    banned('codecs: the engine', 'src/codecs/engine.ts', "import { Schema } from 'prosemirror-model';"),
    banned('codecs: a feature', 'src/codecs/feature.ts', "import { feature } from '#/plugins/bold/feature';"),
    allowed('codecs: model', 'src/codecs/model.ts', "import { node } from '#/model';"),
    allowed('codecs: locales', 'src/codecs/locales.ts', "import { en } from '#/locales/en';"),
    allowed('codecs: a sibling file', 'src/codecs/sibling.ts', "import { encode } from './encode';"),

    // locales
    banned('locales: model', 'src/locales/model.ts', "import { node } from '#/model';"),
    banned('locales: react', 'src/locales/react.ts', "import { memo } from 'react';"),
    allowed('locales: a sibling file', 'src/locales/sibling.ts', "import { en } from './en';"),

    // testing
    banned('testing: the react layer', 'src/testing/react.ts', "import { Editor } from '#/react/editor';"),
    banned('testing: a feature view', 'src/testing/view.ts', "import { view } from '#/plugins/bold/view';"),
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
        "import { editorEngine } from '#/react/compile/engine';",
    ),
    banned(
        'testing: prosemirror-state inside conformance',
        'src/testing/conformance/x.ts',
        "import { EditorState } from 'prosemirror-state';",
    ),
    banned(
        'testing: the plugins registry outside conformance',
        'src/testing/plugins.ts',
        "import { pluginsById } from '#/plugins/plugins';",
    ),
    allowed(
        'testing: the plugins registry inside conformance',
        'src/testing/conformance/contractPlugins.ts',
        "import { pluginsById } from '#/plugins/plugins';",
    ),
    banned(
        'testing: the plugin cover check inside conformance',
        'src/testing/conformance/shipped.ts',
        "import { checkCover } from '#/react/compile/pluginCover';",
    ),
    banned(
        'testing: the engine outside conformance',
        'src/testing/x.ts',
        "import { editorEngine } from '#/react/compile/engine';",
    ),

    // runtime
    banned('runtime: the react layer', 'src/runtime/react-layer.ts', "import { Editor } from '#/react/editor';"),
    banned('runtime: persistence by alias', 'src/runtime/alias.ts', "import { save } from '#/persistence/save';"),
    banned(
        'runtime: persistence by relative path',
        'src/runtime/relative.ts',
        "import { save } from '../persistence/save';",
    ),
    banned('runtime: the html entry', 'src/runtime/plugin.ts', "import { fromHTML } from '#/runtime/import/fromHtml';"),
    banned('runtime: react', 'src/runtime/react.ts', "import { memo } from 'react';"),
    banned(
        'runtime: prosemirror-history outside runtime/history',
        'src/runtime/history.ts',
        "import { history } from 'prosemirror-history';",
    ),
    allowed(
        'runtime: definition',
        'src/runtime/definition.ts',
        "import { schema } from '#/runtime/definition/schema';",
    ),
    allowed('runtime: runtime/import', 'src/runtime/import.ts', "import { parse } from '#/runtime/import';"),
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
        'bridge: the port engine file',
        'src/bridge/port-engine.ts',
        "import { engineOf } from '#/runtime/portEngine';",
    ),
    banned(
        'bridge: the clipboard plugin',
        'src/bridge/clipboard.ts',
        "import { plugin } from '#/runtime/clipboard/plugin';",
    ),
    allowed('bridge: persistence', 'src/bridge/persistence.ts', "import { save } from '#/persistence/save';"),
    banned('bridge: prosemirror-view', 'src/bridge/view.ts', "import { EditorView } from 'prosemirror-view';"),
    banned('bridge: prosemirror-model', 'src/bridge/model.ts', "import { Schema } from 'prosemirror-model';"),
    allowed('bridge: react', 'src/bridge/react.ts', "import { memo } from 'react';"),
    allowed(
        "bridge: a component's own stylesheet",
        'src/bridge/chrome/components/Listbox.tsx',
        "import styles from '../styles/listbox.module.scss';",
    ),
    banned(
        'bridge: the styles layer',
        'src/bridge/chrome/Listbox.tsx',
        "import { visuallyHidden } from '../../styles/visuallyHidden';",
    ),

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
        'src/react/compile/compileEditor.ts',
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
        "import { definePlugin } from '#/bridge/pluginApi/plugin';",
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
    allowed('ui: the bridge', 'src/ui/bridge.ts', "import { definePlugin } from '#/bridge/pluginApi/plugin';"),

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
    banned(
        'docs: the reader folder',
        'src/docs/reader-folder.tsx',
        "import { render } from '#/reader/ReaderWith/helpers/render';",
    ),
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
    await remove(join(directory, '../..'), { recursive: true, force: true });
});

const located = CASES.map((entry, index) => ({
    ...entry,
    location: `${entry.file}:${CASES.slice(0, index).filter(({ file }) => file === entry.file).length + 1}`,
}));

describe('the layer rules in oxlint.config.ts', () => {
    it('reports the verdict of every import', () => {
        const verdict = (location: string, isBanned: boolean, name = 'an unlisted import') =>
            `${name} (${location}) is ${isBanned ? 'rejected' : 'accepted'}`;
        const known = new Set(located.map(({ location }) => location));
        const expected = located
            .map(({ location, banned: isBanned, name }) => verdict(location, isBanned, name))
            .sort();
        const actual = [
            ...located.map(({ location, name }) => verdict(location, (reported.get(location) ?? 0) > 0, name)),
            ...[...reported.keys()]
                .filter((location) => !known.has(location))
                .map((location) => verdict(location, true)),
        ].sort();

        expect(actual).toEqual(expected);
    });
});
