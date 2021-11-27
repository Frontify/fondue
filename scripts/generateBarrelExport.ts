import fastGlob from "fast-glob";
import { join } from "path";
import { writeFile } from "fs/promises";

(async () => {
    const componentsFilePath = await fastGlob(
        ["src/foundation/**/*.ts", "src/foundation/**/[a-zA-Z]*.tsx", "src/components/**/[a-zA-Z]*.tsx"],
        { objectMode: true, ignore: ["src/foundation/Icon/Generated/**/*"] },
    );

    const components = componentsFilePath
        .map((filePath) => {
            const filename = filePath.name;
            return {
                name: filename.replace(/\.tsx?/, ""),
                path: filePath.path.replace(/\.tsx?/, ""),
            };
        })
        .filter((filePath) => filePath.name.indexOf(".") === -1);

    const componentNameToImport = (path: string) => `export * from "./${path}";`;

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

    const iconComponentNameToImport = (name: string, path: string) =>
        `import ${name} from "./${path.replace("src/", "")}";`;

    const fileContent = `
        ${components.map((c) => componentNameToImport(c.name)).join("\n")}
        ${iconComponents.map((ic) => iconComponentNameToImport(ic.name, ic.name)).join("\n")}

        export {
            ${iconComponents.map((ic) => `${ic.name},`).join("\n    ")}
        };
    `;

    writeFile(join(__dirname, "..", "dist", "index.js"), fileContent, { encoding: "utf8" });
})();
