/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel } from '#/model';

import { fixtureChromeEditor } from './chrome/view';
import { fixtureCodeBlockEditor } from './code-block/view';
import { FIXTURE_EDITORS, installedOf } from './editors';
import { fixtureMediaImageEditor } from './media/view';
import { fixtureTableBlockEditor } from './table/view';

const FIXTURE_PARTS = [
    ...FIXTURE_EDITORS,
    fixtureChromeEditor,
    fixtureCodeBlockEditor,
    fixtureMediaImageEditor,
    fixtureTableBlockEditor,
] as const;

/** The editor parts of the fixture features `model` installs, their node view chrome included. */
export const fixturePartsOf = (model: ContentModel) => installedOf(model, FIXTURE_PARTS);
