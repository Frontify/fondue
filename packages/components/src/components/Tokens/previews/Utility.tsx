/* (c) Copyright Frontify Ltd., all rights reserved. */

import { usePreviewConfig } from '../components/PreviewConfigContext';
import { type Utility } from '../components/Utilities/types';

export const getUtilityClassName = ({ path }: Utility) => {
    return `${path.join('-').replace('-default', '')}`;
};

export const UtilityPreview = ({ properties }: Utility) => {
    const { textContent } = usePreviewConfig();

    const style = Object.entries(properties).reduce(
        (acc, [key, value]) => {
            acc[key.replaceAll(/-./g, (match) => match.slice(-1).toUpperCase())] = `var(--${value.name})`;
            return acc;
        },
        {} as Record<string, string>,
    );
    return (
        <div style={style} className="tw-text-surface-on-surface tw-flex tw-items-center tw-justify-center tw-h-full">
            {textContent}
        </div>
    );
};
