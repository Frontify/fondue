/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from '@frontify/fondue-components';
import { type ReactNode } from 'react';

import { type FloatingSurface } from '../hooks/useFloating';
import styles from '../richTextEditor.module.scss';

/**
 * Every open piece of plugin UI, each in a flyout hanging under the content it
 * is about — the panel below a link, the picker below a typed `@`.
 *
 * This is the plugins' mechanism: a `FloatingSpec` reaching here as a placement
 * from `handle.floating.placements()`. `FloatingToolbar.tsx` only shares the
 * word.
 */
export const FloatingLayer = ({ surfaces }: { surfaces: FloatingSurface[] }): ReactNode => (
    <>
        {surfaces.map((surface) => (
            // Open for as long as it is rendered: floating UI belongs to its
            // anchor, so the anchor going away closes it, not a click
            // elsewhere.
            <Flyout.Root key={surface.key} open>
                <Flyout.Trigger>
                    {/*
                     * Not a control: an invisible box traced over the content
                     * the flyout is about, letting no clicks through to it.
                     */}
                    <span aria-hidden className={styles.floatingAnchor} style={surface.rect} />
                </Flyout.Trigger>
                <Flyout.Content
                    padding="compact"
                    // The caret stays where it is — it is what the content is
                    // about, and any field inside takes focus for itself.
                    onOpenAutoFocus={(event) => event.preventDefault()}
                >
                    <Flyout.Body>{surface.content}</Flyout.Body>
                </Flyout.Content>
            </Flyout.Root>
        ))}
    </>
);
