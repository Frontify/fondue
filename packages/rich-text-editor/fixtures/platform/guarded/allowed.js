export const scheduler = {
    idle: (callback) => ('requestIdleCallback' in globalThis ? requestIdleCallback(callback) : 0),
    frame: async (callback) => {
        await Promise.resolve();
        callback();
    },
};
export const sorted = (list) => [...list].sort();
export const query = `@media (min-width: 1px) { .a { color: red; } }`;
