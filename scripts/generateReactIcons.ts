/* eslint-disable @typescript-eslint/ban-ts-comment */
import fastGlob from "fast-glob";
import { join } from "path";
import { writeFile, readFile } from "fs/promises";
// @ts-ignore
import svgr from "@svgr/core";
import { Entry } from "fast-glob/out/types";
import IconTemplate from "../src/foundation/Icon/IconTemplate";

(async () => {
    const iconsSvgPath = await fastGlob("src/foundation/Icon/Svg/**/*.svg", { objectMode: true });
    iconsSvgPath.forEach(async (svgPath: Entry) => {
        const svgFileContent = await readFile(svgPath.path, { encoding: "utf-8" });
        const svgFileName = svgPath.name.replace(".svg", "");

        await svgr(
            svgFileContent,
            {
                icon: true,
                plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
                memo: true,
                template: IconTemplate,
                dimensions: false,
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
                "foundation",
                "Icon",
                "Generated",
                `Icon${svgFileName}.tsx`,
            );
            await writeFile(generatedTsxFilePath, tsxCode);
        });
    });
})();
