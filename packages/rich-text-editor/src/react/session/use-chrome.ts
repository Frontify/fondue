/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import { type KeyboardEvent, type MutableRefObject, useCallback, useId, useMemo, useRef, useState } from 'react';

import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { type InteractionScope } from '#/bridge/interaction-scope';
import { type MountCoordinator } from '#/bridge/mount';
import { type EditorHosts } from '#/bridge/plugin';
import { enUS } from '#/locales/en-US';
import { codecContext } from '#/model/internal';
import { readerContext } from '#/reader/context';
import { UPLOAD_FEATURE } from '#/runtime/port';
import { referenceListStrings } from '#/ui/suggestions/suggestion-list';

import { moveChromeFocus } from '../chrome-focus';
import { engineOf, pluginsOf } from '../compile-editor';
import { type PluginOverlay, useRenderedHosts } from '../plugin-hosts';
import { menuItems, toolbarItems } from '../toolbar-items';
import { type EditorHandle, type ToolbarMode } from '../types';

import { memberOf, type shellPropsOf, toolbarShortcutOf } from './helpers';
import { type Mounted, type Props, type SessionRest } from './types';
import { type Choosing } from './use-runtime';

/** Why a toolbar item's command cannot run, by its `disabledReason`. */
const REASON_KEYS: Readonly<Record<string, `RichTextEditor_${string}`>> = {
    'not-allowed': 'RichTextEditor_unavailableNotAllowed',
    readonly: 'RichTextEditor_unavailableReadOnly',
};

interface ChromeSources {
    readonly props: Props;
    readonly shell: ReturnType<typeof shellPropsOf>;
    readonly mounted: Mounted;
    readonly hosts: EditorHosts;
    readonly generatedId: string;
    readonly langRef: MutableRefObject<string>;
    readonly tRef: MutableRefObject<ReturnType<typeof readerContext>['t']>;
    readonly overlayToolbarsRef: MutableRefObject<(HTMLElement | null)[]>;
    readonly toolbarRef: MutableRefObject<HTMLDivElement | null>;
    readonly bubbleRef: MutableRefObject<HTMLDivElement | null>;
    readonly showBubbleRef: MutableRefObject<(() => void) | null>;
    readonly toolbarMode: ToolbarMode;
    readonly switchToolbar: (next: ToolbarMode) => void;
    readonly keyboard: number;
}

/** The chrome the parts share: the shown language, the strings, the toolbar items and the plugins' standing overlays. */
export const useChrome = (sources: ChromeSources) => {
    const { props, shell, mounted, hosts, generatedId, langRef, tRef, overlayToolbarsRef } = sources;
    const { toolbarRef, bubbleRef, showBubbleRef, toolbarMode, switchToolbar, keyboard } = sources;
    const { locale, presentation } = shell;
    const theme = useFondueTheme();
    // The shown locale's language, else the theme's.
    let lang = locale.lang ?? theme.lang;
    if (lang === undefined) {
        lang = enUS.lang;
    }
    const shownLang = lang;
    useClientLayoutEffect(() => {
        langRef.current = shownLang;
    });
    // Chrome reads the newest presentation and locale with no view rebuild.
    const chromeContext = useMemo(() => readerContext(locale, presentation), [locale, presentation]);
    useClientLayoutEffect(() => {
        tRef.current = chromeContext.t;
    });
    // A host that renders a new presentation object on each change must not hand plugin UI a new API each time.
    const hostsT = useMemo(() => codecContext(locale, enUS).t, [locale]);
    // The session keeps `hosts`, whose identity must hold; plugin UI reads this one, which follows the locale.
    const renderedHosts = useRenderedHosts(hosts, hostsT, shownLang);
    const plugins = pluginsOf(mounted.definition);
    const items = useMemo(
        () =>
            toolbarItems(
                engineOf(mounted.definition),
                mounted.definition.authoring,
                props.presentation,
                chromeContext.t,
                lang,
                pluginsOf(mounted.definition),
            ),
        [mounted.definition, props.presentation, chromeContext, lang],
    );
    const menu = useMemo(
        () =>
            menuItems(
                engineOf(mounted.definition),
                mounted.definition.authoring,
                items,
                chromeContext.t,
                lang,
                pluginsOf(mounted.definition),
            ),
        [mounted.definition, items, chromeContext, lang],
    );
    // The plugins' standing overlays, each with a stable key and a stable ref for its toolbar.
    const standing = useMemo(() => {
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
    }, [plugins, overlayToolbarsRef]);
    const chrome = useMemo(() => {
        const { t } = chromeContext;
        let surfaceId = props.id;
        if (surfaceId === undefined && items.length > 0) {
            surfaceId = generatedId;
        }
        const strings = {
            label: t('RichTextEditor_toolbar'),
            more: t('RichTextEditor_more'),
            reason: (code: string) => t(REASON_KEYS[code] ?? 'RichTextEditor_unavailable'),
        };
        const labels = {
            bubble: t('RichTextEditor_bubbleToolbar'),
            toBubble: t('RichTextEditor_toolbarOnSelection'),
            toFixed: t('RichTextEditor_toolbarAlways'),
            contextMenu: t('RichTextEditor_contextMenu'),
        };
        return {
            items,
            menu,
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
            t,
        };
    }, [
        items,
        menu,
        chromeContext,
        props.id,
        generatedId,
        toolbarRef,
        bubbleRef,
        showBubbleRef,
        toolbarMode,
        switchToolbar,
        keyboard,
        lang,
    ]);
    return { lang, chromeContext, renderedHosts, standing, chrome };
};

