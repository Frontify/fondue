/* eslint-disable @typescript-eslint/ban-ts-comment */
import fastGlob from "fast-glob";
import { join } from "path";
import { writeFile, readFile } from "fs/promises";
// @ts-ignore
import svgr from "@svgr/core";
import { Entry } from "fast-glob/out/types";
import IconTemplate from "../src/foundation/Icon/IconTemplate";

(async () => {
    const componentsFilePath = await fastGlob(
        ["src/foundation/**/*.ts", "src/foundation/**/[a-zA-Z]*.tsx", "src/components/**/[a-zA-Z]*.tsx"],
        { objectMode: true, ignore: ["src/foundation/Icon/Generated/**/*"] },
    );

    const components = componentsFilePath
        .sort((a, b) => a.path.localeCompare(b.path))
        .map((filePath) => {
            const filename = filePath.name;
            return {
                name: filename.replace(/\.tsx?/, ""),
                path: filePath.path.replace(/\.tsx?/, ""),
            };
        })
        .filter((filePath) => filePath.name.indexOf(".") === -1);

    const componentNameToImport = (path: string) => `export * from "./${path.replace("src/", "")}";`;

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
                    style: "{style}",
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

    const iconComponentsFilePath = await fastGlob(["src/foundation/Icon/Generated/**/*.tsx"], { objectMode: true });

    const iconComponents = iconComponentsFilePath
        .sort((a, b) => a.path.localeCompare(b.path))
        .map((filePath) => {
            const filename = filePath.name;
            return {
                name: filename.replace(".tsx", ""),
                path: filePath.path.replace(".tsx", ""),
            };
        })
        .filter((filePath) => filePath.name.indexOf(".") === -1)
        .filter((component) => component.name !== "Icon");

    const iconComponentNameToImport = (name: string, path: string) =>
        `import ${name} from "./${path.replace("src/", "")}";`;

    const fileContent = `import "./styles.css";
export * from "./types";
${components.map((c) => componentNameToImport(c.path)).join("\n")}
${iconComponents.map((ic) => iconComponentNameToImport(ic.name, ic.path)).join("\n")}

export {
    ${iconComponents.map((ic) => `${ic.name},`).join("\n    ")}
};
`;

    writeFile(join(__dirname, "..", "src", "index.ts"), fileContent, { encoding: "utf8" });
})();
