import { join } from "path";
import { writeFile } from "fs/promises";
import { componentsPath } from "../vite.config";
import { GENERATED_ICONS_INDEX_PATH } from "./generateReactIcons";

(async () => {
    const components = componentsPath
        .map((filePath) => {
            const filename = filePath.name;
            return {
                name: filename.replace(/\.tsx?/, ""),
                path: filePath.path.replace(/\.tsx?/, ""),
            };
        })
        .filter((filePath) => filePath.name.indexOf(".") === -1);

    const componentNameToExport = (path: string) => `export * from "./${path}";`;

    const fileContent = `
        ${components.map((c) => componentNameToExport(c.path)).join("\n")}
        export * from "./${GENERATED_ICONS_INDEX_PATH.replace(".ts", "")}";
    `;

    writeFile(join(__dirname, "..", "dist", "index.js"), fileContent, { encoding: "utf8" });
})();
