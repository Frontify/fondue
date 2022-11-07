/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The main source
 * https://github.com/hanford/remark-slate
 */
import deserialize from './deserialize';
import serialize from './serialize';
import plugin from './plugin';

export * from './astTypes';
export { deserialize, serialize };
export default plugin;
