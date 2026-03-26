/* (c) Copyright Frontify Ltd., all rights reserved. */

import path from 'node:path';

import { globSync } from 'glob';
import {
    type ComponentDoc,
    type FileParser,
    type PropItemType,
    type Props,
    withCompilerOptions,
} from 'react-docgen-typescript';
import ts from 'typescript';

import { type PropInfo, type SubComponent } from './types';
import { resolveFromRoot } from './utils';
import { getForwardRefInnerName, scanDisplayNames, type ScanResult } from './utils/astDisplayNames';
import { collectTypeDefinitions } from './utils/collectTypeDefinitions';

let _parser: FileParser | null = null;

const parseTsConfig = (): ts.CompilerOptions => {
    const configPath = resolveFromRoot('tsconfig.json');
    const host: ts.ParseConfigFileHost = {
        ...ts.sys,
        onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
            throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
        },
    };
    const parsed = ts.getParsedCommandLineOfConfigFile(configPath, {}, host);
    if (!parsed) {
        throw new Error(`Failed to parse ${configPath}`);
    }
    return parsed.options;
};

const getParser = (): FileParser => {
    if (!_parser) {
        const compilerOptions = parseTsConfig();
        _parser = withCompilerOptions(
            {
                ...compilerOptions,
                baseUrl: resolveFromRoot(),
                strict: false,
            },
            {
                savePropValueAsString: true,
                shouldExtractLiteralValuesFromEnum: true,
                shouldIncludePropTagMap: true,
                propFilter: (prop) => {
                    if (prop.name === 'className') {
                        return false;
                    }
                    if (prop.declarations && prop.declarations.length > 0) {
                        return prop.declarations.some((declaration) => !declaration.fileName.includes('node_modules'));
                    }
                    return true;
                },
            },
        );
    }
    return _parser;
};

const getTypeString = (type: PropItemType): string => {
    if (type.name === 'enum' && Array.isArray(type.value)) {
        return (type.value as Array<{ value: string }>).map((enumValue) => enumValue.value).join(' | ');
    }
    return type.name;
};

const getPropsFromDoc = (propsRecord: Props): PropInfo[] => {
    return Object.values(propsRecord).map((prop) => {
        const deprecatedTag = (prop.tags as Record<string, string> | undefined)?.deprecated;
        return {
            name: prop.name,
            type: getTypeString(prop.type),
            required: prop.required,
            defaultValue: (prop.defaultValue as { value: string })?.value ?? null,
            description: prop.description,
            deprecated: deprecatedTag !== undefined,
            deprecationMessage: deprecatedTag ?? '',
        };
    });
};

const resolveDisplayNames = (docs: ComponentDoc[], scanResult?: ScanResult): void => {
    if (scanResult === undefined) {
        return;
    }
    for (const doc of docs) {
        let resolvedName = scanResult.displayNameMap.get(doc.displayName);

        // If reported displayName is not in the map, try looking through the forwardRef inner component
        if (!resolvedName) {
            const innerName = getForwardRefInnerName(scanResult.sourceFile, doc.displayName);
            if (innerName) {
                resolvedName = scanResult.displayNameMap.get(innerName);
            }
        }

        if (resolvedName) {
            doc.displayName = resolvedName;
        }
    }
};

const parseFiles = (files: string[]): ComponentDoc[] => {
    const parser = getParser();
    const scanResults = new Map(files.map((file) => [file, scanDisplayNames(file)]));
    const allDocs: ComponentDoc[] = [];

    for (const file of files) {
        try {
            const docs = parser.parse(file);
            resolveDisplayNames(docs, scanResults.get(file));
            allDocs.push(...docs);
        } catch (error) {
            console.warn(`Failed to parse ${path.relative(resolveFromRoot(), file)}: ${(error as Error).message}`);
        }
    }

    return allDocs;
};

type ExtractPropsResult = {
    mainProps: PropInfo[];
    subComponents: SubComponent[];
    typeDefinitions: Record<string, string>;
};

export const extractProps = (componentName: string, dirPath: string): ExtractPropsResult => {
    const tsxFiles = globSync('**/*.{ts,tsx}', { cwd: dirPath, absolute: true }).filter(
        (fileName) =>
            !fileName.includes('.stories.') &&
            !fileName.includes('.ct.') &&
            !fileName.includes('.spec.') &&
            !fileName.includes('/__tests__/'),
    );

    if (tsxFiles.length === 0) {
        console.warn(`No .tsx files found in ${dirPath}`);
        return { mainProps: [], subComponents: [], typeDefinitions: {} };
    }

    const allDocs = parseFiles(tsxFiles);

    const mainProps: PropInfo[] = [];
    const subComponentMap = new Map<string, PropInfo[]>();
    let firstNonSubProps: PropInfo[] | null = null;

    for (const doc of allDocs) {
        const props = getPropsFromDoc(doc.props);
        if (doc.displayName.includes('.')) {
            subComponentMap.set(doc.displayName, props);
        } else if (doc.displayName === componentName) {
            mainProps.push(...props);
        } else {
            firstNonSubProps ??= props;
        }
    }

    const subComponents: SubComponent[] = Array.from(subComponentMap.entries()).map(([name, props]) => ({
        name,
        props,
    }));

    const allProps = [...mainProps, ...subComponents.flatMap((subComponent) => subComponent.props)];
    const typeDefinitions = collectTypeDefinitions(allProps);

    return { mainProps, subComponents, typeDefinitions };
};
