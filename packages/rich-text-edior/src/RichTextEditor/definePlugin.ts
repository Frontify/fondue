/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from './types';

/**
 * Turns a plugin declaration into something mounted with `new`, so every plugin
 * reads the same way at the call site whether or not it takes options:
 *
 * ```tsx
 * plugins={[new BoldPlugin(), new MentionPlugin({ items })]}
 * ```
 *
 * The plugin itself stays what it was — a plain object, declared inside the
 * builder. That is the point of the indirection rather than a hand-written
 * class: an object literal returned from a function typed `=> RtePlugin` is
 * contextually typed, so `render: ({ children }) => …` and `toolbar: (api) => …`
 * need no annotations, and there is no `this` for a callback to lose.
 *
 * The builder's own parameters become the constructor's, so the three cases
 * follow from how it is written and nothing has to be declared twice:
 *
 * ```ts
 * definePlugin(() => ({ … }))                          // new BoldPlugin()
 * definePlugin((options: Options = {}) => ({ … }))      // new ColumnBreakPlugin() | ({ columns: 3 })
 * definePlugin((options: Options) => ({ … }))           // new MentionPlugin({ items }) — required
 * ```
 */
export const definePlugin = <TArgs extends unknown[]>(
    build: (...args: TArgs) => RtePlugin,
): new (...args: TArgs) => RtePlugin =>
    // Anonymous on purpose: the plugin's identity is its `id`, which is what
    // the editor keys on — a class name would be a second, unused one.
    class {
        constructor(...args: TArgs) {
            Object.assign(this, build(...args));
        }
    } as new (...args: TArgs) => RtePlugin;
