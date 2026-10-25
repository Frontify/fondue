/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';

import { enUS } from '#/locales/en-US';
import { type RichTextLocale } from '#/model';
import { contentClasses } from '#/model/internal';

/** What the loading shell names: the host's accessible name and test id, and the profile's line mode. */
export type LoadingShellProps = {
    readonly locale: RichTextLocale;
    readonly testId: string;
    readonly contentClassName: string | undefined;
    readonly multiline: boolean;
    readonly label: string | undefined;
    readonly labelledBy: string | undefined;
    readonly spellCheck: boolean;
};

/** The markup the server renders before hydration, shown while a profile's module loads, so the page and a screen reader find the textbox. */
export const LoadingShell = ({
    locale,
    testId,
    contentClassName,
    multiline,
    label,
    labelledBy,
    spellCheck,
}: LoadingShellProps) => {
    const theme = useFondueTheme();
    const lang = locale.lang ?? theme.lang ?? enUS.lang;
    return (
        <div lang={lang} data-test-id={testId} aria-busy="true">
            <div
                className={contentClasses(contentClassName)}
                role="textbox"
                aria-multiline={multiline}
                aria-label={label}
                aria-labelledby={labelledBy}
                lang={lang}
                dir={theme.dir}
                spellCheck={spellCheck}
                data-test-id={`${testId}-surface`}
                data-rte-surface=""
            />
        </div>
    );
};
