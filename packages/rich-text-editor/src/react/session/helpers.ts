/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginPresentation } from '#/bridge/plugin';
import { enUS } from '#/locales/en-US';
import { type CodecContext } from '#/model';
import { decodeToTree } from '#/model/decode';
import { columnLayout } from '#/model/output';
import { type LoadedDocument } from '#/persistence/types';
import { type ReaderPresentation } from '#/reader/reader';
import { type ColumnState } from '#/runtime/columns';
import { type EditorRuntime } from '#/runtime/runtime';

import { engineOf, readersOf } from '../compile-editor';
import { type EditorServices } from '../types';

import {
    DEFAULT_TEST_ID,
    DEFAULT_TOOLBAR_SHORTCUT,
    type Defined,
    type Mounted,
    NO_PRESENTATION,
    type PartProps,
    type Props,
    type SERVICE_MEMBERS,
} from './types';

/** The key that moves focus to the toolbars, Alt+F10 unless the presentation sets another. */
export const toolbarShortcutOf = ({ presentation }: PartProps) => {
    if (presentation === undefined || presentation.toolbarShortcut === undefined) {
        return DEFAULT_TOOLBAR_SHORTCUT;
    }
    return presentation.toolbarShortcut;
};

export const memberOf = <K extends (typeof SERVICE_MEMBERS)[number]>(
    services: EditorServices | undefined,
    member: K,
): EditorServices[K] | undefined => {
    if (services === undefined) {
        return undefined;
    }
    return services[member];
};

/** The column layout the presentation asks for, if any. */
export const layoutOf = (presentation: ReaderPresentation | undefined) => {
    if (presentation === undefined) {
        return columnLayout(undefined, undefined);
    }
    return columnLayout(presentation.columns, presentation.columnGap);
};

/** The presentation's column count and the break labels in `t`'s locale, before the surface measured room for them. */
export const columnsAtMount = (presentation: ReaderPresentation | undefined, t: CodecContext['t']): ColumnState => {
    let count = 1;
    const layout = layoutOf(presentation);
    if (layout !== undefined) {
        count = layout.count;
    }
    return {
        count,
        fits: false,
        label: t('RichTextEditor_columnBreak'),
        inactiveLabel: t('RichTextEditor_columnBreakInactive'),
    };
};

/** The presentation as plugins read it, with the columns the surface lays the content out in. */
export const pluginPresentationOf = (presentation: ReaderPresentation | undefined): PluginPresentation => {
    const layout = layoutOf(presentation);
    let columns = 1;
    let columnGap: string | undefined;
    if (layout !== undefined) {
        columns = layout.count;
        columnGap = layout.length;
    }
    let styles: PluginPresentation['styles'] = [];
    let colorTokens: PluginPresentation['colorTokens'] = [];
    if (presentation !== undefined) {
        styles = presentation.styles ?? [];
        colorTokens = presentation.colorTokens ?? [];
    }
    return { styles, colorTokens, columns, columnGap };
};

/** The surface element of a session whose view is attached. */
export const surfaceOf = (runtime: EditorRuntime | undefined): HTMLElement | undefined => {
    if (runtime === undefined || runtime.view === undefined) {
        return undefined;
    }
    return runtime.view.dom;
};

/** The first colour behind the surface that is not fully transparent, which the content checks measure text against. */
export const backgroundOf = (runtime: EditorRuntime | undefined): string | undefined => {
    const surface = surfaceOf(runtime);
    const owner = surface?.ownerDocument.defaultView;
    if (surface === undefined || owner === null || owner === undefined) {
        return undefined;
    }
    for (let element: Element | null = surface; element !== null; element = element.parentElement) {
        const color = owner.getComputedStyle(element).backgroundColor;
        if (color !== '' && color !== 'transparent' && !/^rgba\(.*,\s*0\)$/.test(color)) {
            return color;
        }
    }
    return undefined;
};

/** Whether a services member changed: added, removed, or holding another function under some name. */
export const memberChanged = (previous: object | undefined, next: object | undefined) => {
    if (previous === undefined || next === undefined) {
        return previous !== next;
    }
    const names = new Set([...Object.keys(previous), ...Object.keys(next)]);
    return [...names].some((name) => Reflect.get(previous, name) !== Reflect.get(next, name));
};

export const mountOf = (props: Defined, loaded: LoadedDocument): Mounted => {
    const { definition, profile } = props;
    if (definition === undefined) {
        throw new Error('RichTextEditor needs a `definition`.');
    }
    const engine = engineOf(definition);
    const { result, tree } = decodeToTree(loaded.document, engine.model, { limits: definition.limits });
    const managed = memberOf(props.services, 'persistence') !== undefined;
    const unset = { lang: undefined, dir: undefined, managed };
    if (result.status === 'blocked') {
        return { definition, profile, decoded: undefined, blocked: result, ...unset };
    }
    if (tree === undefined) {
        return { definition, profile, decoded: undefined, blocked: undefined, ...unset };
    }
    // The surface spellchecks in the document's language when it declares one.
    let lang: string | undefined;
    let dir: Mounted['dir'];
    if (tree.attrs !== undefined && typeof tree.attrs.lang === 'string') {
        lang = tree.attrs.lang;
    }
    // `auto`, the default, sets no direction.
    if (tree.attrs !== undefined && (tree.attrs.dir === 'ltr' || tree.attrs.dir === 'rtl')) {
        dir = tree.attrs.dir;
    }
    const decoded = { tree, capabilities: result.document.requiredCapabilities };
    return { definition, profile, decoded, blocked: undefined, lang, dir, managed };
};

export const modeOf = ({ readOnly, disabled }: Props) => {
    if (readOnly === true || disabled === true) {
        return 'readonly';
    }
    return 'editable';
};

/** What both shells read the document with, from the editor props and their defaults. */
export const shellPropsOf = (props: Defined) => {
    const {
        definition,
        locale = enUS,
        presentation = NO_PRESENTATION,
        'data-test-id': testId = DEFAULT_TEST_ID,
    } = props;
    return {
        model: engineOf(definition).model,
        readers: readersOf(definition),
        limits: definition.limits,
        presentation,
        locale,
        testId,
    };
};
