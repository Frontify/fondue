/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compileContentModel, type ContentModel, type Feature } from '#/model';
import { align } from '#/plugins/Align/feature';
import { bold } from '#/plugins/Bold/feature';
import { bulletList } from '#/plugins/BulletList/feature';
import { taskList } from '#/plugins/CheckList/feature';
import { code } from '#/plugins/Code/feature';
import { codeBlock } from '#/plugins/CodeBlock/feature';
import { core } from '#/plugins/Core/feature';
import { emoji } from '#/plugins/Emoji/feature';
import { heading } from '#/plugins/Heading/feature';
import { inputRules } from '#/plugins/InputRules/feature';
import { italic } from '#/plugins/Italic/feature';
import { language } from '#/plugins/Language/feature';
import { listItem } from '#/plugins/ListItem/feature';
import { orderedList } from '#/plugins/OrderedList/feature';
import { quote } from '#/plugins/Quote/feature';
import { formatClear } from '#/plugins/ResetFormatting/feature';
import { strike } from '#/plugins/Strikethrough/feature';
import { subscript } from '#/plugins/Subscript/feature';
import { superscript } from '#/plugins/Superscript/feature';
import { underline } from '#/plugins/Underline/feature';

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
