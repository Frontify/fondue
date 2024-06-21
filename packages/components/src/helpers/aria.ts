/* (c) Copyright Frontify Ltd., all rights reserved. */

export type CommonAriaProps = {
    /**
     * Aria label for the component.
     */
    'aria-label'?: string;
    /**
     * Aria label for the component when it is hidden.
     */
    'aria-hidden'?: boolean;
    /**
     * Aria role for the component.
     */
    role?: string;
    /**
     * Aria described by for the component.
     */
    'aria-describedby'?: string;
    /**
     * Aria labelled by for the component.
     */
    'aria-labelledby'?: string;
    /**
     * Aria expanded for the component.
     */
    'aria-expanded'?: boolean;
    /**
     * Aria has popup for the component.
     */
    'aria-haspopup'?: boolean;
};
