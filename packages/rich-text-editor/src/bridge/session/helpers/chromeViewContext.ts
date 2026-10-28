/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ListLevels } from '#/model';
import {
    type ChromeStyles,
    type ContentDecorations,
    type DecorationInputs,
    type MarkStyler,
} from '#/runtime/dom/chromeStyling';
import { redraw, type SurfaceView, type ViewProps } from '#/runtime/dom/viewBridge';

// ProseMirror's own default margin, kept beyond the space the chrome covers.
const MARGIN = 5;

// Node chrome controls keep the caret's top margin clear of the sticky toolbar when they scroll into view.
const CHROME_SCROLL_MARGIN = '--rte-chrome-scroll-margin';

type Insets = {
    top: number;
    bottom: number;
    left: number;
    right: number;
};

type BottomBand = {
    keyboard: number;
    docked: number;
};

type ChromeMounted = {
    surface: HTMLElement;
    domId: () => string;
    nodeViews: Readonly<Record<string, unknown>>;
};

/** The chrome fields a view reads on each scroll and draw, mutated in place so ProseMirror keeps its props. */
export type ChromeViewContext = {
    view: SurfaceView | undefined;
    mounted: ChromeMounted | undefined;
    shown: boolean;
    margin: Insets;
    threshold: Insets;
    bottom: BottomBand;
    levels: ListLevels | undefined;
    styles: ChromeStyles | undefined;
    reported: Set<string>;
};

/** Writes the chrome scroll margin while a toolbar covers the top, and leaves the surface's attributes alone otherwise. */
const writeChromeMargin = (view: SurfaceView | undefined, height: number) => {
    if (view === undefined) {
        return;
    }

    if (height === 0) {
        view.dom.style.removeProperty(CHROME_SCROLL_MARGIN);

        return;
    }

    view.dom.style.setProperty(CHROME_SCROLL_MARGIN, `${height + MARGIN}px`);
};

const writeChromeBottom = (context: ChromeViewContext) => {
    context.threshold.bottom = context.bottom.keyboard + context.bottom.docked;
    context.margin.bottom = context.threshold.bottom + MARGIN;
};

const reportUnknownStyle = (context: ChromeViewContext, styleId: string, path: string) => {
    const listener = context.styles;
    if (listener === undefined || context.reported.has(styleId)) {
        return;
    }

    context.reported.add(styleId);
    // Decorations draw inside a view update, which a host listener must not reenter.
    queueMicrotask(() => listener.onUnknown(path));
};

/** A chrome view's mutable fields: the scroll bands ProseMirror reads, and the styles drawn since the last reset. */
export const createChromeViewContext = (): ChromeViewContext => ({
    view: undefined,
    mounted: undefined,
    shown: false,
    // ProseMirror reads these objects on each scroll, so rewriting their fields needs no new props.
    margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
    threshold: { top: 0, bottom: 0, left: 0, right: 0 },
    // The bottom band sums both parts, so a new keyboard measure keeps the docked toolbar's.
    bottom: { keyboard: 0, docked: 0 },
    levels: undefined,
    styles: undefined,
    // The stored style IDs this session reported unknown, once each.
    reported: new Set(),
});

/** The decoration inputs of the mounted surface, or none before the view's props exist. */
export const chromeDecorationInputs = (context: ChromeViewContext): DecorationInputs | undefined => {
    if (context.mounted === undefined) {
        return undefined;
    }

    const { surface, domId, nodeViews } = context.mounted;

    return {
        surface,
        domId,
        hasView: (name: string) => Object.hasOwn(nodeViews, name),
        levels: context.levels,
        styles: context.styles,
        unknown: (styleId: string, path: string) => reportUnknownStyle(context, styleId, path),
    };
};

/** Records the surface a view is about to be built on and returns the props its first draw carries. */
export const bindChromeProps = (
    context: ChromeViewContext,
    content: ContentDecorations,
    surface: HTMLElement,
    nodeViews: Readonly<Record<string, unknown>>,
    domId: () => string,
): ViewProps => {
    context.mounted = { surface, domId, nodeViews };
    content.reset();
    context.reported = new Set();

    return { decorations: content.decorations, scrollMargin: context.margin, scrollThreshold: context.threshold };
};

/** Takes the view built with the chrome props, which later chrome changes redraw. */
export const takeChromeView = (context: ChromeViewContext, view: SurfaceView) => {
    context.view = view;
    writeChromeMargin(view, context.threshold.top);
};

/** Shows the selection through a decoration while focus is in editor chrome. */
export const showChromeSelection = (context: ChromeViewContext, shown: boolean) => {
    if (context.shown === shown) {
        return;
    }

    context.shown = shown;
    redraw(context.view);
};

/** The height a sticky toolbar covers at the top of the viewport. */
export const setChromeTopInset = (context: ChromeViewContext, height: number) => {
    // A caret inside the covered band starts a scroll only when the threshold covers it too.
    context.threshold.top = height;
    context.margin.top = height + MARGIN;
    writeChromeMargin(context.view, height);
};

/** The height the on-screen keyboard covers at the bottom of the viewport. */
export const setChromeKeyboardInset = (context: ChromeViewContext, height: number) => {
    context.bottom.keyboard = height;
    writeChromeBottom(context);
};

/** The height a toolbar docked right above the on-screen keyboard adds to it, or 0. */
export const setChromeDockedInset = (context: ChromeViewContext, height: number) => {
    context.bottom.docked = height;
    writeChromeBottom(context);
};

/** The presentation's list markers by depth, which the view shows with no rebuild. */
export const setChromeListLevels = (
    context: ChromeViewContext,
    content: ContentDecorations,
    levels: ListLevels | undefined,
) => {
    if (context.levels === levels) {
        return;
    }

    context.levels = levels;
    content.reset();
    redraw(context.view);
};

/** The presentation's brand styles and colour tokens, which the view applies with no rebuild. */
export const setChromeStyles = (
    context: ChromeViewContext,
    content: ContentDecorations,
    markStyler: MarkStyler,
    styles: ChromeStyles | undefined,
) => {
    if (context.styles === styles) {
        return;
    }

    context.styles = styles;
    content.reset();
    markStyler.restyle(context.styles);
    redraw(context.view);
};