interface KeySources {
    readonly props: Props;
    readonly coordinator: MountCoordinator;
    readonly toolbarRef: MutableRefObject<HTMLDivElement | null>;
    readonly bubbleRef: MutableRefObject<HTMLDivElement | null>;
    readonly showBubbleRef: MutableRefObject<(() => void) | null>;
    readonly overlayToolbarsRef: MutableRefObject<(HTMLElement | null)[]>;
    readonly toolbarMode: ToolbarMode;
}

/** Moves focus between the surface and the chrome on the keys the root hears. */
export const chromeKeyDownOf =
    ({ props, coordinator, toolbarRef, bubbleRef, showBubbleRef, overlayToolbarsRef, toolbarMode }: KeySources) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
        // A disabled editor's toolbar takes no focus.
        let toolbar = toolbarRef.current;
        if (props.disabled === true) {
            toolbar = null;
        }
        let showBubble: (() => void) | null = null;
        if (toolbarMode === 'bubble') {
            showBubble = showBubbleRef.current;
        }
        moveChromeFocus(event, {
            runtime: coordinator.runtime,
            toolbar,
            overlayToolbar: overlayToolbarsRef.current.find((element) => element?.isConnected === true) ?? null,
            bubble: bubbleRef.current,
            showBubble,
            shortcut: toolbarShortcutOf(props),
        });
    };

interface OverlaySources {
    readonly props: Props;
    readonly mounted: Mounted;
    readonly overlayRoot: HTMLElement | null;
    readonly scope: InteractionScope;
    readonly pluginOverlay: PluginOverlay | undefined;
    readonly chromeContext: ReturnType<typeof readerContext>;
}

/** Where the overlays render, whether the file chooser exists, and the reference list's strings. */
export const useOverlayValues = ({
    props,
    mounted,
    overlayRoot,
    scope,
    pluginOverlay,
    chromeContext,
}: OverlaySources) => {
    // The opener of the plugin overlay shown reaches every overlay it renders, such as a menu's follow-up draft.
    let opener: Element | null = null;
    if (pluginOverlay !== undefined) {
        opener = pluginOverlay.opener;
    }
    const overlays = useMemo(() => ({ container: overlayRoot, scope, opener }), [overlayRoot, scope, opener]);
    // The file chooser exists where `media.image` takes files that `services.uploads` sends.
    const choosesFiles =
        engineOf(mounted.definition).model.capabilities.some(({ id }) => id === UPLOAD_FEATURE) &&
        memberOf(props.services, 'uploads') !== undefined;
    const referenceStrings = useMemo(() => referenceListStrings(chromeContext.t), [chromeContext]);
    return { overlays, choosesFiles, referenceStrings };
};

/** The refs a session shares between its hooks and parts. */
export const useSessionRefs = () => {
    const generatedId = useId();
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    // The shown locale's language, which the session's suggestion lists read when they search.
    const langRef = useRef<string>(enUS.lang);
    const handleRef = useRef<EditorHandle<object> | null>(null);
    const bubbleRef = useRef<HTMLDivElement | null>(null);
    const showBubbleRef = useRef<(() => void) | null>(null);
    // The toolbars of the plugins' standing overlays, and the chrome's strings, which plugins read when they run.
    const overlayToolbarsRef = useRef<(HTMLElement | null)[]>([]);
    const tRef = useRef(codecContext(enUS, enUS).t);
    // The file chooser of hosts with no asset picker, and where the files it gives go.
    const chooserRef = useRef<HTMLInputElement | null>(null);
    const choosingRef = useRef<Choosing | undefined>(undefined);
    return {
        generatedId,
        toolbarRef,
        langRef,
        handleRef,
        bubbleRef,
        showBubbleRef,
        overlayToolbarsRef,
        tRef,
        chooserRef,
        choosingRef,
    };
};

/** The toolbar mode, which a switch reports to the host. */
export const useToolbarMode = (initial: ToolbarMode | undefined, latestRef: MutableRefObject<SessionRest>) => {
    const [toolbarMode, setToolbarMode] = useState<ToolbarMode>(() => initial ?? 'fixed');
    const switchToolbar = useCallback(
        (next: ToolbarMode) => {
            setToolbarMode(next);
            latestRef.current.onToolbarModeChange?.(next);
        },
        [latestRef],
    );
    return { toolbarMode, switchToolbar };
};
