/* eslint-disable @typescript-eslint/ban-ts-comment */
import fastGlob from "fast-glob";
import { join } from "path";
import { writeFile, readFile } from "fs/promises";
// @ts-ignore
import { transform } from "@svgr/core";
import { Entry } from "fast-glob/out/types";
import { IconTemplate } from "../src/components/Icon/IconTemplate";

export const GENERATED_ICONS_INDEX_PATH = "src/components/Icon/Generated/index.ts";

(async () => {
    const iconsSvgPath = await fastGlob("src/components/Icon/Svg/**/*.svg", { objectMode: true });
    iconsSvgPath.forEach(async (svgPath: Entry) => {
        const svgFileContent = await readFile(svgPath.path, { encoding: "utf-8" });
        const svgFileName = svgPath.name.replace(".svg", "");

        await transform(
            svgFileContent,
            {
                icon: true,
                plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
                memo: true,
                template: IconTemplate,
                dimensions: false,
                typescript: true,
                svgProps: {
                    width: "100%",
                    height: "100%",
                    className: "{customClassName}",
                    name: `Icon${svgFileName}`,
                },
            },
            { componentName: `Icon${svgFileName}` },
        ).then(async (tsxCode: string) => {
            const generatedTsxFilePath = join(
                __dirname,
                "..",
                "src",
                "components",
                "Icon",
                "Generated",
                `Icon${svgFileName}.tsx`,
            );
            await writeFile(generatedTsxFilePath, tsxCode);
        });
    });

    const iconComponentsFilePath = await fastGlob(["src/components/Icon/Generated/**/*.tsx"], { objectMode: true });

    const iconComponents = iconComponentsFilePath
        .map((filePath) => {
            const filename = filePath.name;
            return {
                name: filename.replace(".tsx", ""),
                path: filePath.path.replace(".tsx", ""),
            };
        })
        .filter((filePath) => filePath.name.indexOf(".") === -1)
        .filter((component) => component.name !== "Icon");

    const iconComponentNameToExport = (name: string) => `export { default as ${name} } from "./${name}";`;

    const fileContent = `
        ${iconComponents.map((c) => iconComponentNameToExport(c.name)).join("\n")}
    `;

    writeFile(join(__dirname, "..", GENERATED_ICONS_INDEX_PATH), fileContent, { encoding: "utf8" });
})();
