/* (c) Copyright Frontify Ltd., all rights reserved. */

/* oxlint-disable typescript/no-unsafe-assignment, typescript/no-unsafe-call, typescript/no-unsafe-member-access -- the app's packages and shared document exist only in its scratch install */

import { commentModel } from '@frontify/fondue-rich-text-editor/features';
import { RichTextReader } from '@frontify/fondue-rich-text-editor/reader';
import dynamic from 'next/dynamic';

import { storedDocument } from '../document';

// The editor renders on the client only; the reader renders on the server.
const Editor = dynamic(() => import('../editor'), { ssr: false });

export default function Page() {
    return (
        <main>
            <section data-smoke="reader">
                <RichTextReader document={storedDocument} model={commentModel} />
            </section>
            <Editor />
        </main>
    );
}

/* oxlint-enable typescript/no-unsafe-assignment, typescript/no-unsafe-call, typescript/no-unsafe-member-access */
