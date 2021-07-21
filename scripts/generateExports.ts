import fastGlob from "fast-glob";
import { join } from "path";
import { writeFile } from "fs/promises";

(async () => {
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

    const iconsFilePath = await fastGlob("src/elements/Icon/Svg/**/*.svg", { objectMode: true });
    const iconsName = iconsFilePath
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((filePath) => filePath.name.replace(".svg", ""));
    const componentizedIconsName = (iconName: string) => `Icon${iconName}`;

    const IconNameToImport = (iconName: string) =>
        `import { ReactComponent as ${componentizedIconsName(iconName)} } from "./elements/Icon/Svg/${iconName}.svg";`;

    const fileContent = `${components.map((c) => componentNameToImport(c.name, c.path)).join("\n")}
${iconsName.map(IconNameToImport).join("\n")}

export {
    ${components.map((c) => c.name).join(",\n    ")},
    ${iconsName.map(componentizedIconsName).join(",\n    ")},
};
`;

    writeFile(join(__dirname, "..", "src", "index.ts"), fileContent, { encoding: "utf8" });
})();
