/* (c) Copyright Frontify Ltd., all rights reserved. */

import fs from 'fs';
import path from 'path';
import { cssVariableReplacements, deprecatedCssVariables } from './replacements';

const logDeprecatedInFile = (filePath, deprecatedMap) => {
    try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            return;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            for (const deprecatedVar of Object.keys(deprecatedMap)) {
                if (line.includes(deprecatedVar)) {
                    deprecatedOccurrences.push({
                        filePath,
                        line: i + 1,
                        variable: deprecatedVar,
                    });
                }
            }
        }
    } catch (error) {
        console.error(`Could not check for deprecated variables in file ${filePath}: ${error.message}`);
    }
};

const replaceInFile = (filePath, replacementMap, dryRun) => {
    try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            return;
        }

        const content = fs.readFileSync(filePath, 'utf8');

        const replacementsToApply = [];
        for (const [oldVar, newVar] of Object.entries(replacementMap)) {
            if (content.includes(oldVar)) {
                replacementsToApply.push({ oldVar, newVar });
            }
        }

        if (replacementsToApply.length === 0) {
            return;
        }

        if (dryRun) {
            console.log(`[DRY RUN] Potential changes for: ${filePath}`);
            for (const { oldVar, newVar } of replacementsToApply) {
                console.log(`  '${oldVar}' => '${newVar}'`);
            }
            console.log('');
            return;
        }

        let modifiedContent = content;
        for (const { oldVar, newVar } of replacementsToApply) {
            modifiedContent = modifiedContent.replace(
                new RegExp(oldVar.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),
                newVar,
            );
        }

        fs.writeFileSync(filePath, modifiedContent, 'utf8');
        console.log(`Updated: ${filePath}`);
    } catch (error) {
        console.error(`Could not process file ${filePath}: ${error.message}`);
    }
};

const traverseDir = (dir, replacementMap, deprecatedMap, dryRun) => {
    try {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);

            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                traverseDir(fullPath, replacementMap, dryRun);
            } else {
                replaceInFile(fullPath, replacementMap, dryRun);
                logDeprecatedInFile(fullPath, deprecatedMap);
            }
        }
    } catch (error) {
        console.error(`Could not read directory ${dir}: ${error.message}`);
    }
};

export default (directory, { dryRun = false } = {}) => {
    if (dryRun) {
        console.log('\n\n==================================================');
        console.log('DRY RUN MODE ENABLED. NO FILES WILL BE MODIFIED.');
        console.log('==================================================\n');
    }
    traverseDir(directory, cssVariableReplacements, deprecatedCssVariables, dryRun);

    if (deprecatedOccurrences.length > 0) {
        console.log('\n\n==================================================');
        console.log('🚨 DEPRECATED CSS VARIABLES WITHOUT REPLACEMENT FOUND 🚨');
        console.log('==================================================\n');

        const groupedByFile = deprecatedOccurrences.reduce((acc, { filePath, line, variable }) => {
            if (!acc[filePath]) {
                acc[filePath] = [];
            }
            acc[filePath].push(`  - Line ${line}: ${variable}`);
            return acc;
        }, {});

        for (const [file, occurrences] of Object.entries(groupedByFile)) {
            console.log(`File: ${file}`);
            occurrences.forEach((occurrence) => console.log(occurrence));
            console.log('');
        }

        console.log(
            'Please replace the variables listed above with their new counterparts from the design system tokens.',
        );
        console.log('==================================================\n');

        process.exit(1);
    }
};
