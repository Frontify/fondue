/* (c) Copyright Frontify Ltd., all rights reserved. */

import { align } from '#/features/blocksAlign/feature';
import { codeBlock } from '#/features/blocksCode/feature';
import { heading } from '#/features/blocksHeading/feature';
import { quote } from '#/features/blocksQuote/feature';
import { core } from '#/features/core/feature';
import { emoji } from '#/features/emoji/feature';
import { formatClear } from '#/features/formatClear/feature';
import { inputRules } from '#/features/inputRules/feature';
import { bulletList } from '#/features/listsBullet/feature';
import { listItem } from '#/features/listsItem/feature';
import { orderedList } from '#/features/listsOrdered/feature';
import { taskList } from '#/features/listsTask/feature';
import { bold } from '#/features/marksBold/feature';
import { code } from '#/features/marksCode/feature';
import { italic } from '#/features/marksItalic/feature';
import { language } from '#/features/marksLanguage/feature';
import { strike } from '#/features/marksStrike/feature';
import { subscript } from '#/features/marksSubscript/feature';
import { superscript } from '#/features/marksSuperscript/feature';
import { underline } from '#/features/marksUnderline/feature';
import { compileContentModel, type ContentModel, type Feature } from '#/model';

/** The features delivered so far, with alignment, as a stand-in for the brand document profile. */
export const brandDocumentFeatures = (justify = true): readonly Feature[] => [
    core(),
    bold(),
    italic(),
    underline(),
    strike(),
    code(),
    subscript(),
    superscript(),
    heading(),
    quote(),
    codeBlock(),
    listItem(),
    bulletList(),
    orderedList(),
    taskList(),
    emoji(),
    inputRules(),
    align(justify ? undefined : { justify: false }),
    language(),
    formatClear(),
];

export const brandDocumentModel = (justify = true): ContentModel =>
    compileContentModel(brandDocumentFeatures(justify), { id: 'test.brand-document', version: 1 });
