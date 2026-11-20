/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by maxRows.ct.tsx: a button before the editor to Tab in from, and a host box around it.

import { useState } from 'react';

import { RichTextEditor, type RichTextEditorProps, type RteDocument } from '../../index';
import { tablePlugin, textStylePlugin } from '../../plugins';

import styles from './MaxRowsFrame.module.scss';
import { BEFORE_BUTTON, HOST_TEST_ID, LINK_DOCUMENT, LONG_DOCUMENT, MAX_ROWS } from './maxRowsValues';
import { TABLE_DOCUMENT } from './tableCellValues';

const TABLE_PLUGINS = [textStylePlugin(), tablePlugin()];

const TABLE_AND_LONG_DOCUMENT = {
    ...TABLE_DOCUMENT,
    blocks: [...TABLE_DOCUMENT.blocks, ...LONG_DOCUMENT.blocks],
};

type MaxRowsFrameProps = Pick<RichTextEditorProps, 'toolbarPlacement'>;

export const MaxRowsFrame = ({ toolbarPlacement }: MaxRowsFrameProps) => {
    const [document, setDocument] = useState<RteDocument>(LONG_DOCUMENT);

    return (
        <>
            <button type="button">{BEFORE_BUTTON}</button>
            <div data-test-id={HOST_TEST_ID} className={styles.host}>
                <RichTextEditor
                    value={document}
                    onChange={setDocument}
                    maxRows={MAX_ROWS}
                    toolbarPlacement={toolbarPlacement}
                />
            </div>
        </>
    );
};

/** The same host box around a read-only editor holding a table: only the read-only table wrapper is a tab stop, and takes a focus outline. */
export const MaxRowsTableFrame = () => (
    <>
        <button type="button">{BEFORE_BUTTON}</button>
        <div data-test-id={HOST_TEST_ID} className={styles.host}>
            <RichTextEditor value={TABLE_AND_LONG_DOCUMENT} plugins={TABLE_PLUGINS} maxRows={MAX_ROWS} readonly />
        </div>
    </>
);

/** The same host box around an editor whose text holds a link. */
export const MaxRowsLinkFrame = () => (
    <>
        <button type="button">{BEFORE_BUTTON}</button>
        <div data-test-id={HOST_TEST_ID} className={styles.host}>
            <RichTextEditor value={LINK_DOCUMENT} maxRows={MAX_ROWS} />
        </div>
    </>
);
