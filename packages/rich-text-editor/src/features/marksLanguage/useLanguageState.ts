/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FormEvent, useCallback, useEffect, useId, useRef, useState } from 'react';

import { useEditorDialog } from '#/bridge/define';
import { type OverlayProps, useEditorApi } from '#/bridge/plugin';

import {
    SET_LANGUAGE,
    currentLanguage,
    directionOf,
    languageOptions,
    languageStrings,
    localeOf,
    offeredLanguages,
} from './languageModel';

export const useLanguageState = ({ opener, close }: OverlayProps) => {
    const api = useEditorApi();
    const dialog = useEditorDialog(opener, close);
    const [current] = useState(() => currentLanguage(api));
    const strings = languageStrings(api);
    const languages = languageOptions(api);
    const locale = localeOf(api);
    const [tag, setTag] = useState(current.lang);
    const [dir, setDir] = useState(current.dir);
    const [invalid, setInvalid] = useState(false);
    // Each rejected Apply, after whose error renders focus moves to the field that holds it.
    const [rejections, setRejections] = useState(0);
    const fieldRef = useRef<HTMLInputElement>(null);
    const groupRef = useRef<HTMLDivElement | null>(null);
    // Focus inside the content before Radix autofocuses it keeps Fondue from moving it to the first radio.
    const focusedRef = useRef(false);
    // The group's ref: it keeps the group and focuses its checked radio once, as RadioList takes no ref on a radio.
    const focusOnce = useCallback((group: HTMLDivElement | null) => {
        groupRef.current = group;
        if (group !== null && !focusedRef.current) {
            focusedRef.current = true;
            group.querySelector<HTMLElement>('[role="radio"][data-state="checked"]')?.focus();
        }
    }, []);
    const fieldId = useId();
    const errorId = useId();
    const legendId = useId();
    const directionId = useId();
    const directionLabelId = useId();
    const offered = offeredLanguages(languages, current.lang);
    const apply = (event: FormEvent) => {
        event.preventDefault();
        if (api === undefined) {
            return;
        }
        const result = api.commands.execute(SET_LANGUAGE, { lang: tag, dir: directionOf(dir) });
        if (result.status === 'rejected') {
            setInvalid(true);
            setRejections((count) => count + 1);
            return;
        }
        dialog.finish('surface');
    };
    const remove = () => {
        api?.commands.execute(SET_LANGUAGE, null);
        dialog.finish('surface');
    };
    const chooseTag = (value: string) => {
        setTag(value);
        setInvalid(false);
    };
    useEffect(() => {
        if (rejections === 0) {
            return;
        }
        const radio = groupRef.current?.querySelector<HTMLElement>('[role="radio"][aria-describedby]');
        const target = radio ?? fieldRef.current;
        target?.focus();
    }, [rejections]);
    return {
        dialog,
        strings,
        locale,
        offered,
        stored: current.lang,
        tag,
        dir,
        setDir,
        invalid,
        chooseTag,
        apply,
        remove,
        fieldRef,
        groupRef,
        focusOnce,
        ids: {
            field: fieldId,
            error: errorId,
            legend: legendId,
            direction: directionId,
            directionLabel: directionLabelId,
        },
    };
};

export type LanguageState = ReturnType<typeof useLanguageState>;
