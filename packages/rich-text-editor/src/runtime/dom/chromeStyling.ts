/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMSerializer, type Mark } from 'prosemirror-model';
import { Decoration, DecorationSet, type MarkViewConstructor } from 'prosemirror-view';

import { checkHref, type ColorToken, type ListLevels, type PresentationStyle } from '#/model';
import {
    type DirectedRun,
    passageDirection,
    COLOR_PROPERTIES,
    listDepths,
    listLevelStyle,
    styleOfNode,
    colorOf,
    ownValue,
} from '#/model/internal';

import {
    firstBlockId,
    labelsFirstBlock,
    type ViewMarkViews,
    type ViewNode,
    type ViewProps,
    type ViewSchema,
} from './viewBridge';

/** What the view styles content with: the presentation's recipes and colours, and who hears an unknown style ID. */
export type ChromeStyles = {
    styles: readonly PresentationStyle[];
    colorTokens: readonly ColorToken[];
    onUnknown: (path: string) => void;
};

/** The text runs of a textblock, which `passageDirection` reads. */
const runsOf = (block: ViewNode): DirectedRun[] => {
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

/** What the content decorations read, which the chrome view changes between draws. */
export type DecorationInputs = {
    surface: HTMLElement;
    domId: () => string;
    /** Whether a node view is registered for the node type `name`. */
    hasView: (name: string) => boolean;
    levels: ListLevels | undefined;
    styles: ChromeStyles | undefined;
    unknown: (styleId: string, path: string) => void;
};

/**
 * A node decoration with its list level style on each list whose `marker` is null, as the reader writes it, one
 * with the `firstBlockId` on the first block of each node `labelsFirstBlock` names, the recipe class of each
 * styled node, and the `dir` of a textblock whose first letter sits in a `language` passage with one, as the reader
 * writes it.
 */
const contentDecorations = (doc: ViewNode, inputs: DecorationInputs): Decoration[] => {
    const { surface, domId, hasView, levels, styles, unknown } = inputs;
    const found: Decoration[] = [];
    const depths = listDepths();
    let recipes: readonly PresentationStyle[] = [];
    if (styles !== undefined) {
        recipes = styles.styles;
    }

    /** The recipe class of a node or mark, reporting a stored style ID the styles do not hold. */
    const classOf = (type: string, attrs: Readonly<Record<string, unknown>>, path: string) => {
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
    const inline = (block: ViewNode, path: string) => {
        for (let index = 0; index < block.childCount; index += 1) {
            for (const [markIndex, mark] of block.child(index).marks.entries()) {
                classOf(mark.type.name, mark.attrs, `${path}/content/${index}/marks/${markIndex}`);
            }
        }
    };

    const visit = (parent: ViewNode, start: number, parentPath: string) => {
        let pos = start;
        for (let index = 0; index < parent.childCount; index += 1) {
            const child = parent.child(index);
            const path = `${parentPath}/content/${index}`;
            const className = classOf(child.type.name, child.attrs, path);
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

            const viewed = hasView(child.type.name);
            const labeled = labelsFirstBlock(child);
            if (viewed && labeled !== undefined) {
                found.push(
                    Decoration.node(pos + 1, pos + 1 + labeled.block.nodeSize, {
                        id: firstBlockId(surface, labeled.nodeId, domId),
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

/** The view's decoration prop: the content decorations of the current inputs, and the selection while `shown` holds. */
export type ContentDecorations = {
    decorations: NonNullable<ViewProps['decorations']>;
    /** Drops the decorations drawn so far, so the next draw derives them again. */
    reset(): void;
};

/** Builds the decoration prop; `read` gives the current inputs, and none draws no content decoration. */
export const createContentDecorations = (
    read: () => DecorationInputs | undefined,
    shown: () => boolean,
): ContentDecorations => {
    // A selection change keeps the document, so it draws no content decoration again.
    let markers = new WeakMap<ViewNode, DecorationSet>();
    const listsOf = (doc: ViewNode) => {
        const inputs = read();
        if (inputs === undefined) {
            return DecorationSet.empty;
        }

        let lists = markers.get(doc);
        if (lists === undefined) {
            lists = DecorationSet.create(doc, contentDecorations(doc, inputs));
            markers.set(doc, lists);
        }

        return lists;
    };

    return {
        decorations: (state) => {
            const { doc, selection } = state;
            const lists = listsOf(doc);
            if (!shown() || selection.empty) {
                return lists;
            }

            return lists.add(doc, [Decoration.inline(selection.from, selection.to, { 'data-rte-selection': '' })]);
        },
        reset: () => {
            markers = new WeakMap();
        },
    };
};

/** A styled or coloured mark's element, with the recipe class this view last gave it. */
type MarkElement = {
    dom: HTMLElement;
    mark: Mark;
    className: string | undefined;
};

/** Gives a mark's own element its recipe class and inline colour from `styles`, as the reader writes them. */
const styleMark = (element: MarkElement, styles: ChromeStyles | undefined) => {
    const { dom, mark } = element;
    const attrs = mark.attrs;
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
    const href: unknown = mark.attrs.href;

    return mark.type.name === 'link' && typeof href === 'string' && !checkHref(href).ok;
};

/** The mark views of the styled and coloured marks, and the way to restyle the ones mounted. */
export type MarkStyler = {
    /** The mark views of `schema`'s styled and coloured marks, which carry the recipe class and colour on the mark's own element. */
    views(schema: ViewSchema, styles: () => ChromeStyles | undefined): ViewMarkViews;
    /** Restyles the mounted mark views in place. */
    restyle(styles: ChromeStyles | undefined): void;
};

/** A mark styler with no mounted mark view yet. */
export const createMarkStyler = (): MarkStyler => {
    // The elements of the mounted mark views, which a new presentation restyles in place.
    const marks = new Set<MarkElement>();

    return {
        views: (schema, styles) => {
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
                    const styleId: unknown = mark.attrs.styleId;
                    if (typeof styleId === 'string' && !dom.hasAttribute('data-rte-style')) {
                        dom.setAttribute('data-rte-style', styleId);
                    }

                    const element: MarkElement = { dom, mark, className: undefined };
                    styleMark(element, styles());
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
        restyle: (styles) => {
            for (const element of marks) {
                styleMark(element, styles);
            }
        },
    };
};
