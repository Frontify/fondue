/* (c) Copyright Frontify Ltd., all rights reserved. */

export const FOCUS_OUTLINE =
    'focus-visible:tw-outline has-[[data-show-focus-ring=true]]:tw-outline tw-outline-4 tw-outline-offset-2 tw-outline-blue focus-visible:tw-outline-blue'; // second declaration of tw-outline-blue is to assure that in firefox the outline isn't overriden by a global definition of :-moz-focusring which is coming from tailwinds normalization styling
