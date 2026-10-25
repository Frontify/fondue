/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dialog, ThemeProvider } from '@frontify/fondue-components';

import { ProfileProbe } from './ProfileProbe';

/** A shipped profile's editor inside an open modal host Fondue `Dialog`, which traps focus. */
export const HostDialogProfileProbe = () => (
    <ThemeProvider>
        <Dialog.Root modal open>
            <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>Host dialog</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <ProfileProbe profile="document" />
                </Dialog.Body>
            </Dialog.Content>
        </Dialog.Root>
    </ThemeProvider>
);
