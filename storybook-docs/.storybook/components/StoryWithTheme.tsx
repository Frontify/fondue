/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flex, type LocaleConfig, type LocaleIdentifier, ThemeProvider } from '@frontify/fondue-components';
import { deCH, deDE, enUS, esES, frCH, frFR, itCH, itIT, nlNL, plPL, ptPT } from '@frontify/fondue-components/locales';
import { type StoryContext } from '@storybook/react-vite';
import { type ComponentProps, type ComponentType } from 'react';

type WithThemeOptions = {
    label?: string;
    theme: NonNullable<ComponentProps<typeof ThemeProvider>['theme']>;
    direction: NonNullable<ComponentProps<typeof ThemeProvider>['dir']>;
    locale: LocaleIdentifier;
};

export const withTheme = (Story: ComponentType, options: WithThemeOptions) => {
    let locale: LocaleConfig = enUS;

    switch (options.locale) {
        case 'de-DE':
            locale = deDE;
            break;
        case 'de-CH':
            locale = deCH;
            break;
        case 'fr-FR':
            locale = frFR;
            break;
        case 'fr-CH':
            locale = frCH;
            break;
        case 'it-IT':
            locale = itIT;
            break;
        case 'it-CH':
            locale = itCH;
            break;
        case 'es-ES':
            locale = esES;
            break;
        case 'pt-PT':
            locale = ptPT;
            break;
        case 'nl-NL':
            locale = nlNL;
            break;
        case 'pl-PL':
            locale = plPL;
            break;
    }

    return (
        <ThemeProvider theme={options.theme} dir={options.direction} locale={locale}>
            <div style={{ padding: '2rem', backgroundColor: 'var(--color-surface-default)', position: 'relative' }}>
                {options?.label && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem',
                            color: 'var(--color-primary-default)',
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

type Globals = {
    direction?: 'ltr' | 'rtl';
    theme?: 'light' | 'dark' | 'both';
    locale?: LocaleIdentifier;
};

export const ThemeProviderWrapper = (Story: ComponentType, { globals }: Pick<StoryContext, 'globals'>) => {
    const { direction = 'ltr', theme = 'light', locale = 'en-US' } = globals as Globals;

    if (theme === 'both') {
        return (
            <Flex direction="column">
                {withTheme(Story, { label: 'Light theme', theme: 'light', direction, locale })}
                {withTheme(Story, { label: 'Dark theme', theme: 'dark', direction, locale })}
            </Flex>
        );
    }

    return withTheme(Story, { theme, direction, locale });
};
