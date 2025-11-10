/* (c) Copyright Frontify Ltd., all rights reserved. */

import { usePreviewConfig } from '../components/PreviewConfigContext';
import { type Utility } from '../components/Utilities/types';

export const getUtilityClassName = ({ path }: Utility) => {
    return `${path.join('-').replace('-default', '')}`;
};

export const UtilityPreview = ({ properties, path }: Utility) => {
    const { textContent } = usePreviewConfig();

    const style = Object.entries(properties).reduce<Record<string, string>>((acc, [key, value]) => {
        acc[key.replaceAll(/-./g, (match) => match.slice(-1).toUpperCase())] = `var(--${value.name})`;
        return acc;
    }, {});

    if (path.includes('ring')) {
        const rawValues = Object.entries(properties).reduce<Record<string, string>>((acc, [key, value]) => {
            if (value.type === 'rawValue') {
                acc[key] = value.value;
            }
            return acc;
        }, {});
        console.log(rawValues);
        return (
            <div className="tw-text-primary tw-flex tw-items-center tw-justify-center tw-h-full">
                <div className="tw-bg-primary tw-w-4 tw-h-4 tw-rounded-medium" style={rawValues}></div>
            </div>
        );
    }
    return (
        <div style={style} className="tw-text-primary tw-flex tw-items-center tw-justify-center tw-h-full">
            {textContent}
        </div>
    );
};
