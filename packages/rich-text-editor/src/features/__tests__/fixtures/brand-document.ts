/* (c) Copyright Frontify Ltd., all rights reserved. */

import { align } from '#/features/blocks-align/feature';
import { codeBlock } from '#/features/blocks-code/feature';
import { heading } from '#/features/blocks-heading/feature';
import { quote } from '#/features/blocks-quote/feature';
import { core } from '#/features/core/feature';
import { emoji } from '#/features/emoji/feature';
import { formatClear } from '#/features/format-clear/feature';
import { inputRules } from '#/features/input-rules/feature';
import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { orderedList } from '#/features/lists-ordered/feature';
import { taskList } from '#/features/lists-task/feature';
import { bold } from '#/features/marks-bold/feature';
import { code } from '#/features/marks-code/feature';
import { italic } from '#/features/marks-italic/feature';
import { language } from '#/features/marks-language/feature';
import { strike } from '#/features/marks-strike/feature';
import { subscript } from '#/features/marks-subscript/feature';
import { superscript } from '#/features/marks-superscript/feature';
import { underline } from '#/features/marks-underline/feature';
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
