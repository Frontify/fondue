/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextReader } from '../../src/reader/reader';

import { semanticModel } from './semantic';

// One model for every mount: Playwright props are JSON, so a compiled model cannot travel in them.
const model = semanticModel();

/** The reader over the semantic stand-in model; `width` narrows the box the way a phone or a print page does. */
export const SemanticReader = ({ document, width }: { document: unknown; width?: number }) => (
    <div style={width === undefined ? undefined : { width }}>
        <RichTextReader document={document} model={model} />
    </div>
);
