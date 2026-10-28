/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ChangeEvent, type RefObject } from 'react';

import { type EditorOverlay } from '#/bridge/pluginApi/define';
import { type EditorApi, type SelectionHandle } from '#/bridge/pluginApi/plugin';
import { type HrefPolicy } from '#/model';

import { FIELD_PROBLEMS, type LinkPopoverStrings, type LinkSearch } from '../helpers/linkPopoverModel';

import { useDestinationField } from './useDestinationField';
import { useDestinationSearch } from './useDestinationSearch';
import { useLinkApply } from './useLinkApply';

/** The destination search, Apply, and the change that clears a field error. */
export const useLinkEditing = ({
    api,
    search,
    policy,
    strings,
    initialText,
    target,
    overlay,
    close,
    href,
    setHref,
    typed,
    setTyped,
    text,
    newWindow,
    styleId,
    destinationRef,
    listId,
}: {
    api: EditorApi | undefined;
    search: LinkSearch | undefined;
    policy: HrefPolicy | undefined;
    strings: LinkPopoverStrings;
    initialText: string;
    target: SelectionHandle | undefined;
    overlay: EditorOverlay;
    close: (next: boolean) => void;
    href: string;
    setHref: (href: string) => void;
    typed: boolean;
    setTyped: (typed: boolean) => void;
    text: string;
    newWindow: boolean;
    styleId: string;
    destinationRef: RefObject<HTMLInputElement | null>;
    listId: string;
}) => {
    const [results, index, setIndex] = useDestinationSearch(api, search, policy, href.trim(), typed, strings);
    const [problem, setProblem, messageOf, apply, insertNew, pick] = useLinkApply(
        api,
        strings,
        policy,
        initialText,
        target,
        overlay,
        close,
        destinationRef,
        href,
        text,
        newWindow,
        styleId,
        results,
    );
    const invalid = FIELD_PROBLEMS.has(problem);
    const shown = results.length > 0;
    const [onKeyDown, combobox] = useDestinationField(search, results, index, setIndex, pick, listId);
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHref(event.target.value);
        setTyped(true);
        if (invalid) {
            setProblem(undefined);
        }
    };

    return {
        problem,
        invalid,
        messageOf,
        apply,
        insertNew,
        results,
        index,
        setIndex,
        pick,
        shown,
        onKeyDown,
        combobox,
        onChange,
    };
};
