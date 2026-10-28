/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject } from 'react';

import { type TurnIntoEntry } from '#/bridge/chrome/helpers/turnInto';
import { type EditorPart } from '#/bridge/pluginApi/plugin';
import { type ToolbarItem } from '#/ui/helpers/items';

import { compiledOf, pluginsOf } from '../../compile/compileEditor';
import { menuItems, toolbarItems } from '../../helpers/toolbarItems';
import { turnIntoMenuEntries } from '../../helpers/turnInto';
import { type ToolbarMode } from '../../types';
import { type ChromeContext, type Mounted, type Props } from '../types';

/** Why a toolbar item's command cannot run, by its `disabledReason`. */
const REASON_KEYS: Readonly<Record<string, `RichTextEditor_${string}`>> = {
    'not-allowed': 'RichTextEditor_unavailableNotAllowed',
    readonly: 'RichTextEditor_unavailableReadOnly',
};

/** The toolbar items of a mounted definition, in the shown language. */
export const chromeItemsOf = (
    definition: Mounted['definition'],
    presentation: Props['presentation'],
    context: ChromeContext,
    lang: string,
) =>
    toolbarItems(
        compiledOf(definition),
        definition.authoring,
        presentation,
        context.translate,
        lang,
        pluginsOf(definition),
    );

/** The More rows of a mounted definition, below the toolbar items. */
export const chromeMenuOf = (
    definition: Mounted['definition'],
    items: readonly ToolbarItem[],
    context: ChromeContext,
    lang: string,
) => menuItems(compiledOf(definition), definition.authoring, items, context.translate, lang, pluginsOf(definition));

/** The block conversions the Turn into menus narrow, in the shown language. */
export const chromeTurnIntoOf = (definition: Mounted['definition'], context: ChromeContext, lang: string) =>
    turnIntoMenuEntries(pluginsOf(definition), context.translate, lang);

/** The plugins' standing overlays, each with a stable key and a stable ref for its toolbar. */
export const standingOverlaysOf = (
    plugins: readonly EditorPart[],
    overlayToolbarsRef: MutableRefObject<(HTMLElement | null)[]>,
) => {
    const overlays = plugins.flatMap((plugin) =>
        (plugin.overlays ?? []).map((component, index) => ({ key: `${plugin.feature} ${index}`, component })),
    );

    return overlays.map(({ key, component }, index) => ({
        key,
        component,
        toolbarRef: (element: HTMLElement | null) => {
            overlayToolbarsRef.current[index] = element;
        },
    }));
};

type ChromeBundle = {
    items: readonly ToolbarItem[];
    menu: readonly ToolbarItem[];
    turnInto: readonly TurnIntoEntry[];
    context: ChromeContext;
    id: string | undefined;
    generatedId: string;
    toolbarRef: MutableRefObject<HTMLDivElement | null>;
    bubbleRef: MutableRefObject<HTMLDivElement | null>;
    showBubbleRef: MutableRefObject<(() => void) | null>;
    toolbarMode: ToolbarMode;
    switchToolbar: (next: ToolbarMode) => void;
    keyboard: number;
    lang: string;
};

/** The chrome object the parts share: items, strings, toolbar refs and the mode switch. */
export const chromeBundleOf = ({
    items,
    menu,
    turnInto,
    context,
    id,
    generatedId,
    toolbarRef,
    bubbleRef,
    showBubbleRef,
    toolbarMode,
    switchToolbar,
    keyboard,
    lang,
}: ChromeBundle) => {
    const { translate } = context;
    let surfaceId = id;
    if (surfaceId === undefined && items.length > 0) {
        surfaceId = generatedId;
    }

    const strings = {
        label: translate('RichTextEditor_toolbar'),
        more: translate('RichTextEditor_more'),
        reason: (code: string) => translate(REASON_KEYS[code] ?? 'RichTextEditor_unavailable'),
    };
    const labels = {
        bubble: translate('RichTextEditor_bubbleToolbar'),
        toBubble: translate('RichTextEditor_toolbarOnSelection'),
        toFixed: translate('RichTextEditor_toolbarAlways'),
        contextMenu: translate('RichTextEditor_contextMenu'),
        turnInto: translate('RichTextEditor_slashTurnInto'),
    };

    return {
        items,
        menu,
        turnInto,
        strings,
        labels,
        surfaceId,
        toolbarRef,
        bubbleRef,
        showBubbleRef,
        mode: toolbarMode,
        setMode: switchToolbar,
        keyboard,
        lang,
        translate,
    };
};
