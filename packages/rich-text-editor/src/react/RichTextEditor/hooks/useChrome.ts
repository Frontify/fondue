/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import { type MutableRefObject, useCallback, useId, useMemo, useRef, useState } from 'react';

import { type InteractionScope } from '#/bridge/overlays/helpers/interactionScope';
import { type EditorHosts } from '#/bridge/pluginApi/plugin';
import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';
import { enUS } from '#/locales/en-US';
import { codecContext } from '#/model/internal';
import { readerContext } from '#/reader/helpers/context';
import { UPLOAD_FEATURE } from '#/runtime/port';
import { referenceListStrings } from '#/ui/LazySuggestionList/helpers/referenceStrings';

import { compiledOf, pluginsOf } from '../../compile/compileEditor';
import { type ToolbarMode } from '../../types';
import {
    chromeBundleOf,
    chromeItemsOf,
    chromeMenuOf,
    chromeTurnIntoOf,
    standingOverlaysOf,
} from '../helpers/chromeModel';
import { memberOf, type shellPropsOf } from '../helpers/sessionHelpers';
import {
    type Choosing,
    type ChromeContext,
    type Mounted,
    type PluginOverlay,
    type Props,
    type SessionRest,
} from '../types';

import { useRenderedHosts } from './usePluginHosts';

type ChromeSources = {
    props: Props;
    shell: ReturnType<typeof shellPropsOf>;
    mounted: Mounted;
    hosts: EditorHosts;
    generatedId: string;
    langRef: MutableRefObject<string>;
    translateRef: MutableRefObject<ChromeContext['translate']>;
    overlayToolbarsRef: MutableRefObject<(HTMLElement | null)[]>;
    toolbarRef: MutableRefObject<HTMLDivElement | null>;
    bubbleRef: MutableRefObject<HTMLDivElement | null>;
    showBubbleRef: MutableRefObject<(() => void) | null>;
    toolbarMode: ToolbarMode;
    switchToolbar: (next: ToolbarMode) => void;
    keyboard: number;
};

/** The chrome the parts share: the shown language, the strings, the toolbar items and the plugins' standing overlays. */
export const useChrome = (sources: ChromeSources) => {
    const { props, shell, mounted, hosts, generatedId, langRef, translateRef, overlayToolbarsRef } = sources;
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
        translateRef.current = chromeContext.translate;
    });

    // A host that renders a new presentation object on each change must not hand plugin UI a new API each time.
    const hostsT = useMemo(() => codecContext(locale, enUS).translate, [locale]);
    // The session keeps `hosts`, whose identity must hold; plugin UI reads this one, which follows the locale.
    const renderedHosts = useRenderedHosts(hosts, hostsT, shownLang);
    const plugins = pluginsOf(mounted.definition);
    const items = useMemo(
        () => chromeItemsOf(mounted.definition, props.presentation, chromeContext, lang),
        [mounted.definition, props.presentation, chromeContext, lang],
    );
    const menu = useMemo(
        () => chromeMenuOf(mounted.definition, items, chromeContext, lang),
        [mounted.definition, items, chromeContext, lang],
    );
    const turnInto = useMemo(
        () => chromeTurnIntoOf(mounted.definition, chromeContext, lang),
        [mounted.definition, chromeContext, lang],
    );
    // The plugins' standing overlays, each with a stable key and a stable ref for its toolbar.
    const standing = useMemo(() => standingOverlaysOf(plugins, overlayToolbarsRef), [plugins, overlayToolbarsRef]);
    const chrome = useMemo(
        () =>
            chromeBundleOf({
                items,
                menu,
                turnInto,
                context: chromeContext,
                id: props.id,
                generatedId,
                toolbarRef,
                bubbleRef,
                showBubbleRef,
                toolbarMode,
                switchToolbar,
                keyboard,
                lang,
            }),
        [
            items,
            menu,
            turnInto,
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
        ],
    );

    return { lang, chromeContext, renderedHosts, standing, chrome };
};

type OverlaySources = {
    props: Props;
    mounted: Mounted;
    overlayRoot: HTMLElement | null;
    scope: InteractionScope;
    pluginOverlay: PluginOverlay | undefined;
    chromeContext: ChromeContext;
};

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
        compiledOf(mounted.definition).model.capabilities.some(({ id }) => id === UPLOAD_FEATURE) &&
        memberOf(props.services, 'uploads') !== undefined;
    const referenceStrings = useMemo(() => referenceListStrings(chromeContext.translate), [chromeContext]);

    return { overlays, choosesFiles, referenceStrings };
};

/** The toolbar refs and the generated id the chrome shares with its parts. */
export const useChromeRefs = () => {
    const generatedId = useId();
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const bubbleRef = useRef<HTMLDivElement | null>(null);
    const showBubbleRef = useRef<(() => void) | null>(null);
    // The toolbars of the plugins' standing overlays, which the chrome's keys and focus reach.
    const overlayToolbarsRef = useRef<(HTMLElement | null)[]>([]);

    return { generatedId, toolbarRef, bubbleRef, showBubbleRef, overlayToolbarsRef };
};

/** The shown language and the chrome's strings, which the session's suggestion lists and plugins read when they run. */
export const useLocaleRefs = () => {
    const langRef = useRef<string>(enUS.lang);
    const translateRef = useRef(codecContext(enUS, enUS).translate);

    return { langRef, translateRef };
};

/** The file chooser of hosts with no asset picker, and where the files it gives go. */
export const useChooserRefs = () => {
    const chooserRef = useRef<HTMLInputElement | null>(null);
    const choosingRef = useRef<Choosing | undefined>(undefined);

    return { chooserRef, choosingRef };
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
