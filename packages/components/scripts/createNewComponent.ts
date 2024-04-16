/* (c) Copyright Frontify Ltd., all rights reserved. */

import { access, mkdir, writeFile } from 'node:fs/promises';

import chalk from 'chalk';

import templates from './templates';

await (async () => {
    const componentName = process.argv[3] || process.argv[2];

    if (!componentName) {
        console.error(chalk.red('You need to supply a component name.'));
        process.exit(1);
    }

    console.log(`Creating ${componentName} component...`);

    const componentDirectory = `./src/components/${componentName}`;

    let directoryExists: boolean;
    try {
        await access(componentDirectory);
        directoryExists = true;
    } catch {
        directoryExists = false;
    }

    if (directoryExists) {
        console.error(chalk.red(`Component ${componentName} already exists.`));
        process.exit(1);
    }

    const generatedTemplates = templates.map((template) => template(componentName));
    console.log(generatedTemplates);

    await mkdir(componentDirectory);

    for (const template of generatedTemplates) {
        let directory = componentDirectory;
        if (template.subdirectory) {
            directory = `${componentDirectory}/${template.subdirectory}`;
            let directoryExists: boolean;
            try {
                await access(directory);
                directoryExists = true;
            } catch {
                directoryExists = false;
            }
            if (!directoryExists) {
                await mkdir(`${componentDirectory}/${template.subdirectory}`);
            }
        }
        await writeFile(`${directory}/${componentName}${template.extension}`, template.content);
    }

    console.log(chalk.green(`Component created in ${componentDirectory}`));
})();
