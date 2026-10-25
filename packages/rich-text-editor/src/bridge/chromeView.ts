/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ListLevels } from '#/model';
import { type ChromeStyles, createContentDecorations, createMarkStyler } from '#/runtime/chromeStyling';
import { redraw, type SurfaceView, type ViewMarkViews, type ViewProps, type ViewSchema } from '#/runtime/viewBridge';

// ProseMirror's own default margin, kept beyond the space the chrome covers.
const MARGIN = 5;

/** What editor chrome sets on the view: the selection it keeps visible and the space it covers at the viewport edges. */
export interface ChromeView {
    /** The chrome's props for a view about to be built on `surface` with `nodeViews`, so its first draw carries them. */
    props(surface: HTMLElement, nodeViews: Readonly<Record<string, unknown>>, domId: () => string): ViewProps;
    /** Takes the view built with `props`, which later chrome changes redraw. */
    take(view: SurfaceView): void;
    /** Shows the selection through a decoration while focus is in editor chrome. */
    showSelection(shown: boolean): void;
    /** The height a sticky toolbar covers at the top of the viewport. */
    setTopInset(height: number): void;
    /** The height the on-screen keyboard covers at the bottom of the viewport. */
    setKeyboardInset(height: number): void;
    /** The height a toolbar docked right above the on-screen keyboard adds to it, or 0. */
    setDockedInset(height: number): void;
    /** The presentation's list markers by depth, which the view shows with no rebuild. */
    setListLevels(levels: ListLevels | undefined): void;
    /**
     * The presentation's brand styles and colour tokens, which the view applies with no rebuild. `onUnknown` hears
     * each stored style ID that the styles miss or deprecate once per session, with the path of its first use; without
     * a presentation no ID is unknown.
     */
    setStyles(styles: ChromeStyles | undefined): void;
    /** The mark views of `schema`'s styled and coloured marks, which carry the recipe class and colour on the mark's own element. */
    markViews(schema: ViewSchema): ViewMarkViews;
}

// Node chrome controls keep the caret's top margin clear of the sticky toolbar when they scroll into view.
const CHROME_SCROLL_MARGIN = '--rte-chrome-scroll-margin';

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

export const createChromeView = (): ChromeView => {
    let view: SurfaceView | undefined;
    let mounted:
        | {
              readonly surface: HTMLElement;
              readonly domId: () => string;
              readonly nodeViews: Readonly<Record<string, unknown>>;
          }
        | undefined;
    let shown = false;
    // ProseMirror reads these objects on each scroll, so rewriting their fields needs no new props.
    const margin = { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN };
    const threshold = { top: 0, bottom: 0, left: 0, right: 0 };
    // The bottom band sums both parts, so a new keyboard measure keeps the docked toolbar's.
    const bottom = { keyboard: 0, docked: 0 };
    const writeBottom = () => {
        threshold.bottom = bottom.keyboard + bottom.docked;
        margin.bottom = threshold.bottom + MARGIN;
    };
    let levels: ListLevels | undefined;
    let styles: ChromeStyles | undefined;
    // The stored style IDs this session reported unknown, once each.
    let reported = new Set<string>();
    const unknown = (styleId: string, path: string) => {
        const listener = styles;
        if (listener === undefined || reported.has(styleId)) {
            return;
        }
        reported.add(styleId);
        // Decorations draw inside a view update, which a host listener must not reenter.
        queueMicrotask(() => listener.onUnknown(path));
    };
    const content = createContentDecorations(
        () => {
            if (mounted === undefined) {
                return undefined;
            }
            const { surface, domId, nodeViews } = mounted;
            return {
                surface,
                domId,
                hasView: (name) => Object.hasOwn(nodeViews, name),
                levels,
                styles,
                unknown,
            };
        },
        () => shown,
    );
    const markStyler = createMarkStyler();
    return {
        props: (next, views, ids) => {
            mounted = { surface: next, domId: ids, nodeViews: views };
            content.reset();
            reported = new Set();
            return { decorations: content.decorations, scrollMargin: margin, scrollThreshold: threshold };
        },
        take: (next) => {
            view = next;
            writeChromeMargin(next, threshold.top);
        },
        showSelection: (next) => {
            if (shown === next) {
                return;
            }
            shown = next;
            redraw(view);
        },
        // A caret inside the covered band starts a scroll only when the threshold covers it too.
        setTopInset: (height) => {
            threshold.top = height;
            margin.top = height + MARGIN;
            writeChromeMargin(view, height);
        },
        setKeyboardInset: (height) => {
            bottom.keyboard = height;
            writeBottom();
        },
        setDockedInset: (height) => {
            bottom.docked = height;
            writeBottom();
        },
        setListLevels: (next) => {
            if (levels === next) {
                return;
            }
            levels = next;
            content.reset();
            redraw(view);
        },
        setStyles: (next) => {
            if (styles === next) {
                return;
            }
            styles = next;
            content.reset();
            markStyler.restyle(styles);
            redraw(view);
        },
        markViews: (schema) => markStyler.views(schema, () => styles),
    };
};
