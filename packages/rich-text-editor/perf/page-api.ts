/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PerfFixtureName } from '#/model/__tests__/fixtures/perf/documents';

export type TimedEvent = {
    name: string;
    duration: number;
    interactionId: number;
};

/** What the harness in the page lets a performance test call through `page.evaluate`. */
export type PageApi = {
    /** Mounts an editor over `fixture` and answers the ms from the render call to ready. */
    mount(fixture: PerfFixtureName): Promise<number>;
    /** Mounts `count` editors over the `small` fixture in one tree and answers the ms until all are ready. */
    mountMany(count: number): Promise<number>;
    unmount(): void;
    /** Puts the caret in the middle of the first editor and focuses it. */
    focusMiddle(): void;
    observeEvents(threshold: number): void;
    events(): readonly TimedEvent[];
    resetEvents(): void;
    commits(): readonly number[];
    resetCommits(): void;
    nextPaint(): Promise<void>;
    /** Moves the caret `moves` times between a plain and a bold run; answers each toolbar notification in ms. */
    moveBetweenBoldAndPlain(moves: number): Promise<readonly number[]>;
    snapshotAfterEdit(): number;
    paste(bytes: number): Promise<number>;
    command(id: string): Promise<number>;
    /** The ms from running `id` until focus sits inside an element matching `selectors`, or `null` after 2 s. */
    openedWithFocus(id: string, selectors: string): Promise<number | null>;
};
