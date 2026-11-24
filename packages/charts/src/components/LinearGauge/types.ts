/* (c) Copyright Frontify Ltd., all rights reserved. */

export type LinearGaugeSection = {
    name: string;
    label: string;
    percentage: number;
    description?: string;
};

export type LinearGaugeTooltipMode = 'all' | 'hovered';

export type LinearGaugeLegendPosition = 'top' | 'bottom';
