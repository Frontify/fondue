/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from "./merge";

export const FOCUS_STYLE = "tw-ring-2 tw-ring-blue tw-ring-offset-1 dark:tw-ring-offset-black tw-outline-none";
export const FOCUS_STYLE_INSET = merge([FOCUS_STYLE, "tw-ring-inset"]);
