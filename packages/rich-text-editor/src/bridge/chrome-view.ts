/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMSerializer, type Mark, type Node as ProseMirrorNode, type Schema } from 'prosemirror-model';
import {
    Decoration,
    DecorationSet,
    type DirectEditorProps,
    type EditorView,
    type MarkViewConstructor,
    type NodeViewConstructor,
} from 'prosemirror-view';

import { checkHref, type ColorToken, type JsonObject, type ListLevels, type PresentationStyle } from '#/model';
import { type DirectedRun, passageDirection } from '#/model/html-spec';
import { COLOR_PROPERTIES, listDepths, listLevelStyle, styleOfNode } from '#/model/output';
import { colorOf } from '#/model/styles';
import { ownValue } from '#/model/values';

import { firstBlockId, labelsFirstBlock } from './node-views';

// ProseMirror's own default margin, kept beyond the space the chrome covers.
const MARGIN = 5;

/** What editor chrome sets on the view: the selection it keeps visible and the space it covers at the viewport edges. */
export interface ChromeView {
    /** The chrome's props for a view about to be built on `surface` with `nodeViews`, so its first draw carries them. */
    props(surface: HTMLElement, nodeViews: Readonly<Record<string, NodeViewConstructor>>): Partial<DirectEditorProps>;
    /** Takes the view built with `props`, which later chrome changes redraw. */
    take(view: EditorView): void;
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
    markViews(schema: Schema): Readonly<Record<string, MarkViewConstructor>>;
}

/** What the view styles content with: the presentation's recipes and colours, and who hears an unknown style ID. */
export interface ChromeStyles {
    readonly styles: readonly PresentationStyle[];
    readonly colorTokens: readonly ColorToken[];
    readonly onUnknown: (path: string) => void;
}
// Node chrome controls keep the caret's top margin clear of the sticky toolbar when they scroll into view.
const CHROME_SCROLL_MARGIN = '--rte-chrome-scroll-margin';

/** Writes the chrome scroll margin while a toolbar covers the top, and leaves the surface's attributes alone otherwise. */
const writeChromeMargin = (view: EditorView | undefined, height: number) => {
    if (view === undefined) {
        return;
    }
    if (height === 0) {
        view.dom.style.removeProperty(CHROME_SCROLL_MARGIN);
        return;
    }
    view.dom.style.setProperty(CHROME_SCROLL_MARGIN, `${height + MARGIN}px`);
};

/** The text runs of a textblock, which `passageDirection` reads. */
const runsOf = (block: ProseMirrorNode): DirectedRun[] => {
    const runs: DirectedRun[] = [];
    for (let index = 0; index < block.childCount; index += 1) {
        const child = block.child(index);
        if (child.isText) {
            const language = child.marks.find((mark) => mark.type.name === 'language');
            const dir: unknown = language?.attrs.dir;
            runs.push({ text: child.text ?? '', dir });
        }
    }
    return runs;
};

/**
 * A node decoration with its list level style on each list whose `marker` is null, as the reader writes it, one
 * with the `firstBlockId` on the first block of each node `labelsFirstBlock` names, the recipe class of each
 * styled node, and the `dir` of a textblock whose first letter sits in a `language` passage with one, as the reader
 * writes it.
 */
