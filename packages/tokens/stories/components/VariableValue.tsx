/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useState } from 'react';

export const VariableValue = ({
    variableName,
    variableValue: variableValueRaw,
    className,
    ...props
}: {
    variableName: string;
    variableValue: string;
    className?: string;
}) => {
    const [variableValue, setVariableValue] = useState<string | null>(variableValueRaw);
    const ref = useCallback(
        (node: HTMLDivElement | null) => {
            if (node) {
                const themeProvider = node.closest('.fondue-theme-provider') as HTMLElement;
                const value = window.getComputedStyle(themeProvider).getPropertyValue(`--${variableName}`);
                setVariableValue(value || variableValueRaw);
            }
        },
        [variableName, variableValueRaw],
    );
    return (
        <span ref={ref} className={className} {...props}>
            {variableValue}
        </span>
    );
};
