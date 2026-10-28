/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkType, type Node } from 'prosemirror-model';

import { type JsonObject } from '#/model';
import { compiledModel } from '#/model/internal';

import { EDITS } from '../capabilities';
import { markRunAt, markRunAtPos } from '../transform/markRuns';

import { checkedAttrs } from './checked';
import { type DocumentApi } from './documentApi';
import { type ApiSource, rangeOf, sharedEdits, valuesOf } from './shared';

type Edits = ReturnType<typeof sharedEdits>;

/** The document and the edit helpers a mark read uses. */
type MarkContext = {
    source: ApiSource;
    edits: Edits;
};

const markType = (source: ApiSource, mark: string): MarkType | undefined => source.schema.marks[mark];

const runValue = (
    doc: Node,
    run: {
        from: number;
        to: number;
        text: string;
        attrs: Readonly<Record<string, unknown>>;
    },
) => ({
    attrs: valuesOf(run.attrs),
    text: run.text,
    range: rangeOf(doc, run.from, run.to),
});

const activeMark = (context: MarkContext, mark: string, attrs?: JsonObject) => {
    const { source, edits } = context;
    if (markType(source, mark) === undefined) {
        return false;
    }

    if (attrs === undefined) {
        return edits.capability(EDITS.toggleMark, { mark }).active(source.state());
    }

    return edits.capability(EDITS.setMark, { mark }).active(source.state(), attrs);
};

const markAttrs = (source: ApiSource, mark: string) => {
    const type = markType(source, mark);
    if (type === undefined) {
        return undefined;
    }

    const { storedMarks, selection } = source.state();
    const held = type.isInSet(storedMarks ?? selection.$from.marks());
    if (held === undefined) {
        return undefined;
    }

    return valuesOf(held.attrs);
};

const allowedMark = (source: ApiSource, mark: string) => {
    const type = markType(source, mark);
    if (type === undefined) {
        return false;
    }

    const { selection, doc } = source.state();
    let text = false;
    let takes = false;
    doc.nodesBetween(selection.from, selection.to, (node, _pos, parent) => {
        if (node.isText) {
            text = true;
            takes ||= parent !== null && parent.type.allowsMarkType(type);
        }
    });
    if (text) {
        return takes;
    }

    const { parent } = selection.$from;

    return parent.inlineContent && parent.type.allowsMarkType(type);
};

const markRun = (
    source: ApiSource,
    mark: string,
    options?: { extendToMarkRange?: boolean | 'touching'; at?: Element },
) => {
    const type = markType(source, mark);
    if (type === undefined) {
        return undefined;
    }

    const state = source.state();
    if (options?.at !== undefined) {
        const pos = source.positionAt(options.at);
        if (pos === undefined) {
            return undefined;
        }

        const atRun = markRunAtPos(state, pos, type);
        if (atRun === undefined) {
            return undefined;
        }

        return runValue(state.doc, atRun);
    }

    const run = markRunAt(state, type);
    if (run === undefined) {
        return undefined;
    }

    // Without `'touching'`, a caret at the run's trailing edge is outside it, as typing there is.
    const { selection } = state;
    if (options?.extendToMarkRange !== 'touching' && selection.empty && selection.from === run.to) {
        return undefined;
    }

    return runValue(state.doc, run);
};

const toggleMark = (context: MarkContext, mark: string, attrs?: JsonObject) => {
    const { source, edits } = context;
    if (markType(source, mark) === undefined) {
        return false;
    }

    if (attrs === undefined) {
        return edits.edit(edits.capability(EDITS.toggleMark, { mark }));
    }

    const checked = checkedAttrs(source.model, [mark], attrs, source.limits.maxAttributeLength, true);

    return checked !== undefined && edits.edit(edits.capability(EDITS.toggleMark, { mark, attrs: checked }));
};

const setMark = (
    context: MarkContext,
    mark: string,
    attrs: JsonObject,
    options?: { extendToMarkRange?: boolean | 'touching'; text?: string },
) => {
    const { source, edits } = context;
    if (markType(source, mark) === undefined) {
        return false;
    }

    const requested = options?.extendToMarkRange;
    const extendToMarkRange = requested ?? false;
    let text = {};
    if (options?.text !== undefined) {
        text = { text: options.text };
    }

    return edits.editWith(EDITS.setMark, { mark, extendToMarkRange }, [mark], attrs, true, text);
};

const removeMarks = (
    context: MarkContext,
    marks: string | readonly string[],
    options?: { extendToMarkRange?: boolean | 'touching'; wholeBlocks?: boolean },
) => {
    const { source, edits } = context;
    const named = typeof marks === 'string' ? [marks] : [...marks];
    const installed = named.filter((mark) => markType(source, mark) !== undefined);
    if (installed.length === 0) {
        return false;
    }

    const requested = options?.extendToMarkRange;
    const extendToMarkRange = requested ?? false;
    const wholeBlocks = options?.wholeBlocks === true;

    return edits.edit(
        edits.capability(EDITS.removeMark, {
            installed,
            extendToMarkRange,
            wholeBlocks,
        }),
    );
};

const reapplyMarks = (context: MarkContext, names: readonly string[]) =>
    context.edits.edit(context.edits.capability(EDITS.reapplyMark, { installed: [...names] }));

/** The mark members of the document API. */
export const marksApi = (source: ApiSource): Pick<DocumentApi, 'marks'> => {
    const context: MarkContext = { source, edits: sharedEdits(source) };

    return {
        marks: {
            active: (mark, attrs) => activeMark(context, mark, attrs),
            attrs: (mark) => markAttrs(source, mark),
            installed: () => compiledModel(source.model).marks.map(({ name }) => name),
            allowed: (mark) => allowedMark(source, mark),
            run: (mark, options) => markRun(source, mark, options),
            toggle: (mark, attrs) => toggleMark(context, mark, attrs),
            set: (mark, attrs, options) => setMark(context, mark, attrs, options),
            remove: (named, options) => removeMarks(context, named, options),
            reapply: (names) => reapplyMarks(context, names),
        },
    };
};
