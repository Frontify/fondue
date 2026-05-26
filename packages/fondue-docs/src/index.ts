/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * @frontify/fondue-docs — Node API for reading Frontify Fondue docs data
 * (components and tokens) as a navigable graph. Icons live in the components
 * graph under `category: 'icon'`.
 *
 *   import { components, tokens } from '@frontify/fondue-docs';
 *
 *   components.get('Button').category().list();   // all input components
 *   components.where({ category: 'icon' });       // all icons
 *   components.get('Button').related();           // SplitButton, Link
 *
 *   tokens.where({ category: 'colors' });
 */

import { components as rawComponents, tokenUtilities, tokens as rawTokens } from './__generated__/data';
import { buildComponentsApi } from './api/components';
import { buildTokensApi } from './api/tokens';

/** Component query API. Icons are surfaced here under `category: 'icon'`. */
export const components = buildComponentsApi(rawComponents);

/** Token query API, with `tokens.utilities` sub-domain. */
export const tokens = buildTokensApi(rawTokens, tokenUtilities);

// ─── Public types ───────────────────────────────────────────────────────────

export type {
    ComponentExample,
    ComponentFacetNode,
    ComponentFilter,
    ComponentNode,
    ComponentProp,
    ComponentSubComponent,
} from './types/components';
export type {
    TokenFacetNode,
    TokenFilter,
    TokenNode,
    TokenUtilityFilter,
    TokenUtilityNode,
    TokenUtilityProperty,
    TokenValueType,
} from './types/tokens';
