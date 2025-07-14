/* (c) Copyright Frontify Ltd., all rights reserved. */

import { replaceCssVariables } from './replaceLegacyTokens';

replaceCssVariables('./legacyTokens/tw', { dryRun: false });
