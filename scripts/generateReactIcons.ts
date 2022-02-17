/* eslint-disable @typescript-eslint/ban-ts-comment */
import fastGlob from "fast-glob";
import { join } from "path";
import { writeFile, readFile } from "fs/promises";
import { camelCase, toUpper } from "lodash";
// @ts-ignore
import { transform } from "@svgr/core";
import { Entry } from "fast-glob/out/types";
import { IconTemplate } from "../src/foundation/Icon/IconTemplate";
import { IconTemplateDynamic } from "../src/foundation/Icon/IconTemplateDynamic";

const ICON_SOURCE_DIRECTORY = `node_modules/@frontify/arcade-icons/icons/`;
const GENERATED_ICONS_DIRECTORY = `src/foundation/Icon/Generated/`;
const ICON_BUILD_DIRECTORY = join(__dirname, "..", "src", "foundation", "Icon", "Generated");
const ICON_COMPONENT_PREFIX = "Icon";
const ICON_SIZES = ["12", "16", "20", "24", "32"];

export const GENERATED_ICONS_INDEX_PATH = `${GENERATED_ICONS_DIRECTORY}index.ts`;

/**
 * Gets an array of all svg file paths from the source directory
 */
const getSvgFilePaths = async () => {
    return await fastGlob(`${ICON_SOURCE_DIRECTORY}**/*.svg`, { objectMode: true });
};

/**
 * Gets an array of all the directories containing icon variants (i.e. the parents of the svgs)
 */
const getShapeFolderPaths = async () => {
    return await fastGlob(`${ICON_SOURCE_DIRECTORY}**`, {
        onlyDirectories: true,
        objectMode: true,
    });
};

/**
 * Given an icon name, returns the size of the icon. Returns null if no size found.
 */
const getSize = (name) => {
    let size = null;
    ICON_SIZES.forEach((element) => {
        if (name.includes(element)) {
            size = element;
        }
    });
    return size;
};

/**
 * Given an svg file path, uses the file's content to generate a corresponding React
 * component in the build directory.
 */
const generateSvgComponent = async (svgPath: Entry) => {
    const svgFileContent = await readFile(svgPath.path, { encoding: "utf-8" });
    const svgFileName = camelCase(svgPath.name.replace(".svg", "")).replace(/^(.)/, toUpper);

    await transform(
        svgFileContent,
        {
            plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
            memo: true,
            template: IconTemplate,
            dimensions: true,
            typescript: true,
            svgProps: {
                className: "{customClassName}",
                name: `${ICON_COMPONENT_PREFIX}${svgFileName}`,
            },
        },
        { componentName: `${ICON_COMPONENT_PREFIX}${svgFileName}` },
    ).then(async (tsxCode: string) => {
        const generatedTsxFilePath = join(ICON_BUILD_DIRECTORY, `${ICON_COMPONENT_PREFIX}${svgFileName}.tsx`);
        await writeFile(generatedTsxFilePath, tsxCode);
    });
};

/**
 * Given the path of a directory containing icon svgs, writes a React component to the build
 * directory that accepts props for size and filled. i.e. all icon variants for a particular shape
 * in one component.
 */
const generateDynamicIcon = async (shapeFolderPath: Entry) => {
    const svgPaths = await fastGlob(`${shapeFolderPath.path}/**/*.svg`, { objectMode: true });
    const shapeName = camelCase(`${shapeFolderPath.name}`).replace(/^(.)/, toUpper);
    const components = [];

    svgPaths.forEach((icon) => {
        const iconName = camelCase(icon.name.replace(".svg", "")).replace(/^(.)/, toUpper);
        const size = getSize(iconName);
        const filled = iconName.toUpperCase().includes("filled".toUpperCase());

        components.push({
            size: size,
            filled: filled,
            name: ICON_COMPONENT_PREFIX + iconName,
        });
    });

    const filePath = join(ICON_BUILD_DIRECTORY, `${ICON_COMPONENT_PREFIX}${shapeName}.tsx`);
    const tpl = IconTemplateDynamic({ components, name: `${ICON_COMPONENT_PREFIX}${shapeName}` });

    await writeFile(filePath, tpl);
};

/**
 * Generates the index file in build directory
 */
const generateIndex = async () => {
    const iconComponentsFilePath = await fastGlob(["src/foundation/Icon/Generated/**/*.tsx"], { objectMode: true });
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
    const fileContent = `${iconComponents.map((c) => iconComponentNameToExport(c.name)).join("\n")}\n`;

    await writeFile(join(__dirname, "..", GENERATED_ICONS_INDEX_PATH), fileContent, { encoding: "utf8" });
};

/**
 * Script
 */
(async () => {
    const iconSvgPaths = await getSvgFilePaths();
    const iconShapeFolderPaths = await getShapeFolderPaths();

    iconSvgPaths.forEach((svgPath: Entry) => {
        generateSvgComponent(svgPath);
    });

    iconShapeFolderPaths.forEach((directory: Entry) => {
        generateDynamicIcon(directory);
    });

    generateIndex();
})();
