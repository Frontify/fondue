/* (c) Copyright Frontify Ltd., all rights reserved. */

import { replaceCssVariables, replaceTailwindClasses } from '@frontify/fondue-tokens/tools/replaceLegacyTokens';

replaceCssVariables('./src', { dryRun: false });
replaceTailwindClasses('./src', { dryRun: false });
