/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * @frontify/fondue-sdk — machine-readable SDK for Frontify Fondue. Exposes
 * components, icons, tokens, and prose guides. Icons live in the components
 * graph under `category: 'icon'`.
 *
 *   import { components, tokens, guides } from '@frontify/fondue/sdk';
 *
 *   components.get('Button').category().list();   // all input components
 *   components.where({ category: 'icon' });       // all icons
 *   components.get('Button').related();           // SplitButton, Link
 *
 *   tokens.where({ category: 'colors' });
 *
 *   guides.get('getting-started')?.content;       // raw markdown
 */

import {
    components as rawComponents,
    guides as rawGuides,
    tokenUtilities,
    tokens as rawTokens,
} from './__generated__/data';
import { buildComponentsApi } from './api/components';
import { buildGuidesApi } from './api/guides';
import { buildTokensApi } from './api/tokens';

/** Component query API. Icons are surfaced here under `category: 'icon'`. */
export const components = buildComponentsApi(rawComponents);

/** Token query API, with `tokens.utilities` sub-domain. */
export const tokens = buildTokensApi(rawTokens, tokenUtilities);

/** Prose guides bundled with the SDK (getting started, contributing, upgrading). */
export const guides = buildGuidesApi(rawGuides);

// ─── Public types ───────────────────────────────────────────────────────────

export type {
    ComponentExample,
    ComponentFacetNode,
    ComponentFilter,
    ComponentNode,
    ComponentProp,
    ComponentSubComponent,
} from './types/components';
export type { Guide, GuideFilter } from './types/guides';
export type {
    TokenFacetNode,
    TokenFilter,
    TokenNode,
    TokenUtilityFilter,
    TokenUtilityNode,
    TokenUtilityProperty,
    TokenValueType,
} from './types/tokens';
