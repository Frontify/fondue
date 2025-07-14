/* (c) Copyright Frontify Ltd., all rights reserved. */

import fs from 'node:fs';
import path from 'node:path';

import { cssVariableReplacements, deprecatedCssVariables, tailwindClassReplacements } from './replacements';

const deprecatedOccurrences: { filePath: string; line: number; variable: string }[] = [];

const logDeprecatedInFile = (filePath: string, deprecatedMap: Record<string, string>) => {
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
                if (line?.includes(deprecatedVar)) {
                    deprecatedOccurrences.push({
                        filePath,
                        line: i + 1,
                        variable: deprecatedVar,
                    });
                }
            }
        }
    } catch (error) {
        console.error(
            `Could not check for deprecated variables in file ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
};

const replaceInFile = (filePath: string, replacementMap: Record<string, string>, dryRun: boolean) => {
    try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            return;
        }

        const content = fs.readFileSync(filePath, 'utf8');

        const replacementsToApply: { selector: string; replacement: string; oldValue: string; newValue: string }[] = [];
        for (const [selector, value] of Object.entries(replacementMap)) {
            const regexMatch = content.match(new RegExp(selector, 'g'));

            for (const match of regexMatch ?? []) {
                const newValue = match.replaceAll(new RegExp(selector, 'g'), value);
                if (newValue !== match) {
                    replacementsToApply.push({
                        selector,
                        replacement: value,
                        oldValue: match,
                        newValue,
                    });
                }
            }
        }

        if (replacementsToApply.length === 0) {
            return;
        }

        if (dryRun) {
            console.log(`Potential changes for: ${filePath}`);
            for (const { oldValue, newValue } of replacementsToApply) {
                console.log(`  '${oldValue}' => '${newValue}'`);
            }
            console.log('');
            return;
        }

        let modifiedContent = content;
        for (const { selector, newValue } of replacementsToApply) {
            modifiedContent = modifiedContent.replaceAll(new RegExp(selector, 'g'), newValue);
        }

        fs.writeFileSync(filePath, modifiedContent, 'utf8');
        console.log(`Updated: ${filePath}`);
    } catch (error) {
        console.error(
            `Could not process file ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
};

const traverseDir = (
    dir: string,
    replacementMap: Record<string, string>,
    deprecatedMap: Record<string, string>,
    dryRun: boolean,
) => {
    try {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);

            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                traverseDir(fullPath, replacementMap, deprecatedMap, dryRun);
            } else {
                replaceInFile(fullPath, replacementMap, dryRun);
                logDeprecatedInFile(fullPath, deprecatedMap);
            }
        }
    } catch (error) {
        console.error(`Could not read directory ${dir}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

const replaceTokens = (
    directory: string,
    replacementMap: Record<string, string>,
    deprecatedMap: Record<string, string>,
    { dryRun = false }: { dryRun?: boolean } = {},
) => {
    if (dryRun) {
        console.log('\n\n==================================================');
        console.log('DRY RUN MODE ENABLED. NO FILES WILL BE MODIFIED.');
        console.log('==================================================\n');
    }

    traverseDir(directory, replacementMap, deprecatedMap, dryRun);

    if (deprecatedOccurrences.length > 0) {
        console.log('\n\n==================================================');
        console.log('🚨 DEPRECATED CSS VARIABLES WITHOUT REPLACEMENT FOUND 🚨');
        console.log('==================================================\n');

        const groupedByFile = deprecatedOccurrences.reduce(
            (acc, { filePath, line, variable }) => {
                if (!acc[filePath]) {
                    acc[filePath] = [];
                }
                acc[filePath].push(`  - Line ${line}: ${variable}`);
                return acc;
            },
            {} as Record<string, string[]>,
        );

        for (const [file, occurrences] of Object.entries(groupedByFile)) {
            console.log(`File: ${file}`);
            for (const occurrence of occurrences) {
                console.log(occurrence);
            }
            console.log('');
        }

        console.log(
            'Please replace the variables listed above with their new counterparts from the design system tokens.',
        );
        console.log('==================================================\n');

        process.exit(1);
    }
};

export const replaceCssVariables = (directory: string, { dryRun = false }: { dryRun?: boolean } = {}) => {
    const escapedCssVariableReplacements = Object.fromEntries(
        Object.entries(cssVariableReplacements).map(([key, value]) => [
            key.replaceAll(/[$()*+./?[\\\]^{|}-]/g, '\\$&'),
            value,
        ]),
    );
    replaceTokens(directory, escapedCssVariableReplacements, deprecatedCssVariables, { dryRun });
};

export const replaceTailwindClasses = (directory: string, { dryRun = false }: { dryRun?: boolean } = {}) => {
    replaceTokens(directory, tailwindClassReplacements, {}, { dryRun });
};
