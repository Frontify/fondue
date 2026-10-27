/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { enUS } from '#/locales/en-US';
import { ProfileRetryShell } from '#/react/RichTextEditor/components/ProfileRetryShell';

/** The retry shell as the editor renders it for a failed Inline profile, counting each retry and whether it held focus. */
export const ProfileRetryProbe = () => {
    const [retries, setRetries] = useState<boolean[]>([]);

    return (
        <>
            <ProfileRetryShell
                locale={enUS}
                testId="fondue-rich-text-editor"
                contentClassName={undefined}
                multiline={false}
                label="Message"
                labelledBy={undefined}
                spellCheck
                onRetry={(focused) => {
                    setRetries((previous) => [...previous, focused]);
                }}
            />
            <output data-test-id="retries">{retries.join(',')}</output>
        </>
    );
};
