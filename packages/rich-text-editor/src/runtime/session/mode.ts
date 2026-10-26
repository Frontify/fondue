/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EngineCommand } from '#/definition';

import { type Mode } from './types';

export type ModeService = {
    mode(): Mode;
    disabled(): boolean;
    /** Ignored once the session is disposed; otherwise takes the mode, then tells `onModeChange`. */
    set(next: Mode): void;
    setDisabled(next: boolean): void;
    /** A read-only session refuses any command that is not marked `readOnly`. */
    refusesReadOnly(command: EngineCommand): boolean;
};

export const createMode = ({
    initial,
    isDisposed,
    onModeChange,
    onDisabledChange,
}: {
    initial: Mode;
    isDisposed: () => boolean;
    onModeChange: (next: Mode) => void;
    onDisabledChange: () => void;
}): ModeService => {
    let mode = initial;
    let disabled = false;

    return {
        mode: () => mode,
        disabled: () => disabled,
        set: (next) => {
            if (isDisposed()) {
                return;
            }

            mode = next;
            onModeChange(next);
        },
        setDisabled: (next) => {
            disabled = next;
            onDisabledChange();
        },
        refusesReadOnly: (command) => mode === 'readonly' && command.readOnly !== true,
    };
};
