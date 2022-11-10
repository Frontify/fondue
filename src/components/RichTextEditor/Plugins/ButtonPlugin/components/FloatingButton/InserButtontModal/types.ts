/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from '@components/Checkbox';
import { ButtonStyle } from '../../../types';

export type InsertModalDispatchType = { type: string; payload?: Partial<InsertModalStateProps> };

export type InsertModalStateProps = {
    url: string;
    text: string;
    buttonStyle: ButtonStyle;
    newTab: CheckboxState;
};
