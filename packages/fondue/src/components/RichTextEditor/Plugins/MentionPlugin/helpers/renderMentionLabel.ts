/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MappedMentionableItems } from '../types';

export const renderMentionLabel = (mentionable: MappedMentionableItems, key: string, id: string) =>
    mentionable.get(key) ?? id;
