/* eslint-disable @typescript-eslint/ban-ts-comment */
import fastGlob from "fast-glob";
import { join } from "path";
import { writeFile, readFile } from "fs/promises";
// @ts-ignore
import svgr from "@svgr/core";
import { Entry } from "fast-glob/out/types";
import IconTemplate from "../src/elements/Icon/IconTemplate";

(async () => {
    const iconsFilePath = await fastGlob("src/elements/Icon/Svg/**/*.svg", { objectMode: true });
    iconsFilePath.forEach(async (svgFilePath: Entry) => {
        const svgFileContent = await readFile(svgFilePath.path, { encoding: "utf-8" });
        const svgFileName = svgFilePath.name.replace(".svg", "");

        await svgr(
            svgFileContent,
            {
                icon: true,
                plugins: ["@svgr/plugin-jsx", "@svgr/plugin-prettier"],
                memo: true,
                template: IconTemplate,
                svgProps: {
                    width: "100%",
                    height: "100%",
                    className: "{customClassName}",
                },
            },
            { componentName: `Icon${svgFileName}` },
        ).then(async (tsxCode: string) => {
            const generatedTsxFilePath = join(
                __dirname,
                "..",
                "src",
                "elements",
                "Icon",
                "Generated",
                `Icon${svgFileName}.tsx`,
            );
            await writeFile(generatedTsxFilePath, tsxCode);
        });
    });

    const componentsFilePath = await fastGlob(
        ["src/elements/**/[a-zA-Z]*.tsx", "src/components/**/[a-zA-Z]*.tsx", "src/compositions/**/[a-zA-Z]*.tsx"],
        { objectMode: true },
    );
    const components = componentsFilePath
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((filePath) => {
            const filename = filePath.name;
            return {
                name: filename.replace(".tsx", ""),
                path: filePath.path.replace(".tsx", ""),
            };
        })
        .filter((filePath) => filePath.name.indexOf(".") === -1)
        .filter((component) => component.name !== "Icon");

    const componentNameToImport = (name: string, path: string) =>
        `import ${name} from "./${path.replace("src/", "")}";`;

    const fileContent = `${components.map((c) => componentNameToImport(c.name, c.path)).join("\n")}

export {
    ${components.map((c) => c.name).join(",\n    ")},
};
`;

    writeFile(join(__dirname, "..", "src", "index.ts"), fileContent, { encoding: "utf8" });
})();
