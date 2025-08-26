/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentProps, type ComponentType } from 'react';

import { ThemeProvider } from '../../src/components/ThemeProvider/ThemeProvider';

type withThemeOptions = {
    label?: string;
};

export const withTheme = (
    Story: ComponentType,
    theme: ComponentProps<typeof ThemeProvider>['theme'],
    options?: withThemeOptions,
) => {
    return (
        <ThemeProvider theme={theme}>
            <div style={{ padding: '2rem', backgroundColor: 'var(--color-surface-default)', position: 'relative' }}>
                {options?.label && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem',
                            color: 'var(--text-color)',
                            fontSize: '0.75rem',
                        }}
                    >
                        {options.label}
                    </span>
                )}
                <Story />
            </div>
        </ThemeProvider>
    );
};
