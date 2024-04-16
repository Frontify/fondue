/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

import chalk from 'chalk';

import templates from './templates';

(() => {
    const componentName = process.argv[3] || process.argv[2];

    if (!componentName) {
        console.error(chalk.red('You need to supply a component name.'));
        process.exit(1);
    }

    console.log(`Creating ${componentName} component...`);

    const componentDirectory = `./src/components/${componentName}`;

    if (existsSync(componentDirectory)) {
        console.error(chalk.red(`Component ${componentName} already exists.`));
        process.exit(1);
    }

    const generatedTemplates = templates.map((template) => template(componentName));

    mkdirSync(componentDirectory);

    for (const template of generatedTemplates) {
        let directory = componentDirectory;
        if (template.subdirectory) {
            directory = `${componentDirectory}/${template.subdirectory}`;
            if (!existsSync(directory)) {
                mkdirSync(`${componentDirectory}/${template.subdirectory}`);
            }
        }
        writeFileSync(`${directory}/${componentName}${template.extension}`, template.content);
    }

    console.log(chalk.green(`Component created in ${componentDirectory}`));
})();
