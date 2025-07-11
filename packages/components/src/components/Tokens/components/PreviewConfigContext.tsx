/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, useMemo } from 'react';

const PreviewConfigContext = createContext<{
    tailwindPrefix: string;
    textContent: string;
}>({
    tailwindPrefix: 'tw-',
    textContent: '',
});

type PreviewConfigWrapperProps = {
    children: React.ReactNode;
    textContent: string;
    removeTailwindPrefix: boolean;
};

export const PreviewConfigWrapper = ({ children, textContent, removeTailwindPrefix }: PreviewConfigWrapperProps) => {
    const tailwindPrefix = useMemo(() => (removeTailwindPrefix ? '' : 'tw-'), [removeTailwindPrefix]);
    return (
        <PreviewConfigContext.Provider value={{ tailwindPrefix, textContent }}>
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">{children}</div>
        </PreviewConfigContext.Provider>
    );
};

export const usePreviewConfig = () => {
    return useContext(PreviewConfigContext);
};
