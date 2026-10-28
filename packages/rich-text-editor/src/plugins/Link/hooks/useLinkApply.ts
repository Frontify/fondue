/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FormEvent, type RefObject, useEffect, useState } from 'react';

import { type EditorOverlay } from '#/bridge/pluginApi/define';
import { type EditorApi, type SelectionHandle } from '#/bridge/pluginApi/plugin';
import { type HrefPolicy } from '#/model';

import { type Destination } from '../helpers/destination';
import { checkedDestination, problemMessage, rejectedLink } from '../helpers/linkCommand';
import { type LinkPopoverStrings, type Problem } from '../helpers/linkPopoverModel';

/** What Apply does: checks the destination, runs `link.set`, and says why it did not link. */
export const useLinkApply = (
    api: EditorApi | undefined,
    strings: LinkPopoverStrings,
    policy: HrefPolicy | undefined,
    initialText: string,
    target: SelectionHandle | undefined,
    overlay: EditorOverlay,
    close: (next: boolean) => void,
    destinationRef: RefObject<HTMLInputElement | null>,
    href: string,
    text: string,
    newWindow: boolean,
    styleId: string,
    results: readonly Destination[],
) => {
    // The UI locale, which lists the allowed schemes and hosts.
    const lang = api?.locale();
    const [problem, setProblem] = useState<Problem | undefined>(undefined);
    // Each rejected Apply, after whose error renders focus moves to the field that holds it.
    const [rejections, setRejections] = useState(0);
    useEffect(() => {
        if (rejections > 0) {
            destinationRef.current?.focus();
        }
    }, [destinationRef, rejections]);
    const messageOf = (next: Problem | undefined): string => problemMessage(next, strings, policy, lang);
    const reject = (next: Problem) => {
        setProblem(next);
        const field = destinationRef.current;
        // A refusal with no field to focus is said in the editor's polite live region.
        if (next === 'failed') {
            api?.announce(strings.failed);
        } else if (field !== null && field.ownerDocument.activeElement === field) {
            // A field that already has focus hears no focus event, so it would not read its new description.
            api?.announce(messageOf(next));
        } else {
            setRejections((count) => count + 1);
        }
    };

    /** Runs `link.set`, at the captured target unless `here`, with `fallback` as the text when none is typed. */
    const run = (destination: string, here: boolean, fallback = '') => {
        if (api === undefined) {
            return;
        }

        const rejected = rejectedLink(api, destination, here, fallback, text, initialText, newWindow, styleId, target);
        if (rejected !== undefined) {
            reject(rejected);

            return;
        }

        overlay.returnFocusTo(null);
        close(false);
    };

    const applyChecked = (here: boolean) => {
        const checked = checkedDestination(href, policy);
        if ('problem' in checked) {
            reject(checked.problem);

            return;
        }

        run(checked.href, here);
    };

    const apply = (event: FormEvent) => {
        event.preventDefault();
        applyChecked(false);
    };

    const insertNew = () => {
        applyChecked(true);
    };

    const pick = (position: number) => {
        const result = results[position];
        if (result !== undefined) {
            run(result.href, false, result.label);
        }
    };

    return [problem, setProblem, messageOf, apply, insertNew, pick] as const;
};
