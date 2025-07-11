/* (c) Copyright Frontify Ltd., all rights reserved. */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
    type AssembledVariable,
    type BoxShadowValue,
    type Config,
    type FigmaResponse,
    type FigmaVariableCollections,
    type FigmaVariables,
    type FigmaVariableValue,
} from './types';

const fetchFigmaVariables = async (fileKey: Config['figmaFileKey']) => {
    if (!process.env.FIGMA_ACCESS_TOKEN) {
        throw new Error('FIGMA_ACCESS_TOKEN is not set');
    }
    const figmaResponse = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
        headers: {
            'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
        },
    }).then((res) => res.json() as Promise<FigmaResponse>);

    return {
        collections: figmaResponse.meta.variableCollections,
        variables: figmaResponse.meta.variables,
    };
};

const getComputedVariables = (
    { collections, variables }: { collections: FigmaVariableCollections; variables: FigmaVariables },
    config: Config['tokenTypes'],
    excludeTokens: Config['excludeTokens'],
) => {
    const selectedCollections = Object.entries(config).reduce<
        { collection: string; path?: string[]; tokenType: string }[]
    >((acc, [tokenType, selector]) => {
        return [
            ...acc,
            ...selector.map((selector) => ({
                ...selector,
                tokenType,
            })),
        ];
    }, []);

    const getVariableValueRecursive = (
        variableId: string,
        modeId: string,
    ): { name: string | null; value: FigmaVariableValue | null } => {
        const variable = variables[variableId];
        if (variable === undefined) {
            return {
                name: null,
                value: null,
            };
        }

        const modeKeys: string[] = Object.keys(variable.valuesByMode);
        let variableValue: FigmaVariableValue | null;
        if (modeKeys.length > 1) {
            variableValue = variable.valuesByMode[modeId] ?? null;
        } else {
            variableValue = Object.values(variable.valuesByMode)[0] ?? null;
        }

        if (variableValue === null && variable.name.toLowerCase().includes('shadow/mid')) {
            console.log(variable);
        }

        if (
            variableValue &&
            typeof variableValue === 'object' &&
            'type' in variableValue &&
            variableValue.type === 'VARIABLE_ALIAS'
        ) {
            return {
                name: variable.name,
                value: `ref_${getVariableValueRecursive(variableValue.id, modeId).name?.toLowerCase()}`,
            };
        }

        return {
            name: variable.name,
            value: variableValue,
        };
    };

    const modes = Object.values(collections).reduce<Record<string, string>>((acc, collection) => {
        if (collection) {
            for (const { modeId, name } of collection.modes) {
                acc[modeId] = name;
            }
        }
        return acc;
    }, {});

    const assembledVariables = Object.entries(variables).reduce<AssembledVariable[]>((acc, [variableId, variable]) => {
        for (const modeId of Object.keys(variable.valuesByMode)) {
            for (const { collection, path, tokenType } of selectedCollections) {
                if (collection === variable.variableCollectionId) {
                    const tokenPath = path ? variable.name.split('/') : [];

                    if (
                        !variable.deletedButReferenced &&
                        !excludeTokens.some((excludeToken) => variable.name.match(new RegExp(excludeToken, 'gm'))) &&
                        (!path ||
                            (path &&
                                path.every(
                                    (segment, index) => tokenPath[index]?.toLowerCase() === segment.toLowerCase(),
                                )))
                    ) {
                        acc.push({
                            name: variable.name.toLowerCase(),
                            type: variable.resolvedType.toLowerCase(),
                            value: getVariableValueRecursive(variableId, modeId).value,
                            attributes: {
                                collection:
                                    collections[variable.variableCollectionId]?.name.replace(' ', '-').toLowerCase() ||
                                    '',
                                type: tokenType.toLowerCase(),
                                theme: modes[modeId]?.toLowerCase() || '',
                            },
                        });
                    }
                }
            }
        }
        return acc;
    }, []);

    return assembledVariables;
};

type NestedAssembledVariable = {
    [key: string]: NestedAssembledVariable | AssembledVariable;
};

// generate a style directory compatible structure
const formatCollections = (variables: AssembledVariable[]) => {
    const formattedCollections = variables.reduce<NestedAssembledVariable>((acc, variable) => {
        const nameParts = variable.name.split('/');
        let currentLevel = acc;

        currentLevel[variable.attributes.theme] = currentLevel[variable.attributes.theme] || {};
        currentLevel = currentLevel[variable.attributes.theme] as NestedAssembledVariable;

        for (const [index, part] of nameParts.entries()) {
            const sanitizedPart = part.replaceAll(' ', '-');
            if (nameParts[0] === 'shadow' && index >= nameParts.length - 2) {
                if (index === nameParts.length - 2) {
                    currentLevel[sanitizedPart] = currentLevel[sanitizedPart] || {
                        ...variable,
                        value: {},
                        name: nameParts.slice(0, -1).join('/'),
                        type: 'shadow',
                    };
                }
                if (index === nameParts.length - 1) {
                    const previousPart = nameParts[index - 1] as string;
                    (currentLevel[previousPart]?.value as BoxShadowValue)[sanitizedPart] = variable.value as
                        | string
                        | number;
                }
            } else if (index === nameParts.length - 1) {
                currentLevel[sanitizedPart] = variable;
            } else {
                currentLevel[sanitizedPart] = currentLevel[sanitizedPart] || {};
                currentLevel = currentLevel[sanitizedPart] as NestedAssembledVariable;
            }
        }
        return acc;
    }, {});

    return formattedCollections;
};

const sortObject = (obj: NestedAssembledVariable): NestedAssembledVariable => {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        return obj;
    }

    const sortedKeys = Object.keys(obj).sort((a, b) => a.localeCompare(b));
    return sortedKeys.reduce((acc, key) => {
        acc[key] = sortObject(obj[key] as NestedAssembledVariable);
        return acc;
    }, {} as NestedAssembledVariable);
};

export const loadFigmaVariables = (config: Config) => {
    const CWD = path.dirname(fileURLToPath(import.meta.url));

    return fetchFigmaVariables(config.figmaFileKey).then((figmaData) => {
        const computedVariables = getComputedVariables(figmaData, config.tokenTypes, config.excludeTokens);

        const data = formatCollections(computedVariables);
        const filePath = path.resolve(CWD, '../.tmp/tokens/all-tokens.json');
        return fs
            .mkdir(path.dirname(filePath), { recursive: true })
            .then(() => fs.writeFile(filePath, JSON.stringify(sortObject(data), null, 2)))
            .then(() => {
                console.log('Tokens written to .tmp/tokens/all-tokens.json');
            })
            .catch((error) => {
                console.error('Error writing tokens to .tmp/tokens/all-tokens.json', error);
            });
    });
};
