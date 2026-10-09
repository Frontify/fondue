/* (c) Copyright Frontify Ltd., all rights reserved. */

export const STORAGE = ['localStorage', 'sessionStorage', 'indexedDB', 'caches'] as const;

/** Replaces each browser storage API with one that throws on any use (SPEC-rich-text-persistence/AC-044); `accessed` logs every use, and `restore` undoes it. */
export const stubStorage = (): { readonly accessed: string[]; readonly restore: () => void } => {
    const accessed: string[] = [];
    const originals = STORAGE.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)] as const);
    for (const name of STORAGE) {
        const failing = new Proxy(
            {},
            {
                get: () => {
                    throw new Error(`The editor may not use ${name}.`);
                },
            },
        );
        Object.defineProperty(globalThis, name, {
            configurable: true,
            get: () => {
                accessed.push(name);
                return failing;
            },
        });
    }
    const restore = () => {
        for (const [name, descriptor] of originals) {
            if (descriptor === undefined) {
                Reflect.deleteProperty(globalThis, name);
            } else {
                Object.defineProperty(globalThis, name, descriptor);
            }
        }
    };
    return { accessed, restore };
};
