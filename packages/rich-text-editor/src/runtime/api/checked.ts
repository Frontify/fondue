/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AttributeDeclaration, checkHref, type ContentModel, type JsonObject, hrefPolicyOf } from '#/model';
import { attributesOf, compiledModel, isValidValue } from '#/model/internal';

/** The URL policy of the feature that installs a node or mark. */
export const policyOf = (model: ContentModel, featureId: string) => {
    const options = compiledModel(model).features.find(({ id }) => id === featureId)?.options;

    return options === undefined ? undefined : hrefPolicyOf(options);
};

/** Whether `value` holds a string longer than `max`, as decode counts `maxAttributeLength`. */
const tooLong = (value: unknown, max: number): boolean => {
    if (typeof value === 'string') {
        return value.length > max;
    }

    return Array.isArray(value) && value.some((item) => tooLong(item, max));
};

/** The URL policy's verdict on `value` of `declaration` in `featureId`, or `undefined` when it is no URL. */
const checkedUrl = (
    model: ContentModel,
    featureId: string,
    declaration: AttributeDeclaration,
    value: unknown,
): ReturnType<typeof checkHref> | undefined => {
    if (declaration.type !== 'url' || typeof value !== 'string') {
        return undefined;
    }

    return checkHref(value, policyOf(model, featureId));
};

/** Whether a `url` value of `attrs` fails the policy of `featureId`. */
export const urlRefused = (
    model: ContentModel,
    featureId: string,
    declared: Readonly<Record<string, AttributeDeclaration>>,
    attrs: Readonly<Record<string, unknown>>,
): boolean =>
    Object.entries(declared).some(
        ([name, declaration]) => checkedUrl(model, featureId, declaration, attrs[name])?.ok === false,
    );

type AttributeOwner = {
    readonly attrs: Readonly<Record<string, AttributeDeclaration>>;
    readonly exactlyOne: readonly string[] | undefined;
    readonly featureId: string;
};

/**
 * `attrs` as decode checks them on every one of `types`: each declared and valid there, no string but an `href` longer than
 * `maxLength`, every `url` value in the form `checkHref` stores after its feature's policy, and `exactlyOne` held. With
 * `whole`, they are the attributes of a new mark or node, so each attribute without a default must be among them.
 * `undefined` when one is not.
 */
export const checkedAttrs = (
    model: ContentModel,
    types: readonly string[],
    attrs: JsonObject,
    maxLength: number,
    whole: boolean,
): JsonObject | undefined => {
    const { marks, nodes } = compiledModel(model);
    const owners = types.flatMap((name): AttributeOwner[] => {
        const mark = marks.find((candidate) => candidate.name === name);
        if (mark !== undefined) {
            const { declaration } = mark;

            return [
                {
                    attrs: declaration.attrs,
                    exactlyOne: declaration.exactlyOne,
                    featureId: mark.featureId,
                },
            ];
        }

        const node = nodes.find((candidate) => candidate.name === name);
        if (node === undefined) {
            return [];
        }

        return [
            {
                attrs: attributesOf(node),
                exactlyOne: node.declaration.exactlyOne,
                featureId: node.featureId,
            },
        ];
    });
    if (owners.length === 0 || Object.hasOwn(attrs, 'nodeId')) {
        return undefined;
    }

    const checked: Record<string, unknown> = {};
    for (const owner of owners) {
        const values: Record<string, unknown> = {};
        for (const [name, value] of Object.entries(attrs)) {
            const declaration = owner.attrs[name];
            // A type that does not declare an attribute skips it; `checked` below refuses one that none declares.
            if (declaration === undefined) {
                continue;
            }

            // Decode exempts `href` from the length limit: the URL check bounds it.
            if (!isValidValue(declaration, value) || (name !== 'href' && tooLong(value, maxLength))) {
                return undefined;
            }

            values[name] = value;
            const url = checkedUrl(model, owner.featureId, declaration, value);
            if (url !== undefined) {
                if (!url.ok) {
                    return undefined;
                }

                values[name] = url.href;
            }

            checked[name] = values[name];
        }

        for (const [name, declaration] of Object.entries(owner.attrs)) {
            // The runtime gives a new node its `nodeId` before a commit publishes it.
            if (!whole || name === 'nodeId' || Object.hasOwn(values, name)) {
                continue;
            }

            if (!('default' in declaration)) {
                return undefined;
            }

            values[name] = declaration.default;
        }

        const group = owner.exactlyOne ?? [];
        const set = group.filter((name) => values[name] !== null && values[name] !== undefined);
        if (group.some((name) => Object.hasOwn(values, name)) && set.length !== 1) {
            return undefined;
        }
    }

    if (Object.keys(attrs).some((name) => !Object.hasOwn(checked, name))) {
        return undefined;
    }

    return checked as JsonObject;
};