const contentDecorations = (
    surface: HTMLElement,
    nodeViews: Readonly<Record<string, NodeViewConstructor>>,
    doc: ProseMirrorNode,
    levels: ListLevels | undefined,
    styles: ChromeStyles | undefined,
    unknown: (styleId: string, path: string) => void,
): Decoration[] => {
    const found: Decoration[] = [];
    const depths = listDepths();
    const recipes = styles === undefined ? [] : styles.styles;
    /** The recipe class of a node or mark, reporting a stored style ID the styles do not hold. */
    const classOf = (type: string, attrs: JsonObject, path: string) => {
        const resolution = styleOfNode(recipes, type, attrs);
        if (resolution.unknown && typeof attrs.styleId === 'string') {
            unknown(attrs.styleId, path);
        }
        if (resolution.style === undefined) {
            return undefined;
        }
        return resolution.style.className;
    };
    /** Reports the unknown style IDs of the marks on a textblock's inline children, which their mark views style. */
    const inline = (block: ProseMirrorNode, path: string) => {
        for (let index = 0; index < block.childCount; index += 1) {
            for (const [markIndex, mark] of block.child(index).marks.entries()) {
                classOf(mark.type.name, mark.attrs as JsonObject, `${path}/content/${index}/marks/${markIndex}`);
            }
        }
    };
    const visit = (parent: ProseMirrorNode, start: number, parentPath: string) => {
        let pos = start;
        for (let index = 0; index < parent.childCount; index += 1) {
            const child = parent.child(index);
            const path = `${parentPath}/content/${index}`;
            const className = classOf(child.type.name, child.attrs as JsonObject, path);
            if (className !== undefined) {
                found.push(Decoration.node(pos, pos + child.nodeSize, { class: className }));
            }
            if (child.isTextblock) {
                inline(child, path);
                const direction = passageDirection(runsOf(child));
                if (direction !== undefined && typeof child.attrs.dir !== 'string') {
                    found.push(Decoration.node(pos, pos + child.nodeSize, { dir: direction }));
                }
            }
            const viewed = Object.hasOwn(nodeViews, child.type.name);
            const labeled = labelsFirstBlock(child);
            if (viewed && labeled !== undefined) {
                found.push(
                    Decoration.node(pos + 1, pos + 1 + labeled.block.nodeSize, {
                        id: firstBlockId(surface, labeled.nodeId),
                    }),
                );
            }
            depths.within(child.type.name, (entered) => {
                if (entered !== undefined) {
                    const style = listLevelStyle(entered.kind, entered.depth, levels);
                    if (style !== undefined && child.attrs.marker === null) {
                        found.push(Decoration.node(pos, pos + child.nodeSize, { style }));
                    }
                }
                if (!child.isTextblock) {
                    visit(child, pos + 1, path);
                }
            });
            pos += child.nodeSize;
        }
    };
    visit(doc, 0, '/content');
    return found;
};

/** A styled or coloured mark's element, with the recipe class this view last gave it. */
interface MarkElement {
    readonly dom: HTMLElement;
    readonly mark: Mark;
    className: string | undefined;
}

/** Gives a mark's own element its recipe class and inline colour from `styles`, as the reader writes them. */
const styleMark = (element: MarkElement, styles: ChromeStyles | undefined) => {
    const { dom, mark } = element;
    const attrs = mark.attrs as JsonObject;
    let className: string | undefined;
    let color: string | undefined;
    if (styles !== undefined) {
        className = styleOfNode(styles.styles, mark.type.name, attrs).style?.className;
        color = colorOf(styles.colorTokens, attrs);
    }
    if (element.className !== undefined) {
        dom.classList.remove(element.className);
    }
    if (className !== undefined) {
        dom.classList.add(className);
    }
    element.className = className;
    const property = ownValue(COLOR_PROPERTIES, mark.type.name);
    if (property === undefined) {
        return;
    }
    if (color === undefined) {
        dom.style.removeProperty(property);
    } else {
        dom.style.setProperty(property, color);
    }
};

/** Whether `mark` is a link whose `href` fails the URL check. */
const unlinked = (mark: Mark): boolean => {
    const { href } = mark.attrs as JsonObject;
    return mark.type.name === 'link' && typeof href === 'string' && !checkHref(href).ok;
};

