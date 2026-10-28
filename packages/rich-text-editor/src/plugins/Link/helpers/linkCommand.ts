/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorApi, type SelectionHandle } from '#/bridge/pluginApi/plugin';
import { checkHref, type HrefPolicy } from '#/model';

import { withScheme } from './destination';
import { listed, type LinkPopoverStrings, type Problem, SET_LINK } from './linkPopoverModel';

/** A destination the check accepts, or the problem that keeps the popover open. */
export const checkedDestination = (
    href: string,
    policy: HrefPolicy | undefined,
): { href: string } | { problem: Problem } => {
    const destination = withScheme(href);
    const result = checkHref(destination, policy);
    // An empty destination parses as the page itself, which is no link.
    if (result.ok && result.href !== '') {
        return { href: result.href };
    }

    const unchecked = checkHref(destination);
    if (result.ok || !unchecked.ok || unchecked.href === '') {
        return { problem: 'invalid' };
    }

    if (result.code === 'host-not-allowed') {
        return { problem: 'host' };
    }

    return { problem: 'scheme' };
};

/** What the field's description says for `next`. */
export const problemMessage = (
    next: Problem | undefined,
    strings: LinkPopoverStrings,
    policy: HrefPolicy | undefined,
    lang: string | undefined,
): string => {
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

/** Runs `link.set` and reports why it did not link. `undefined` when the command ran. */
export const rejectedLink = (
    api: EditorApi,
    destination: string,
    here: boolean,
    fallback: string,
    text: string,
    initialText: string,
    newWindow: boolean,
    styleId: string,
    target: SelectionHandle | undefined,
): Problem | undefined => {
    let visible = text;
    if (text === '') {
        visible = fallback;
    }

    // Text the author left as it opened sends none, so what was typed in the link meanwhile stays; a new link inserts it.
    const unchanged = !here && initialText !== '' && visible === initialText;
    let chosenStyle: string | null = null;
    if (styleId !== '') {
        chosenStyle = styleId;
    }

    const value = {
        href: destination,
        ...(unchanged ? {} : { text: visible }),
        openInNewWindow: newWindow,
        styleId: chosenStyle,
    };
    let options: { target: SelectionHandle } | undefined;
    if (!here && target !== undefined) {
        options = { target };
    }

    const result = api.commands.execute(SET_LINK, value, options);
    if (result.status !== 'rejected') {
        return undefined;
    }

    if (result.code === 'target-invalid') {
        return 'removed';
    }

    if (result.code === 'invalid-payload') {
        return 'invalid';
    }

    return 'failed';
};
