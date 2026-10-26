/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FormEvent, type RefObject, useEffect, useState } from 'react';

import { type EditorApi, type SelectionHandle, type useEditorOverlay } from '#/bridge/plugin';
import { checkHref, type HrefPolicy } from '#/model';

import { withScheme, type Destination } from './destination';
import { type LinkPopoverStrings, listed, type Problem, SET_LINK } from './linkPopoverModel';

/** What Apply does: checks the destination, runs `link.set`, and says why it did not link. */
export const useLinkApply = (
    api: EditorApi | undefined,
    strings: LinkPopoverStrings,
    policy: HrefPolicy | undefined,
    initialText: string,
    target: SelectionHandle | undefined,
    overlay: ReturnType<typeof useEditorOverlay>,
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
    /** What the field's description says for `next`. */
    const messageOf = (next: Problem | undefined): string => {
        if (next === 'scheme') {
            const schemes = policy?.allowedSchemes;

            return strings.schemesAllowed(
                listed(
                    (schemes ?? []).map((scheme) => `${scheme}:`),
                    lang,
                ),
            );
        }

        if (next === 'host') {
            const hosts = policy?.allowedHosts;

            return strings.hostsAllowed(listed(hosts ?? [], lang));
        }

        if (next === 'removed') {
            return strings.removed;
        }

        return strings.invalid;
    };

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

        const visible = text === '' ? fallback : text;
        // Text the author left as it opened sends none, so what was typed in the link meanwhile stays; a new link inserts it.
        const unchanged = !here && initialText !== '' && visible === initialText;
        const value = {
            href: destination,
            ...(unchanged ? {} : { text: visible }),
            openInNewWindow: newWindow,
            styleId: styleId === '' ? null : styleId,
        };
        let options: { readonly target: SelectionHandle } | undefined;
        if (!here && target !== undefined) {
            options = { target };
        }

        const result = api.commands.execute(SET_LINK, value, options);
        if (result.status === 'rejected') {
            if (result.code === 'target-invalid') {
                reject('removed');
            } else if (result.code === 'invalid-payload') {
                reject('invalid');
            } else {
                reject('failed');
            }

            return;
        }

        overlay.returnFocusTo(null);
        close(false);
    };

    const checked = () => {
        const destination = withScheme(href);
        const result = checkHref(destination, policy);
        // An empty destination parses as the page itself, which is no link.
        if (result.ok && result.href !== '') {
            return result.href;
        }

        const unchecked = checkHref(destination);
        if (result.ok || !unchecked.ok || unchecked.href === '') {
            reject('invalid');
        } else if (result.code === 'host-not-allowed') {
            reject('host');
        } else {
            reject('scheme');
        }

        return undefined;
    };

    const apply = (event: FormEvent) => {
        event.preventDefault();
        const destination = checked();
        if (destination !== undefined) {
            run(destination, false);
        }
    };

    const insertNew = () => {
        const destination = checked();
        if (destination !== undefined) {
            run(destination, true);
        }
    };

    const pick = (position: number) => {
        const result = results[position];
        if (result !== undefined) {
            run(result.href, false, result.label);
        }
    };

    return [problem, setProblem, messageOf, apply, insertNew, pick] as const;
};
