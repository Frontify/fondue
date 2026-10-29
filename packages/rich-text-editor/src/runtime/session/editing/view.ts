/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState } from 'prosemirror-state';
import {
    type DirectEditorProps,
    type EditorView,
    type MarkViewConstructor,
    type NodeViewConstructor,
} from 'prosemirror-view';

import { suggestionOptionId } from '../../capabilities/suggestions/optionId';
import { activeSuggestion } from '../../capabilities/suggestions/plugin';

import { type ViewArgs, createSurfaceHost } from './viewSurface';

/** One empty paragraph is an empty document, which shows the placeholder. */
export const isEmpty = ({ doc }: EditorState) =>
    doc.childCount === 1 && doc.firstChild !== null && doc.firstChild.isTextblock && doc.firstChild.content.size === 0;

export type ViewService = {
    current(): EditorView | undefined;
    nodeViews: Readonly<Record<string, NodeViewConstructor>>;
    setNodeViews(next: Readonly<Record<string, NodeViewConstructor>>): void;
    setMarkViews(next: Readonly<Record<string, MarkViewConstructor>>): void;
    /** The plugin view hook: the view the constructor is building, before it returns. */
    capture(built: EditorView): void;
    /** Runs a view call; `threw` when it threw or a node view inside it threw, which the bridge reports through `faultView`. */
    call<Result>(work: () => Result): { threw: boolean; value: Result | undefined };
    /** The error the latest `call` caught, when that call threw. */
    thrown(): unknown;
    /** Recomputes `editable`, the surface attributes and the break decorations once input has settled. */
    refresh(): void;
    /** Redraws the view with its current state, without the settled-input checks of `refresh`. */
    repaint(): void;
    /** Builds the view in `element`; a view that throws faults the session and leaves none. */
    attach(element: HTMLElement, props?: Partial<DirectEditorProps>): void;
    detach(): void;
    /** Cancels the frame that moves the session to `ready`. */
    cancelReady(): void;
    faultView(error: unknown): void;
};

/** Tracks the view call in progress, so a node view throw the bridge caught faults that call. */
const createCalls = () => {
    let viewCall = false;
    let viewThrew = false;
    let thrownError: unknown;
    const call = <Result>(work: () => Result): { threw: boolean; value: Result | undefined } => {
        let value: Result | undefined;
        thrownError = undefined;
        viewCall = true;
        try {
            value = work();
        } catch (error) {
            viewThrew = true;
            thrownError = error;
        } finally {
            viewCall = false;
        }

        const threw = viewThrew;
        viewThrew = false;

        return { threw, value };
    };

    /** `true` when a call is running, which then reports the throw itself. */
    const caught = (error: unknown) => {
        if (!viewCall) {
            return false;
        }

        viewThrew = true;
        thrownError = error;

        return true;
    };

    return { call, caught, thrown: () => thrownError };
};

const surfaceAttributes = (args: ViewArgs, current: EditorState) => {
    const result: Record<string, string> = {};
    if (args.shown.mode() === 'readonly') {
        // A surface that is not contenteditable takes no focus by itself,
        // unless it is disabled, which leaves the Tab order.
        if (!args.mode.disabled()) {
            result.tabindex = '0';
        }

        result['aria-readonly'] = 'true';
    }

    if (isEmpty(current)) {
        result['data-rte-empty'] = '';
    }

    // Selection and copy keep working on a surface that takes no edits.
    if (args.lifecycle.is('transitioning')) {
        result['aria-busy'] = 'true';
    }

    // The surface keeps focus while a suggestion list shows options, and names the active one.
    const suggestion = activeSuggestion(current);
    if (suggestion !== null) {
        const option = suggestion.items[suggestion.index];
        if (option !== undefined) {
            result['aria-autocomplete'] = 'list';
            result['aria-controls'] = args.suggestionListId;
            result['aria-activedescendant'] = suggestionOptionId(args.suggestionListId, option.key);
        }
    }

    return result;
};

export const createView = (args: ViewArgs): ViewService => {
    const { call, caught, thrown } = createCalls();
    const host = createSurfaceHost(args, (current) => surfaceAttributes(args, current), call, caught, thrown);

    return {
        current: () => host.surface.view,
        get nodeViews() {
            return host.surface.nodeViews;
        },
        setNodeViews: (next) => {
            host.surface.nodeViews = next;
        },
        setMarkViews: (next) => {
            host.surface.markViews = next;
        },
        capture: (next) => {
            host.surface.built = next;
        },
        call,
        thrown,
        refresh: host.refresh,
        repaint: () => host.surface.view?.setProps({}),
        attach: host.attach,
        detach: host.detach,
        cancelReady: host.cancelReady,
        faultView: host.faultView,
    };
};
