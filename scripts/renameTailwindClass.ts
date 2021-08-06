import fastGlob from "fast-glob";
import fs from "fs";
import tailwindClassList from "./tailwindClassList";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import tailwindConfig from "../tailwind.config";

const tailwindPrefix = tailwindConfig.prefix;

(async () => {
    const files = await fastGlob([
        "src/elements/**/*.ts",
        "src/elements/**/[a-zA-Z]*.tsx",
        "src/components/**/[a-zA-Z]*.tsx",
        "src/compositions/**/[a-zA-Z]*.tsx",
    ]);

    files
        .map((filePath) => {
            const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

            return {
                path: filePath,
                newContent: addPrefixToClasses(fileContent),
            };
        })
        .forEach((file) => {
            fs.writeFileSync(file.path, file.newContent, { encoding: "utf-8" });
        });
})();

const addPrefixToClasses = (fileContent: string) => {
    let fileContentWithClassPrefix = fileContent;

    const escapeRegExp = (s: string) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

    (tailwindClassList as string[]).forEach((className) => {
        fileContentWithClassPrefix = fileContentWithClassPrefix.replace(
            new RegExp(`([\`"':\\s])(?!${tailwindPrefix})(-?${escapeRegExp(className)})(?![-/])`),
            `$1${tailwindPrefix}$2`,
        );
    });

    return fileContentWithClassPrefix;
};
