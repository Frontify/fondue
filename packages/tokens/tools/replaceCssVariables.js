/* (c) Copyright Frontify Ltd., all rights reserved. */

import fs from 'fs';
import path from 'path';

const replacements = {
    'var(--base-color)': 'var(--color-surface-default)',
    'var(--base-color-alt)': 'var(--color-surface-dim)',
    'var(--body-family)': 'var(--typography-font-family-primary)',
    'var(--body-family-stack)': 'var(--body-family)',
    'var(--body-weight-name)': 'var(--typography-font-weight-regular)',
    'var(--body-weight-number)': 'var(--typography-font-weight-regular)',
    'var(--body-weight-strong-name)': 'var(--typography-font-weight-medium)',
    'var(--body-weight-strong-number)': 'var(--typography-font-weight-medium)',
    'var(--body-weight-x-strong-name)': 'var(--typography-font-weight-bold)',
    'var(--body-weight-x-strong-number)': 'var(--typography-font-weight-bold)',
    'var(--body-size-x-small)': 'var(--typography-font-size-x-small)',
    'var(--body-size-x-small-line-height)': 'var(--typography-line-height-tight)',
    'var(--body-size-small)': 'var(--typography-font-size-small)',
    'var(--body-size-small-line-height)': 'var(--typography-line-height-tight)',
    'var(--body-size-medium)': 'var(--typography-font-size-medium)',
    'var(--body-size-medium-line-height)': 'var(--typography-line-height-medium)',
    'var(--body-size-large)': 'var(--typography-font-size-large)',
    'var(--body-size-large-line-height)': 'var(--typography-line-height-wide)',
    'var(--box-neutral-color)': 'var(--color-container-secondary-default)',
    'var(--box-neutral-color-hover)': 'var(--color-container-secondary-hover)',
    'var(--box-neutral-color-pressed)': 'var(--color-container-secondary-active)',
    'var(--box-neutral-inverse-color)': 'var(--color-container-secondary-on-secondary-container)',
    'var(--box-neutral-inverse-color-hover)': 'var(--color-container-secondary-on-secondary-container)',
    'var(--box-neutral-inverse-color-pressed)': 'var(--color-container-secondary-on-secondary-container)',
    'var(--box-neutral-strong-color)': 'var(--color-primary-default)',
    'var(--box-neutral-strong-color-hover)': 'var(--color-primary-hover)',
    'var(--box-neutral-strong-color-pressed)': 'var(--color-primary-active)',
    'var(--box-neutral-strong-inverse-color)': 'var(--color-primary-on-primary)',
    'var(--box-neutral-strong-inverse-color-hover)': 'var(--color-primary-on-primary)',
    'var(--box-neutral-strong-inverse-color-pressed)': 'var(--color-primary-on-primary)',
    'var(--box-neutral-mighty-color)': 'var(--color-primary-default)',
    'var(--box-neutral-mighty-color-hover)': 'var(--color-primary-hover)',
    'var(--box-neutral-mighty-color-pressed)': 'var(--color-primary-active)',
    'var(--box-neutral-mighty-inverse-color)': 'var(--color-primary-on-primary)',
    'var(--box-neutral-mighty-inverse-color-hover)': 'var(--color-primary-on-primary)',
    'var(--box-neutral-mighty-inverse-color-pressed)': 'var(--color-primary-on-primary)',
    'var(--box-selected-color)': 'var(--color-container-highlight-default)',
    'var(--box-selected-color-hover)': 'var(--color-container-highlight-hover)',
    'var(--box-selected-color-pressed)': 'var(--color-container-highlight-active)',
    'var(--box-selected-inverse-color)': 'var(--color-container-highlight-on-highlight-container)',
    'var(--box-selected-inverse-color-hover)': 'var(--color-container-highlight-on-highlight-container)',
    'var(--box-selected-inverse-color-pressed)': 'var(--color-container-highlight-on-highlight-container)',
    'var(--box-selected-strong-color)': 'var(--color-highlight-default)',
    'var(--box-selected-strong-color-hover)': 'var(--color-highlight-hover)',
    'var(--box-selected-strong-color-pressed)': 'var(--color-highlight-active)',
    'var(--box-selected-strong-inverse-color)': 'var(--color-highlight-on-highlight)',
    'var(--box-selected-strong-inverse-color-hover)': 'var(--color-highlight-on-highlight)',
    'var(--box-selected-strong-inverse-color-pressed)': 'var(--color-highlight-on-highlight)',
    'var(--box-disabled-color)': 'var(--color-container-disabled-default)',
    'var(--box-disabled-color-inverse)': 'var(--color-container-disabled-on-disabled)',
    'var(--box-disabled-strong-color)': 'var(--color-disabled-default)',
    'var(--box-disabled-strong-color-inverse)': 'var(--color-disabled-on-disabled)',
    'var(--box-positive-color)': 'var(--color-container-success-default)',
    'var(--box-positive-color-hover)': 'var(--color-container-success-hover)',
    'var(--box-positive-color-pressed)': 'var(--color-container-success-active)',
    'var(--box-positive-inverse-color)': 'var(--color-container-success-on-success-container)',
    'var(--box-positive-inverse-color-hover)': 'var(--color-container-success-on-success-container)',
    'var(--box-positive-inverse-color-pressed)': 'var(--color-container-success-on-success-container)',
    'var(--box-positive-strong-color)': 'var(--color-success-default)',
    'var(--box-positive-strong-color-hover)': 'var(--color-success-hover)',
    'var(--box-positive-strong-color-pressed)': 'var(--color-success-active)',
    'var(--box-positive-strong-inverse-color)': 'var(--color-success-on-success)',
    'var(--box-positive-strong-inverse-color-hover)': 'var(--color-success-on-success)',
    'var(--box-positive-strong-inverse-color-pressed)': 'var(--color-success-on-success)',
    'var(--box-negative-color)': 'var(--color-container-error-default)',
    'var(--box-negative-color-hover)': 'var(--color-container-error-hover)',
    'var(--box-negative-color-pressed)': 'var(--color-container-error-active)',
    'var(--box-negative-inverse-color)': 'var(--color-container-error-on-error-container)',
    'var(--box-negative-inverse-color-hover)': 'var(--color-container-error-on-error-container)',
    'var(--box-negative-inverse-color-pressed)': 'var(--color-container-error-on-error-container)',
    'var(--box-negative-strong-color)': 'var(--color-error-default)',
    'var(--box-negative-strong-color-hover)': 'var(--color-error-hover)',
    'var(--box-negative-strong-color-pressed)': 'var(--color-error-active)',
    'var(--box-negative-strong-inverse-color)': 'var(--color-error-on-error)',
    'var(--box-negative-strong-inverse-color-hover)': 'var(--color-error-on-error)',
    'var(--box-negative-strong-inverse-color-pressed)': 'var(--color-error-on-error)',
    'var(--box-warning-color)': 'var(--color-container-warning-default)',
    'var(--box-warning-color-hover)': 'var(--color-container-warning-hover)',
    'var(--box-warning-color-pressed)': 'var(--color-container-warning-active)',
    'var(--box-warning-inverse-color)': 'var(--color-container-warning-on-warning-container)',
    'var(--box-warning-inverse-color-hover)': 'var(--color-container-warning-on-warning-container)',
    'var(--box-warning-inverse-color-pressed)': 'var(--color-container-warning-on-warning-container)',
    'var(--box-warning-strong-color)': 'var(--color-warning-default)',
    'var(--box-warning-strong-color-hover)': 'var(--color-warning-hover)',
    'var(--box-warning-strong-color-pressed)': 'var(--color-warning-active)',
    'var(--box-warning-strong-inverse-color)': 'var(--color-warning-on-warning)',
    'var(--box-warning-strong-inverse-color-hover)': 'var(--color-warning-on-warning)',
    'var(--box-warning-strong-inverse-color-pressed)': 'var(--color-warning-on-warning)',
    'var(--code-family)': 'var(--typography-font-family-monoe)',
    'var(--code-family-stack)': 'var(--typography-font-family-monospace)',
    'var(--code-weight-name)': 'var(--typography-font-weight-regular)',
    'var(--code-weight-number)': 'var(--typography-font-weight-regular)',
    'var(--code-weight-strong-name)': 'var(--typography-font-weight-bold)',
    'var(--code-weight-strong-number)': 'var(--typography-font-weight-bold)',
    'var(--focus-ring-color)': 'var(--color-focus-default)',
    'var(--heading-family)': 'var(--typography-font-family-primary)',
    'var(--heading-family-stack)': 'var(--typography-font-family-primary)',
    'var(--heading-weight-name)': 'var(--typography-font-weight-medium)',
    'var(--heading-weight-number)': 'var(--typography-font-weight-medium)',
    'var(--heading-weight-strong-name)': 'var(--typography-font-weight-bold)',
    'var(--heading-weight-strong-number)': 'var(--typography-font-weight-bold)',
    'var(--heading-size-medium)': 'var(--typography-font-size-medium)',
    'var(--heading-size-medium-line-height)': 'var(--typography-line-height-tight)',
    'var(--heading-size-large)': 'var(--typography-font-size-large)',
    'var(--heading-size-large-line-height)': 'var(--typography-line-height-wide)',
    'var(--heading-size-x-large)': 'var(--typography-font-size-x-large)',
    'var(--heading-size-x-large-line-height)': 'var(--typography-line-height-loose)',
    'var(--heading-size-xx-large)': 'var(--typography-font-size-xx-large)',
    'var(--heading-size-xx-large-line-height)': 'var(--typography-line-height-extra-loose)',
    'var(--line-color)': 'var(--color-line-mid)',
    'var(--line-color-weak)': 'var(--color-line-subtle)',
    'var(--line-color-strong)': 'var(--color-line-strong)',
    'var(--line-color-x-strong)': 'var(--color-line-strong)',
    'var(--line-color-xx-strong)': 'var(--color-line-strong)',
    'var(--line-color-mighty)': 'var(--color-line-mid)',
    'var(--line-width)': 'var(--border-width-default)',
    'var(--line-width-large)': 'var(--border-width-large)',
    'var(--overlay-color)': 'var(--color-overlay)',
    'var(--radius)': 'var(--border-radius-medium)',
    'var(--radius-small)': 'var(--border-radius-small)',
    'var(--radius-large)': 'var(--border-radius-large)',
    'var(--radius-x-large)': 'var(--border-radius-x-large)',
    'var(--shadow-matrix)': 'var(--shadow-default)',
    'var(--shadow-top-matrix)': 'var(--shadow-default)',
    'var(--shadow-bottom-matrix)': 'var(--shadow-default)',
    'var(--shadow-large-matrix)': 'var(--shadow-default)',
    'var(--shadow-large-color)': 'var(--color-shadow-default)',
    'var(--space-xxs)': 'var(--spacing-xx-small)',
    'var(--space-xs)': 'var(--spacing-x-small)',
    'var(--space-s)': 'var(--spacing-small)',
    'var(--space-m)': 'var(--spacing-medium)',
    'var(--space-l)': 'var(--spacing-large)',
    'var(--space-xl)': 'var(--spacing-x-large)',
    'var(--space-xxl)': 'var(--spacing-xx-large)',
    'var(--text-color)': 'var(--color-primary-default)',
    'var(--text-color-hover)': 'var(--color-primary-hover)',
    'var(--text-color-pressed)': 'var(--color-primary-active)',
    'var(--text-color-weak)': 'var(--color-secondary-default)',
    'var(--text-color-weak-hover)': 'var(--color-secondary-hover)',
    'var(--text-color-weak-pressed)': 'var(--color-secondary-active)',
    'var(--text-color-x-weak)': 'var(--color-secondary-default)',
    'var(--text-color-disabled)': 'var(--color-disabled-default)',
    'var(--text-color-negative)': 'var(--color-error-default)',
    'var(--text-color-negative-hover)': 'var(--color-error-hover)',
    'var(--text-color-negative-pressed)': 'var(--color-error-active)',
    'var(--text-color-positive)': 'var(--color-success-default)',
    'var(--text-color-positive-hover)': 'var(--color-success-hover)',
    'var(--text-color-positive-pressed)': 'var(--color-success-active)',
    'var(--text-color-warning)': 'var(--color-warning-default)',
    'var(--text-color-warning-hover)': 'var(--color-warning-hover)',
    'var(--text-color-warning-pressed)': 'var(--color-warning-active)',
    'var(--text-color-interactive)': 'var(--color-interactive-default)',
    'var(--text-color-interactive-hover)': 'var(--color-interactive-hover)',
    'var(--text-color-interactive-pressed)': 'var(--color-interactive-active)',
    'var(--button-background-color)': 'var(--color-container-secondary-default)',
    'var(--button-background-color-hover)': 'var(--color-container-secondary-hover)',
    'var(--button-background-color-pressed)': 'var(--color-container-secondary-active)',
    'var(--button-text-color)': 'var(--color-primary-default)',
    'var(--button-icon-color)': 'var(--color-primary-default)',
    'var(--button-border-color)': 'var(--color-primary-default)',
    'var(--button-negative-background-color)': 'var(--color-container-error-default)',
    'var(--button-negative-background-color-hover)': 'var(--color-container-error-hover)',
    'var(--button-negative-background-color-pressed)': 'var(--color-container-error-active)',
    'var(--button-negative-text-color)': 'var(--color-container-error-on-error-container)',
    'var(--button-negative-icon-color)': 'var(--color-container-error-on-error-container)',
    'var(--button-positive-background-color)': 'var(--color-container-success-default)',
    'var(--button-positive-background-color-hover)': 'var(--color-container-success-hover)',
    'var(--button-positive-background-color-pressed)': 'var(--color-container-success-active)',
    'var(--button-positive-text-color)': 'var(--color-container-success-on-success-container)',
    'var(--button-positive-icon-color)': 'var(--color-container-success-on-success-container)',
    'var(--button-strong-background-color)': 'var(--color-primary-default)',
    'var(--button-strong-background-color-hover)': 'var(--color-primary-hover)',
    'var(--button-strong-background-color-pressed)': 'var(--color-primary-active)',
    'var(--button-strong-text-color)': 'var(--color-primary-on-primary)',
    'var(--button-strong-icon-color)': 'var(--color-primary-on-primary)',
    'var(--button-strong-negative-background-color)': 'var(--color-error-default)',
    'var(--button-strong-negative-background-color-hover)': 'var(--color-error-hover)',
    'var(--button-strong-negative-background-color-pressed)': 'var(--color-error-active)',
    'var(--button-strong-negative-text-color)': 'var(--color-error-on-error)',
    'var(--button-strong-negative-icon-color)': 'var(--color-error-on-error)',
    'var(--button-strong-positive-background-color)': 'var(--color-success-default)',
    'var(--button-strong-positive-background-color-hover)': 'var(--color-success-hover)',
    'var(--button-strong-positive-background-color-pressed)': 'var(--color-success-active)',
    'var(--button-strong-positive-text-color)': 'var(--color-success-on-success)',
    'var(--button-strong-positive-icon-color)': 'var(--color-success-on-success)',
    'var(--button-danger-background-color)': 'var(--color-error-default)',
    'var(--button-danger-background-color-hover)': 'var(--color-error-hover)',
    'var(--button-danger-background-color-pressed)': 'var(--color-error-active)',
    'var(--button-danger-text-color)': 'var(--color-error-on-error)',
    'var(--button-danger-icon-color)': 'var(--color-error-on-error)',
};

