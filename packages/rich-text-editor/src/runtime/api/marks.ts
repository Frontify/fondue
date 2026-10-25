/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkType, type Node } from 'prosemirror-model';

import { compiledModel } from '#/model/internal';

import { EDITS } from '../capabilities';
import { type DocumentApi } from '../documentApi';
import { markRunAt, markRunAtPos } from '../markRuns';

import { checkedAttrs } from './checked';
import { type ApiSource, rangeOf, sharedEdits, valuesOf } from './shared';

/** The mark members of the document API. */
export const marksApi = (source: ApiSource): Pick<DocumentApi, 'marks'> => {
    const { schema, model, limits } = source;
    const { maxAttributeLength } = limits;
    const { edit, capability, editWith } = sharedEdits(source);
    const markType = (mark: string): MarkType | undefined => schema.marks[mark];
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
    return {
        marks: {
            active: (mark, attrs) => {
                if (markType(mark) === undefined) {
                    return false;
                }
                if (attrs === undefined) {
                    return capability(EDITS.toggleMark, { mark }).active(source.state());
                }
                return capability(EDITS.setMark, { mark }).active(source.state(), attrs);
            },
            attrs: (mark) => {
                const type = markType(mark);
                if (type === undefined) {
                    return undefined;
                }
                const { storedMarks, selection } = source.state();
                const held = type.isInSet(storedMarks ?? selection.$from.marks());
                if (held === undefined) {
                    return undefined;
                }
                return valuesOf(held.attrs);
            },
            installed: () => compiledModel(model).marks.map(({ name }) => name),
            allowed: (mark) => {
                const type = markType(mark);
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
            },
            run: (mark, options) => {
                const type = markType(mark);
                if (type === undefined) {
                    return undefined;
                }
                const state = source.state();
                if (options?.at !== undefined) {
                    const pos = source.positionAt(options.at);
                    const run = pos === undefined ? undefined : markRunAtPos(state, pos, type);
                    return run === undefined ? undefined : runValue(state.doc, run);
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
            },
            toggle: (mark, attrs) => {
                if (markType(mark) === undefined) {
                    return false;
                }
                if (attrs === undefined) {
                    return edit(capability(EDITS.toggleMark, { mark }));
                }
                const checked = checkedAttrs(model, [mark], attrs, maxAttributeLength, true);
                return checked !== undefined && edit(capability(EDITS.toggleMark, { mark, attrs: checked }));
            },
            set: (mark, attrs, options) => {
                if (markType(mark) === undefined) {
                    return false;
                }
                const requested = options?.extendToMarkRange;
                const extendToMarkRange = requested ?? false;
                const text = options?.text === undefined ? {} : { text: options.text };
                return editWith(EDITS.setMark, { mark, extendToMarkRange }, [mark], attrs, true, text);
            },
            remove: (marks, options) => {
                const installed = (typeof marks === 'string' ? [marks] : [...marks]).filter(
                    (mark) => markType(mark) !== undefined,
                );
                if (installed.length === 0) {
                    return false;
                }
                const requested = options?.extendToMarkRange;
                const extendToMarkRange = requested ?? false;
                const wholeBlocks = options?.wholeBlocks === true;
                return edit(
                    capability(EDITS.removeMark, {
                        installed,
                        extendToMarkRange,
                        wholeBlocks,
                    }),
                );
            },
            reapply: (names) => edit(capability(EDITS.reapplyMark, { installed: [...names] })),
        },
    };
};
