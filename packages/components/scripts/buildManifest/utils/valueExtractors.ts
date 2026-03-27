/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    isIdentifier,
    isNoSubstitutionTemplateLiteral,
    isObjectLiteralExpression,
    isPropertyAssignment,
    isSpreadAssignment,
    isStringLiteral,
    SyntaxKind,
    type Expression,
    type ObjectLiteralExpression,
} from 'typescript';

export const getStringValue = (node: Expression): string | null => {
    if (isStringLiteral(node) || isNoSubstitutionTemplateLiteral(node)) {
        return node.text;
    }
    return null;
};

/** Extract all key/value pairs from an object literal as raw source text */
export const extractArgsFromObject = (
    objectExpression: ObjectLiteralExpression,
    sourceText: string,
): Record<string, string> => {
    const args: Record<string, string> = {};
    for (const property of objectExpression.properties) {
        if (isSpreadAssignment(property)) {
            console.warn(`Spread element in args object was skipped — only literal properties are extracted`);
            continue;
        }
        if (!isPropertyAssignment(property)) {
            continue;
        }
        const key = isIdentifier(property.name) || isStringLiteral(property.name) ? property.name.text : null;
        if (!key) {
            continue;
        }
        args[key] = sourceText.slice(property.initializer.pos, property.initializer.end).trim();
    }
    return args;
};

/** Extract only the `args: { ... }` sub-object from a meta/story object literal */
export const extractMetaArgsOnly = (
    objectExpression: ObjectLiteralExpression,
    sourceText: string,
): Record<string, string> => {
    for (const property of objectExpression.properties) {
        if (
            isPropertyAssignment(property) &&
            isIdentifier(property.name) &&
            property.name.text === 'args' &&
            isObjectLiteralExpression(property.initializer)
        ) {
            return extractArgsFromObject(property.initializer, sourceText);
        }
    }
    return {};
};

export const findProp = (objectExpression: ObjectLiteralExpression, propName: string): Expression | null => {
    for (const property of objectExpression.properties) {
        if (isPropertyAssignment(property) && isIdentifier(property.name) && property.name.text === propName) {
            return property.initializer;
        }
    }
    return null;
};

/** Walk `parameters.status.type` to extract the component status string */
export const extractMetaStatus = (parametersNode: Expression): string => {
    if (!isObjectLiteralExpression(parametersNode)) {
        return '';
    }
    const status = findProp(parametersNode, 'status');
    if (!status || !isObjectLiteralExpression(status)) {
        return '';
    }
    const type = findProp(status, 'type');
    if (!type) {
        return '';
    }
    return getStringValue(type) ?? '';
};

/** Walk `parameters.docs.description.story` to extract a string */
export const extractDescription = (parametersNode: Expression): string => {
    if (!isObjectLiteralExpression(parametersNode)) {
        return '';
    }
    const docs = findProp(parametersNode, 'docs');
    if (!docs || !isObjectLiteralExpression(docs)) {
        return '';
    }
    const descriptionNode = findProp(docs, 'description');
    if (!descriptionNode || !isObjectLiteralExpression(descriptionNode)) {
        return '';
    }
    const story = findProp(descriptionNode, 'story');
    if (!story) {
        return '';
    }
    return getStringValue(story) ?? '';
};

/** Walk `parameters.manifest.canonical` to extract a boolean */
export const extractIsCanonical = (parametersNode: Expression): boolean => {
    if (!isObjectLiteralExpression(parametersNode)) {
        return false;
    }
    const manifest = findProp(parametersNode, 'manifest');
    if (!manifest || !isObjectLiteralExpression(manifest)) {
        return false;
    }
    const canonical = findProp(manifest, 'canonical');
    if (!canonical) {
        return false;
    }
    return canonical.kind === SyntaxKind.TrueKeyword;
};
