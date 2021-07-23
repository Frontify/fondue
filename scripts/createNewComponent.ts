import { access, mkdir, writeFile } from "fs/promises";
import { green, red } from "chalk";
import templates from "./templates";

(async () => {
    const componentType = process.argv[3] ? process.argv[2] : "components";
    const componentName = process.argv[3] || process.argv[2];

    if (!componentName) {
        console.error(red("You need to supply a component name."));
        process.exit(1);
    }

    console.log(`Creating ${componentName} component...`);

    const componentDirectory = `./src/${componentType}/${componentName}`;

    let directoryExists: boolean;
    try {
        await access(componentDirectory);
        directoryExists = true;
    } catch {
        directoryExists = false;
    }

    if (directoryExists) {
        console.error(red(`Component ${componentName} already exists.`));
        process.exit(1);
    }

    await mkdir(componentDirectory);

    const generatedTemplates = templates.map((template) => template(componentName, componentType));

    generatedTemplates.forEach(async (template) => {
        await writeFile(`${componentDirectory}/${componentName}${template.extension}`, template.content);
    });

    console.log(green(`Component created in ${componentDirectory}`));
})();
