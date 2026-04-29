/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentProps, type ComponentType } from 'react';

import { deCH, deDE, enUS, esES, frCH, frFR, itCH, itIT, nlNL, plPL, ptPT, type LocaleIdentifier } from '#/locales';

import { ThemeProvider } from '../../src/components/ThemeProvider/ThemeProvider';

type WithThemeOptions = {
    label?: string;
    theme: ComponentProps<typeof ThemeProvider>['theme'];
    direction: ComponentProps<typeof ThemeProvider>['dir'];
    locale: LocaleIdentifier;
};

export const withTheme = (Story: ComponentType, options: WithThemeOptions) => {
    let locale = enUS;

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
