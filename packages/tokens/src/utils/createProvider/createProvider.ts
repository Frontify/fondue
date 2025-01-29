/* (c) Copyright Frontify Ltd., all rights reserved. */

import { create } from 'node:domain';
import { mkdir, mkdirSync, readdirSync, readFileSync, write, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { createCssModule } from './createCssModule';

/* (c) Copyright Frontify Ltd., all rights reserved. */
const OUTPUT_DIRECTORY = join(import.meta.dirname, '../../../tmp/providers');


export const createProvider = () => {
    createCssModule();

    const providerTemplate = `/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react'
import styles from "./themes.module.css"

export const ThemeProvider = ({ children, theme = "default" }: {
    children: React.ReactNode
    theme: keyof typeof styles
}) => {
    return <div className={styles[theme]}>{children}</div>
}
`
    mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
    writeFileSync(join(OUTPUT_DIRECTORY, 'ThemeProvider.tsx'), providerTemplate, {
        encoding: 'utf8',
    });
};


