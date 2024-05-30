/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_OUTLINE } from '#/utilities/focusStyle';

export const segmentedControlRootStyles =
    'tw-inline-grid tw-h-9 tw-grid-flow-col tw-auto-cols-[1fr] tw-items-stretch tw-bg-base-alt disabled:tw-bg-base-alt ' +
    'tw-border tw-border-line-strong tw-rounded tw-relative tw-min-w-max tw-font-sans tw-font-normal tw-text-center tw-isolate';

export const segmentedControlItemStyles =
    'tw-peer tw-group tw-flex tw-items-stretch tw-justify-center tw-select-none ' +
    // Focus styles for keyboard navigation, custom rounding applied to match the active indicator
    `${FOCUS_OUTLINE} tw-rounded-[calc(var(--radius)-var(--line-width))]`;

export const segmentedControlActiveIndicatorStyles =
    'tw-hidden tw-absolute -tw-z-[1] tw-top-0 tw-left-0 tw-h-full tw-pointer-events-none tw-transition-transform ' +
    // Outline of active item
    "before:tw-content-[''] before:tw-inset-0 before:tw-absolute before:tw-rounded-[calc(var(--radius)-var(--line-width))] before:tw-bg-white peer-disabled:before:tw-bg-box-disabled " +
    'before:tw-shadow-[0_0_0_var(--line-width)_var(--line-color-xx-strong)] peer-disabled:before:tw-shadow-[0_0_0_var(--line-width)_var(--line-color-x-strong)] ' +
    // Show the active indicator when the state is on
    'peer-data-[state=on]:tw-block ' +
    // Used to animate the active indicator horizontally
    '[&:nth-child(2)]:tw-w-[calc(100%/1)] [&:nth-child(3)]:tw-w-[calc(100%/2)] ' +
    '[&:nth-child(4)]:tw-w-[calc(100%/3)] [&:nth-child(5)]:tw-w-[calc(100%/4)] ' +
    '[&:nth-child(6)]:tw-w-[calc(100%/5)] [&:nth-child(7)]:tw-w-[calc(100%/6)] ' +
    '[&:nth-child(8)]:tw-w-[calc(100%/7)] [&:nth-child(9)]:tw-w-[calc(100%/8)] ' +
    '[&:nth-child(10)]:tw-w-[calc(100%/9)] [&:nth-child(11)]:tw-w-[calc(100%/10)] ' +
    'peer-[[data-state=on]:nth-child(1)]:tw-translate-x-[0%] ' +
    'peer-[[data-state=on]:nth-child(2)]:tw-translate-x-[100%] ' +
    'peer-[[data-state=on]:nth-child(3)]:tw-translate-x-[200%] ' +
    'peer-[[data-state=on]:nth-child(4)]:tw-translate-x-[300%] ' +
    'peer-[[data-state=on]:nth-child(5)]:tw-translate-x-[400%] ' +
    'peer-[[data-state=on]:nth-child(6)]:tw-translate-x-[500%] ' +
    'peer-[[data-state=on]:nth-child(7)]:tw-translate-x-[600%] ' +
    'peer-[[data-state=on]:nth-child(8)]:tw-translate-x-[700%] ' +
    'peer-[[data-state=on]:nth-child(9)]:tw-translate-x-[800%] ' +
    'peer-[[data-state=on]:nth-child(10)]:tw-translate-x-[900%]';

export const segmentedControlItemSeparatorStyles =
    '-tw-z-[1] tw-min-w-px tw-w-px -tw-mx-[0.5px] tw-bg-line-strong tw-transition-opacity tw-ease-out ' +
    // Hide the separator when the state is on to rely on the active item's border
    'group-first:tw-opacity-0 group-first:tw-ease-in ' +
    'group-data-[state=on]:tw-opacity-0 group-data-[state=on]:tw-ease-in ' +
    'group-focus-visible:tw-opacity-0 group-focus-visible:tw-ease-in ' +
    '[[data-state=on]_+_*_&]:tw-opacity-0 [[data-state=on]_+_*_&]:tw-ease-in ' +
    // Remove transition is the control is focused
    'group-focus-visible:tw-duration-0';

export const segmentedControlItemLabelStyles =
    'tw-flex tw-flex-grow tw-items-center tw-justify-center tw-rounded-[inherit] tw-px-4 tw-gap-2 tw-text-body-medium ' +
    // Hover on unselected items but not when disabled
    'group-data-[state=off]:group-enabled:hover:tw-bg-[#00005506] ' +
    // Prevent shrinking of icons
    '[&_svg]:tw-shrink-0';

export const segmentedControlItemLabelActiveStyles =
    'tw-inline-flex tw-gap-2 tw-items-center tw-justify-center tw-transition-opacity group-disabled:tw-text-box-disabled-inverse tw-font-medium ' +
    'tw-opacity-0 tw-ease-in group-data-[state=on]:tw-opacity-100 ' +
    'group-data-[state=on]:tw-ease-out';

export const segmentedControlItemLabelInactiveStyles =
    'tw-absolute tw-inline-flex tw-gap-2 tw-items-center tw-justify-center tw-transition-opacity group-disabled:tw-text-box-disabled-inverse tw-font-normal ' +
    'tw-opacity-100 tw-ease-out group-data-[state=on]:tw-opacity-0 ' +
    'group-data-[state=on]:tw-ease-in';
