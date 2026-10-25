/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, type RefObject, useEffect, useMemo, useRef } from 'react';

import { useClientLayoutEffect } from '#/bridge/clientLayoutEffect';
import { type MountCoordinator } from '#/bridge/mount';
import { sameDocument, styleSheetOf } from '#/model';
import { unknownStyle } from '#/model/internal';

import { useRecipeSheet } from '../style-sheet';
import { type EditorHandle } from '../types';

import { memberChanged, memberOf, modeOf } from './helpers';
import { type Defined, type Mounted, SERVICE_MEMBERS } from './types';

/** Carries the props that change while a session runs into it: mode, disabled, list levels and the style recipes. */
export const usePresentationSync = (
    props: Defined,
    coordinator: MountCoordinator,
    handleRef: MutableRefObject<EditorHandle<object> | null>,
    rootRef: RefObject<HTMLElement | null>,
) => {
    const mode = modeOf(props);
    useClientLayoutEffect(() => {
        handleRef.current?.setMode(mode);
    }, [mode]);
    const disabled = props.disabled === true;
    useClientLayoutEffect(() => {
        coordinator.runtime?.setDisabled(disabled);
    }, [coordinator, disabled]);
    const listLevels = props.presentation?.listLevels;
    useClientLayoutEffect(() => {
        coordinator.chrome.setListLevels(listLevels);
    }, [coordinator, listLevels]);
    // Without a presentation no style map is given, so no stored style is unknown.
    const recipes = props.presentation?.styles;
    const colorTokens = props.presentation?.colorTokens;
    useClientLayoutEffect(() => {
        if (recipes === undefined || colorTokens === undefined) {
            coordinator.chrome.setStyles(undefined);
            return;
        }
        coordinator.chrome.setStyles({
            styles: recipes,
            colorTokens,
            onUnknown: (path) => coordinator.runtime?.report(unknownStyle(path)),
        });
    }, [coordinator, recipes, colorTokens]);
    const styleSheet = useMemo(() => styleSheetOf(recipes ?? []), [recipes]);
    useRecipeSheet(rootRef, styleSheet);
};

/** Aborts what a changed `services` member started, and says in development builds that a changed `definition`, `profile` or `defaultValue` replaces nothing. */
export const useChangeWatch = (props: Defined, mounted: Mounted, coordinator: MountCoordinator) => {
    // A changed `services` member aborts the operations it started, with no rebuild.
    const { services } = props;
    const servicesRef = useRef(services);
    useEffect(() => {
        const previous = servicesRef.current;
        servicesRef.current = services;
        const changed = SERVICE_MEMBERS.filter((member) =>
            memberChanged(memberOf(previous, member), memberOf(services, member)),
        );
        if (changed.length > 0) {
            coordinator.runtime?.changeServices(changed);
        }
    }, [services, coordinator]);

    const { definition, profile } = props;
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            return;
        }
        if (definition === mounted.definition && profile === mounted.profile) {
            return;
        }
        const runtime = coordinator.runtime;
        if (runtime !== undefined) {
            runtime.report({
                code: 'react.definition-changed',
                severity: 'warning',
                messageKey: 'react.definition-changed',
            });
        }
    }, [definition, profile, mounted, coordinator]);

    // A changed `defaultValue` replaces nothing, so a development build says so once per change.
    const { defaultValue } = props;
    const defaultValueRef = useRef(defaultValue);
    useEffect(() => {
        const previous = defaultValueRef.current;
        defaultValueRef.current = defaultValue;
        if (process.env.NODE_ENV === 'production' || previous === defaultValue) {
            return;
        }
        // A host that builds an equal record on each render changes nothing.
        if (previous.documentId === defaultValue.documentId && sameDocument(previous.document, defaultValue.document)) {
            return;
        }
        coordinator.runtime?.report({
            code: 'react.default-value-changed',
            severity: 'warning',
            messageKey: 'react.default-value-changed',
        });
    }, [defaultValue, coordinator]);
};