export const createChromeView = (): ChromeView => {
    let view: EditorView | undefined;
    let surface: HTMLElement | undefined;
    let nodeViews: Readonly<Record<string, NodeViewConstructor>> = {};
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
    // The elements of the mounted mark views, which a new presentation restyles in place.
    const marks = new Set<MarkElement>();
    const unknown = (styleId: string, path: string) => {
        const listener = styles;
        if (listener === undefined || reported.has(styleId)) {
            return;
        }
        reported.add(styleId);
        // Decorations draw inside a view update, which a host listener must not reenter.
        queueMicrotask(() => listener.onUnknown(path));
    };
    // A selection change keeps the document, so it draws no content decoration again.
    let markers = new WeakMap<ProseMirrorNode, DecorationSet>();
    const listsOf = (doc: ProseMirrorNode) => {
        if (surface === undefined) {
            return DecorationSet.empty;
        }
        let lists = markers.get(doc);
        if (lists === undefined) {
            lists = DecorationSet.create(doc, contentDecorations(surface, nodeViews, doc, levels, styles, unknown));
            markers.set(doc, lists);
        }
        return lists;
    };
    const decorations = (state: EditorView['state']) => {
        const { doc, selection } = state;
        const lists = listsOf(doc);
        if (!shown || selection.empty) {
            return lists;
        }
        return lists.add(doc, [Decoration.inline(selection.from, selection.to, { 'data-rte-selection': '' })]);
    };
    return {
        props: (next, views) => {
            surface = next;
            nodeViews = views;
            markers = new WeakMap();
            reported = new Set();
            return { decorations, scrollMargin: margin, scrollThreshold: threshold };
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
            view?.setProps({});
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
            markers = new WeakMap();
            view?.setProps({});
        },
        setStyles: (next) => {
            if (styles === next) {
                return;
            }
            styles = next;
            markers = new WeakMap();
            for (const element of marks) {
                styleMark(element, styles);
            }
            view?.setProps({});
        },
        markViews: (schema) => {
            const views: Record<string, MarkViewConstructor> = {};
            for (const [name, type] of Object.entries(schema.marks)) {
                if (!Object.hasOwn(type.spec.attrs ?? {}, 'styleId') && !Object.hasOwn(COLOR_PROPERTIES, name)) {
                    continue;
                }
                views[name] = (mark, markView, inline) => {
                    // A link whose `href` fails the check shows its text alone, as the reader and `toHTML` write it.
                    if (unlinked(mark)) {
                        const dom = markView.dom.ownerDocument.createElement('span');
                        return { dom, contentDOM: dom };
                    }
                    const spec = type.spec.toDOM?.(mark, inline);
                    if (spec === undefined) {
                        throw new Error(`The mark ${name} has no DOM output.`);
                    }
                    const { dom, contentDOM } = DOMSerializer.renderSpec(markView.dom.ownerDocument, spec);
                    const { styleId } = mark.attrs as JsonObject;
                    if (typeof styleId === 'string' && !dom.hasAttribute('data-rte-style')) {
                        dom.setAttribute('data-rte-style', styleId);
                    }
                    const element: MarkElement = { dom, mark, className: undefined };
                    styleMark(element, styles);
                    marks.add(element);
                    return {
                        dom,
                        contentDOM: contentDOM ?? null,
                        // A restyle writes the mark element's class and colour, which is no content change to read back.
                        ignoreMutation: (mutation) => mutation.type === 'attributes' && mutation.target === dom,
                        destroy: () => {
                            marks.delete(element);
                        },
                    };
                };
            }
            return views;
        },
    };
};

/** Ends a composition while focus stays in the surface: the browser commits composed text when the surface blurs. */
export const endComposition = (view: EditorView | undefined): void => {
    if (view === undefined) {
        return;
    }
    view.dom.blur();
    view.focus();
};

/** The node chrome toolbar of the innermost node at the selection that has one: the selected node or the node holding the caret. */
export const nodeChromeAt = (view: EditorView): HTMLElement | null => {
    const { selection } = view.state;
    let node: Node | null = view.domAtPos(selection.head).node;
    if ('node' in selection) {
        node = view.nodeDOM(selection.from);
    }
    let element: HTMLElement | null = null;
    if (node instanceof HTMLElement) {
        element = node;
    } else if (node !== null) {
        element = node.parentElement;
    }
    for (; element !== null && element !== view.dom; element = element.parentElement) {
        const chrome = element.querySelector(':scope > [data-rte-chrome]');
        if (chrome === null) {
            continue;
        }
        // Content a view places inside its chrome holds the chrome of other nodes, never this node's.
        const toolbar = [...chrome.querySelectorAll('[data-rte-node-chrome]')].find((candidate) => {
            const content = candidate.closest('[data-rte-content]');
            return content === null || !chrome.contains(content);
        });
        if (toolbar instanceof HTMLElement) {
            return toolbar;
        }
    }
    return null;
};
