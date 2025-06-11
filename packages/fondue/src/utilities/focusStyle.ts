/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from './merge';

export const FOCUS_STYLE = 'tw-ring-4 tw-ring-blue tw-ring-offset-2 dark:tw-ring-offset-black tw-outline-none';
export const FOCUS_STYLE_NO_OFFSET = 'tw-ring-4 tw-ring-blue dark:tw-ring-offset-black tw-outline-none';
export const FOCUS_VISIBLE_STYLE =
    'focus-visible:tw-ring-4 focus-visible:tw-ring-blue focus-visible:tw-ring-offset-2 focus-visible:dark:tw-ring-offset-black focus-visible:tw-outline-none';
export const PARENT_FOCUS_VISIBLE_STYLE =
    'group-focus-visible:tw-ring-4 group-focus-visible:tw-ring-blue group-focus-visible:tw-ring-offset-2 group-focus-visible:dark:tw-ring-offset-black group-focus-visible:tw-outline-none';
export const FOCUS_STYLE_INSET = merge([FOCUS_STYLE, 'tw-ring-inset']);
export const FOCUS_VISIBLE_STYLE_INSET = merge([FOCUS_VISIBLE_STYLE, 'tw-ring-inset']);
export const FOCUS_WITHIN_STYLE =
    'focus-within:tw-ring-4 focus-within:tw-ring-blue focus-within:tw-ring-offset-2 focus-within:dark:tw-ring-offset-black focus-within:tw-outline-none';
