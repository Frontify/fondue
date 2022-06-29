/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum LinkChooserState {
    Idle = 'idle',
    Focused = 'focused',
}

export enum DropdownState {
    Default = 'default',
    ExtraSection = 'extra-section',
}

export enum SectionState {
    Loaded = 'loaded',
    Typing = 'typing',
    Fetching = 'fetching',
    Error = 'error',
}
