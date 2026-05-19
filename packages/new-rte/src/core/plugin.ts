/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type ReactNode } from 'react';

import { type FrontifyBlock, type FrontifyInline, type FrontifyText } from './document';
import { type EditorControlApi, type PluginEventBus } from './editor-api';

/**
 * A FondueRtePlugin describes a feature in engine-agnostic terms. Every
 * field is optional except `id`. Copy-paste works via the browser default
 * clipboard behavior reading the rendered DOM — plugins do not define
 * serializers.
 */
export type FondueRtePlugin = {
    id: string;
    label?: string;
    schema?: PluginSchema;
    toolbar?: ToolbarContribution;
    hotkeys?: HotkeySpec[];
    inputRules?: InputRule[];
    overlays?: ComponentType<OverlayProps>[];
    parseHtml?: HtmlParseRule[];
};

export type PluginSchema = {
    blocks?: BlockSpec[];
    inlines?: InlineSpec[];
    marks?: MarkSpec[];
};

export type BlockSpec = {
    type: string;
    render: ComponentType<RenderBlockProps>;
    attrs?: Record<string, BlockAttrSpec>;
};

export type BlockAttrSpec = {
    default?: unknown;
};

export type InlineSpec = {
    type: string;
    render: ComponentType<RenderInlineProps>;
    atomic?: boolean;
};

export type MarkSpec = {
    key: string;
    render: ComponentType<RenderMarkProps>;
};

export type RenderBlockProps = {
    node: FrontifyBlock;
    children: ReactNode;
    attributes: Record<string, unknown>;
};

export type RenderInlineProps = {
    node: FrontifyInline;
    children: ReactNode;
    attributes: Record<string, unknown>;
};

export type RenderMarkProps = {
    leaf: FrontifyText;
    children: ReactNode;
    attributes: Record<string, unknown>;
};

export type ToolbarPosition = 'floating' | 'top' | 'bottom';

export type ToolbarContribution = {
    positions: ToolbarPosition[];
    render: (api: EditorControlApi) => ReactNode;
    group?: string;
};

export type HotkeySpec = {
    keys: string;
    command: (api: EditorControlApi, event: KeyboardEvent) => void | boolean;
};

export type InputRule = {
    pattern: RegExp;
    apply:
        | { kind: 'mark'; key: string }
        | { kind: 'block'; type: string; attrs?: Record<string, unknown> }
        | { kind: 'replace'; with: string }
        | { kind: 'custom'; run: (api: EditorControlApi) => void };
};

export type OverlayProps = {
    api: EditorControlApi;
    events: PluginEventBus;
};

export type HtmlParseRule = {
    tag: string;
    match?: (el: HTMLElement) => boolean;
    produce: { kind: 'block'; type: string } | { kind: 'inline'; type: string } | { kind: 'mark'; key: string };
    getAttrs?: (el: HTMLElement) => Record<string, unknown>;
};
