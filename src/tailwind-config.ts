import deepmerge from "deepmerge";
// eslint-disable-next-line
// @ts-ignore
import arcadeConfig from "../tailwind.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrayMergeFn = (destinationArray: any[], sourceArray: any[]) => {
    return destinationArray.concat(sourceArray).reduce((acc, cur) => {
        if (acc.includes(cur)) {
            return acc;
        }
        return [...acc, cur];
    }, []);
};

/**
 * Merge arcade configuration with external Tailwind CSS configuration
 * @param {object} tailwindConfig - external Tailwind config object
 * @return {object} merged config object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const tailwindConfig = (tailwindConfig: any) => {
    let config;
    if (Array.isArray(tailwindConfig.content)) {
        config = {
            content: tailwindConfig.content,
        };
    } else {
        config = tailwindConfig.content;
    }
    return deepmerge({ ...tailwindConfig, config }, arcadeConfig, { arrayMerge: arrayMergeFn });
};
