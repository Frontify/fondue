/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, useContext, useEffect, useState } from 'react';

import { whenIdle } from '#/runtime/dom/idle';

import { SessionContext } from './sessionContext';

const loaders: (() => Promise<unknown>)[] = [];

/**
 * A component whose code loads on first render and renders nothing until then, so UI that shows only after an author
 * action stays out of the editor's initial load. `prefetchPartsOnIdle` loads it ahead of that first use.
 */
export const lazyPart = <P extends object>(
    load: () => Promise<ComponentType<P>>,
    options: { featureId?: string } = {},
): ComponentType<P> => {
    let loaded: ComponentType<P> | undefined;
    let pending: Promise<ComponentType<P>> | undefined;
    const start = () => {
        pending ??= load().then(
            (component) => {
                loaded = component;

                return component;
            },
            (error: unknown) => {
                // A failed load is tried again on the next use.
                pending = undefined;
                throw error;
            },
        );

        return pending;
    };

    loaders.push(start);
    const Part = (props: P) => {
        const session = useContext(SessionContext);
        // A function in state would be called as an updater, so the component sits in an object.
        const [part, setPart] = useState(() => {
            if (loaded === undefined) {
                return undefined;
            }

            return { Loaded: loaded };
        });
        useEffect(() => {
            if (part !== undefined) {
                return undefined;
            }

            let mounted = true;
            start()
                .then((Loaded) => {
                    if (mounted) {
                        setPart({ Loaded });
                    }

                    return Loaded;
                })
                // A part that cannot load stays hidden and is reported, and the next use tries again.
                .catch((error: unknown) => {
                    if (mounted) {
                        session?.reportPluginError(error, options.featureId);
                    }
                });

            return () => {
                mounted = false;
            };
        }, [part, session]);
        if (part === undefined) {
            return null;
        }

        return <part.Loaded {...props} />;
    };

    Part.displayName = 'RichTextEditor.LazyPart';

    return Part;
};

/** Loads every lazy part now; a part that fails to load is tried again on first use. */
export const loadParts = async (): Promise<void> => {
    await Promise.allSettled(loaders.map((loader) => loader()));
};

/** Loads every lazy part once the page is idle, so a first open is instant; the returned function cancels a start that has not run. */
export const prefetchPartsOnIdle = (): (() => void) =>
    whenIdle(() => {
        loadParts().catch(() => undefined);
    });
