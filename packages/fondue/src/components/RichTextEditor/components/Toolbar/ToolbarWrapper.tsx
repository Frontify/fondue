/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { withCn } from '@udecode/cn';

export const ToolbarWrapper = withCn(
    ToolbarPrimitive.Root,
    'tw-relative tw-flex tw-select-none tw-items-center tw-gap-1',
);
