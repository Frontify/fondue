/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useApplePlatform } from '#/bridge/session/hooks/useApplePlatform';
import { useSessionValue } from '#/bridge/session/hooks/useSessionValue';
import { keyOn } from '#/model/internal';
import { type ToolbarItem } from '#/ui/helpers/items';
import { ariaShortcut, bindingHere, shortcutText } from '#/ui/helpers/shortcuts';

/** The item's shortcut as its tooltip or menu row shows it and as `aria-keyshortcuts`, on the author's platform. */
export const useShortcut = ({ bindings }: ToolbarItem) => {
    const apple = useApplePlatform();
    const behavior = useSessionValue((runtime) => runtime?.policy.enterBehavior, Object.is);
    // Shift+Enter runs as Enter while Enter submits, and the policy can change after the keymap compiles.
    const binding = bindingHere(
        bindings.filter((candidate) => behavior !== 'submit' || keyOn(candidate, apple) !== 'Shift-Enter'),
        apple,
    );
    if (binding === undefined) {
        return { shortcut: undefined, keyshortcuts: undefined };
    }

    return { shortcut: shortcutText(binding, apple), keyshortcuts: ariaShortcut(binding, apple) };
};
