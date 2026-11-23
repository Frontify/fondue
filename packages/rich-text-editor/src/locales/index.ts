/* (c) Copyright Frontify Ltd., all rights reserved. */

import { deCH } from './de-CH';
import { deDE } from './de-DE';
import { enUS } from './en-US';
import { esES } from './es-ES';
import { frCH } from './fr-CH';
import { frFR } from './fr-FR';
import { itCH } from './it-CH';
import { itIT } from './it-IT';
import { nlNL } from './nl-NL';
import { plPL } from './pl-PL';
import { ptPT } from './pt-PT';
import { type RichTextStrings } from './types';

/** The editor's strings by language tag: the 11 languages of `@frontify/fondue-components`. */
export const STRINGS_BY_LANG: ReadonlyMap<string, RichTextStrings> = new Map([
    ['de-CH', deCH],
    ['de-DE', deDE],
    ['en-US', enUS],
    ['es-ES', esES],
    ['fr-CH', frCH],
    ['fr-FR', frFR],
    ['it-CH', itCH],
    ['it-IT', itIT],
    ['nl-NL', nlNL],
    ['pl-PL', plPL],
    ['pt-PT', ptPT],
]);
