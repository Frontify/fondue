/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode } from 'prosemirror-model';
import { type EditorView, type NodeView, type NodeViewConstructor } from 'prosemirror-view';
import { type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';

import { type BlockDefinition, type PluginRegistry, type RteBlockNode } from '#/core';

import { definedAttrs } from './documentConversion';
import { htmlSpecToDom } from './htmlSpec';

/**
 * Hosts a plugin `editorComponent` as a ProseMirror NodeView. The outer element
 * comes from `toDom`; React draws the inner chrome. Editable children live in a
 * `contentDOM` hole that the plugin places via `{children}`.
 */

const ContentHole = ({ element }: { element: HTMLElement }): ReactNode => (
    <span
        ref={(node) => {
            if (node && element.parentNode !== node) {
                node.appendChild(element);
            }
        }}
        style={{ display: 'contents' }}
    />
);

const applyDomAttrs = (element: HTMLElement, attrs: Record<string, string> | undefined): void => {
    if (!attrs) {
        return;
    }
    for (const [name, value] of Object.entries(attrs)) {
        if (name === 'class') {
            element.className = value;
        } else {
            element.setAttribute(name, value);
        }
    }
};

class ReactBlockView implements NodeView {
    dom: HTMLElement;
    contentDOM: HTMLElement | undefined;
    private readonly root: Root;
    private readonly view: EditorView;
    private readonly getPos: () => number | undefined;
    private readonly definition: BlockDefinition;
    private node: PmNode;

    constructor(node: PmNode, view: EditorView, getPos: () => number | undefined, definition: BlockDefinition) {
        this.node = node;
        this.view = view;
        this.getPos = getPos;
        this.definition = definition;

        const spec = definition.toDom(definedAttrs(node.attrs));
        const output = htmlSpecToDom(spec);
        const tag = Array.isArray(output) ? String(output[0]) : spec.tag;
        this.dom = document.createElement(tag);
        applyDomAttrs(this.dom, spec.attrs);

        this.contentDOM = definition.children === undefined ? undefined : document.createElement('span');
        this.root = createRoot(this.dom);
        this.paint();
    }

    private rteNode(): RteBlockNode {
        return { type: this.node.type.name, ...definedAttrs(this.node.attrs) } as unknown as RteBlockNode;
    }

    private paint(): void {
        const Component = this.definition.editorComponent;
        if (!Component) {
            return;
        }
        // NodeView must expose contentDOM before ProseMirror inserts children.
        // eslint-disable-next-line @eslint-react/dom-no-flush-sync
        flushSync(() => {
            this.root.render(
                <Component
                    node={this.rteNode()}
                    updateAttributes={(attrs) => {
                        const pos = this.getPos();
                        if (pos === undefined) {
                            return;
                        }
                        this.view.dispatch(
                            this.view.state.tr.setNodeMarkup(pos, undefined, { ...this.node.attrs, ...attrs }),
                        );
                    }}
                >
                    {this.contentDOM ? <ContentHole element={this.contentDOM} /> : undefined}
                </Component>,
            );
        });
    }

    update(node: PmNode): boolean {
        if (node.type !== this.node.type) {
            return false;
        }
        this.node = node;
        applyDomAttrs(this.dom, this.definition.toDom(definedAttrs(node.attrs)).attrs);
        this.paint();
        return true;
    }

    destroy(): void {
        const root = this.root;
        queueMicrotask(() => root.unmount());
    }

    ignoreMutation(mutation: { target: Node }): boolean {
        if (!this.contentDOM) {
            return true;
        }
        return !this.contentDOM.contains(mutation.target);
    }
}

export const createNodeViews = (registry: PluginRegistry): Record<string, NodeViewConstructor> => {
    const views: Record<string, NodeViewConstructor> = {};
    for (const [type, definition] of registry.blocks) {
        if (definition.editorComponent) {
            views[type] = (node, view, getPos) => new ReactBlockView(node, view, getPos, definition);
        }
    }
    return views;
};
