/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FieldsetHeaderSize, FieldsetHeaderType, renderFieldsetHeaderIconType } from '@components/FieldsetHeader';
import { AccordionHeaderIconProps, AccordionHeaderIconSize } from './types';

export const AccordionHeaderIcon = ({
    size = AccordionHeaderIconSize.Medium,
    isOpen,
    disabled = false,
    type = FieldsetHeaderType.Accordion,
}: AccordionHeaderIconProps) =>
    renderFieldsetHeaderIconType(type, '', FieldsetHeaderSize[AccordionHeaderIconSize[size]], isOpen, disabled);
