/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { core } from '#/features';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel, createEmptyDocument } from '#/model';

import { featureTagFaults } from '../../.storybook/checks';

import { createTestEnvironment } from './environment';

describe('the feature tag check of the Storybook runner', () => {
    it('SPEC-rich-text/AC-053 reads the features of the mounted editor, whatever definition the story args hold', () => {
        const model = compileContentModel([core()], { id: 'story.core', version: 1 });
        const { unmount } = render(
            <RichTextEditor
                aria-label="Notes"
                definition={defineEditor({ id: 'story.core', model })}
                defaultValue={{ documentId: 'document-1', revision: null, document: createEmptyDocument(model) }}
                environment={createTestEnvironment({ seed: 1 })}
            />,
        );

        expect(featureTagFaults(['feature:core'])).toEqual([]);
        expect(featureTagFaults(['feature:core', 'feature:marks.bold'])).toEqual([
            'the story installs core, while its feature tags name core, marks.bold',
        ]);
        unmount();
        expect(featureTagFaults(['feature:core'])).toEqual([
            'the story mounts no editor, while its feature tags name core',
        ]);
    });
});
