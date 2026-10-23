/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel } from '#/model';

import { fixtureChromeEditor } from './chrome/view';
import { FIXTURE_EDITORS, installedOf } from './editors';

const FIXTURE_PARTS = [...FIXTURE_EDITORS, fixtureChromeEditor] as const;

/** The editor parts of the fixture features `model` installs, their node view chrome included. */
export const fixturePartsOf = (model: ContentModel) => installedOf(model, FIXTURE_PARTS);
