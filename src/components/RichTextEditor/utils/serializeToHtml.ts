import { createPlateEditor, serializeHtml } from '@udecode/plate';
import { getEditorConfig } from './editorConfig';

import escapeHtml from 'escape-html';

export const serializeSlate = (nodes: any[]): string => {
    const serializeSlateNode = (node: any): string => {
        if (!node.children) {
            let string = escapeHtml(node.text);
            if (node.bold) {
                string = `<strong>${string}</strong>`;
            }
            return string;
        }

        const children = node.children.map((n: any) => serializeSlateNode(n)).join('');

        switch (node.type) {
            case 'heading1':
                return `<h1>${children}</h1>`;
            case 'p':
                return `<p>${children}</p>`;
            case 'link':
                return `<a href="${escapeHtml(node.url)}">${children}</a>`;
            default:
                return children;
        }
    };
    return nodes.map((node) => serializeSlateNode(node)).join('');
};

export const serializePlate = (nodes: any[]): string => {
    const editor = createPlateEditor({ plugins: getEditorConfig() });
    return serializeHtml(editor, { nodes });
};
