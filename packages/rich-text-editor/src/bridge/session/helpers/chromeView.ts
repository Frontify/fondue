/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ListLevels } from '#/model';
import { type ChromeStyles, createContentDecorations, createMarkStyler } from '#/runtime/dom/chromeStyling';
import { type SurfaceView, type ViewMarkViews, type ViewProps, type ViewSchema } from '#/runtime/dom/viewBridge';

import {
    bindChromeProps,
    chromeDecorationInputs,
    createChromeViewContext,
    setChromeDockedInset,
    setChromeKeyboardInset,
    setChromeListLevels,
    setChromeStyles,
    setChromeTopInset,
    showChromeSelection,
    takeChromeView,
} from './chromeViewContext';

/** What editor chrome sets on the view: the selection it keeps visible and the space it covers at the viewport edges. */
export type ChromeView = {
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
};

/** A chrome view whose scroll bands and decorations follow the toolbar, the keyboard and the presentation. */
export const createChromeView = (): ChromeView => {
    const context = createChromeViewContext();
    const content = createContentDecorations(
        () => chromeDecorationInputs(context),
        () => context.shown,
    );
    const markStyler = createMarkStyler();

    return {
        props: (surface, nodeViews, domId) => bindChromeProps(context, content, surface, nodeViews, domId),
        take: (view) => takeChromeView(context, view),
        showSelection: (shown) => showChromeSelection(context, shown),
        setTopInset: (height) => setChromeTopInset(context, height),
        setKeyboardInset: (height) => setChromeKeyboardInset(context, height),
        setDockedInset: (height) => setChromeDockedInset(context, height),
        setListLevels: (levels) => setChromeListLevels(context, content, levels),
        setStyles: (styles) => setChromeStyles(context, content, markStyler, styles),
        markViews: (schema) => markStyler.views(schema, () => context.styles),
    };
};
