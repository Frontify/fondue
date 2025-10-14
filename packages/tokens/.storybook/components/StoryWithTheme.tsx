/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { type ComponentProps, type ComponentType } from 'react';

type WithThemeOptions = {
    label?: string;
    theme: ComponentProps<typeof ThemeProvider>['theme'];
    direction: ComponentProps<typeof ThemeProvider>['dir'];
};

export const withTheme = (Story: ComponentType, options: WithThemeOptions) => {
    return (
        <ThemeProvider theme={options.theme} dir={options.direction}>
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
