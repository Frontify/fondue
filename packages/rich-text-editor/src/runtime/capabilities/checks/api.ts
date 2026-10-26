/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentIssue } from '#/model';

/** An issue of the last content checks run, as the issues panel lists it. */
export type CheckedIssue = {
    readonly issue: ContentIssue;
    /** Stays the same from run to run while the rule is reported at the same place, unlike `issue.id`. */
    readonly key: string;
    /** The text it names in the current document, else an image's alternative text or label; empty when it names none. */
    readonly text: string;
    /** The author dismissed it for this session, until what it names changes. */
    readonly dismissed: boolean;
};

/** The issues of the last content checks run, in document order, and how many times the checks ran in this session. */
export type ContentChecksResult = {
    readonly issues: readonly CheckedIssue[];
    readonly runs: number;
};

/** The session's content checks, which the issues panel reads and acts through. */
export type ContentChecksApi = {
    /** The results of the last run, the same object until they or the document change. */
    current(): ContentChecksResult;
    /** Runs the checks now, unless input is composing; `true` when they ran. */
    run(): boolean;
    /**
     * Selects what the issue `key` names in the current document, scrolled into view, and returns that issue. With
     * `recheck`, or for an issue from an older `sequence`, the checks run again first, and only the same rule reported
     * again on the node it named, by `nodeId` or on its mapped range, is returned; `undefined`, selecting nothing,
     * when it names nothing now.
     */
    select(key: string, recheck: boolean): ContentIssue | undefined;
    /** Dismisses the warning or review `id` of the last run for this session, until what it names changes. */
    dismiss(id: string): void;
    /**
     * Runs the checks and marks the surface with `icons` by severity until the returned function runs, again when the
     * document is replaced; `opened` hears the run count after each of those runs.
     */
    open(icons: Partial<Record<ContentIssue['severity'], Element>>, opened: (runs: number) => void): () => void;
    /** Runs `action` now, or, while a composition is open, ends it and runs `action` once input has settled, and not at all when it does not settle. */
    afterInput(action: () => void): void;
};
