/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useState } from 'react';

import { useFondueTheme } from '#/components/ThemeProvider/ThemeProvider';

export const VariableValue = ({ variableName, className, ...props }: { variableName: string; className?: string }) => {
    const theme = useFondueTheme();
    const [variableValue, setVariableValue] = useState<string | null>(null);
    const ref = useCallback(
        (node: HTMLDivElement | null) => {
            if (node) {
                const themeProvider = node.closest('.fondue-theme-provider') as HTMLElement;
                const value = window.getComputedStyle(themeProvider).getPropertyValue(`--${variableName}`);
                setVariableValue(value);
            }
        },
        [variableName, theme],
    );
    return (
        <span ref={ref} className={className} {...props}>
            {variableValue}
        </span>
    );
};
