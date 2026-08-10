/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types for oxfmt-config
import { defineConfig } from "@frontify/oxfmt-config";

import tsconfig from "./tsconfig.json" with { type: "json" };

const internalPatterns = Object.keys(tsconfig.compilerOptions.paths).map(
    (path) => path.replace("/*", "/**"),
);

export default defineConfig({
    internalPatterns,
    trailingComma: "all",
    arrowParens: "always",
    endOfLine: "lf",
    overrides: [
        {
            files: ["tsconfig.json", "tsconfig.*.json"],
            options: {
                trailingComma: "none",
            },
        },
    ],
});
