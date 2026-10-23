/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { core } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel, createEmptyDocument } from '#/model';
import { probeRuntimes } from '#/testing';

describe('probeRuntimes', () => {
    it('reads the installed features of a mounted editor', () => {
        const model = compileContentModel([core()], { id: 'story.core', version: 1 });
        const { unmount } = render(
            <RichTextEditor
                aria-label="Notes"
                definition={defineEditor({ id: 'story.core', model })}
                defaultValue={{ documentId: 'document-1', revision: null, document: createEmptyDocument(model) }}
            />,
        );

        expect(probeRuntimes().installedFeatures).toEqual([['core']]);
        unmount();
        expect(probeRuntimes().installedFeatures).toEqual([]);
    });
});
