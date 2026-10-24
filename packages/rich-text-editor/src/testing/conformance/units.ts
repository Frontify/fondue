/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPlugin } from '#/bridge/plugin';
import { pluginIds, pluginsById } from '#/features/plugins';
import { type Feature } from '#/model';

export type ContractUnit = ReturnType<typeof pluginsById>[number];

/** One unit per feature under test: its given editor part, else its shipped one, else none. */
export const contractUnits = (
    features: readonly Feature[],
    given: readonly EditorPlugin[],
): readonly ContractUnit[] => {
    const shippedUnits = pluginsById(pluginIds);
    return features.map((feature) => {
        const own = [...given].reverse().find((plugin) => plugin.feature === feature.id);
        const shipped = shippedUnits.find((unit) => unit.id === feature.id);
        if (shipped === undefined) {
            return { id: feature.id, feature, editor: own ?? { feature: feature.id } };
        }
        return { ...shipped, feature, editor: own ?? shipped.editor };
    });
};
