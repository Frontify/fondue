/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, useFondueTheme } from '@frontify/fondue-components';
import { useEffect, useRef } from 'react';

import { enUS } from '#/locales/en-US';
import { codecContext, contentClasses } from '#/model/internal';

import styles from '../styles/profileRetry.module.scss';

import { type LoadingShellProps } from './LoadingShell';

/** The loading shell's box after the profile's module failed to load, with a message and Retry over the empty textbox. */
export const ProfileRetryShell = ({
    locale,
    testId,
    contentClassName,
    multiline,
    label,
    labelledBy,
    spellCheck,
    onRetry,
}: LoadingShellProps & {
    /** `focused` is whether the message or Retry held focus, which the editor takes once it mounts. */
    onRetry: (focused: boolean) => void;
}) => {
    const theme = useFondueTheme();
    const lang = locale.lang ?? theme.lang ?? enUS.lang;
    const { t } = codecContext(locale, enUS);
    const messageRef = useRef<HTMLParagraphElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // The busy shell was announced as loading, so focus carries the failure, unless the author was elsewhere.
    useEffect(() => {
        const { activeElement, body } = window.document;
        if (activeElement === null || activeElement === body) {
            messageRef.current?.focus();
        }
    }, []);

    return (
        <div lang={lang} data-test-id={testId} data-rte-shell="profile-retry" className={styles.root}>
            <div
                className={`${contentClasses(contentClassName)} ${styles.surface}`}
                role="textbox"
                aria-multiline={multiline}
                aria-readonly="true"
                aria-label={label}
                aria-labelledby={labelledBy}
                lang={lang}
                dir={theme.dir}
                spellCheck={spellCheck}
                data-test-id={`${testId}-surface`}
                data-rte-surface=""
            />
            <div ref={overlayRef} className={styles.overlay}>
                <p ref={messageRef} tabIndex={-1}>
                    {t('RichTextEditor_profileLoadFailed')}
                </p>
                <Button onPress={() => onRetry(overlayRef.current?.contains(window.document.activeElement) === true)}>
                    {t('RichTextEditor_retry')}
                </Button>
            </div>
        </div>
    );
};

ProfileRetryShell.displayName = 'ProfileRetryShell';