const deprecatedOccurrences = [];

const deprecatedReplacements = {
    'var(--code-size-small)': '0.813rem',
    'var(--code-size-small-line-height)': '1rem',
    'var(--code-size-medium)': '0.875rem',
    'var(--code-size-medium-line-height)': '1rem',
    'var(--code-size-large)': '1rem',
    'var(--code-size-large-line-height)': '1.25rem',
    'var(--button-danger-border-color)': '/** @deprecated use updated token instead **/',
    'var(--button-strong-positive-border-color)': '/** @deprecated use updated token instead **/',
    'var(--button-strong-negative-border-color)': '/** @deprecated use updated token instead **/',
    'var(--button-strong-border-color)': '/** @deprecated use updated token instead **/',
    'var(--button-positive-border-color)': '/** @deprecated use updated token instead **/',
    'var(--button-negative-border-color)': '/** @deprecated use updated token instead **/',
    'var(--shadow-large-offset-x)': '/** @deprecated use updated token instead **/',
    'var(--shadow-large-offset-y)': '/** @deprecated use updated token instead **/',
    'var(--shadow-large-spread)': '/** @deprecated use updated token instead **/',
    'var(--shadow-large-blur)': '/** @deprecated use updated token instead **/',
    'var(--shadow-bottom-offset-x)': '/** @deprecated use updated token instead **/',
    'var(--shadow-bottom-offset-y)': '/** @deprecated use updated token instead **/',
    'var(--shadow-bottom-spread)': '/** @deprecated use updated token instead **/',
    'var(--shadow-top-offset-x)': '/** @deprecated use updated token instead **/',
    'var(--shadow-top-offset-y)': '/** @deprecated use updated token instead **/',
    'var(--shadow-top-spread)': '/** @deprecated use updated token instead **/',
    'var(--shadow-offset-x)': '/** @deprecated use updated token instead **/',
    'var(--shadow-offset-y)': '/** @deprecated use updated token instead **/',
    'var(--shadow-spread)': '/** @deprecated use updated token instead **/',
    'var(--shadow-blur)': '/** @deprecated use updated token instead **/',
    'var(--shadow-color)': '/** @deprecated use updated token instead **/',
};

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

const traverseDir = (dir, replacementMap) => {
    try {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);

            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                traverseDir(fullPath, replacementMap);
            } else {
                replaceInFile(fullPath, replacementMap);
                logDeprecatedInFile(fullPath, deprecatedReplacements);
            }
        }
    } catch (error) {
        console.error(`Could not read directory ${dir}: ${error.message}`);
    }
};

const replaceInFile = (filePath, replacementMap) => {
    try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        for (const [oldVar, newVar] of Object.entries(replacementMap)) {
            if (content.includes(oldVar)) {
                content = content.replace(new RegExp(oldVar.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), newVar);
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (error) {
        console.error(`Could not process file ${filePath}: ${error.message}`);
    }
};

export default (directory) => {
    traverseDir(directory, replacements);

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
