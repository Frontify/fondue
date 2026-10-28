/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue-components';
import { type ReactNode, useState } from 'react';

export type CopyButtonProps = {
    copy: () => Promise<boolean>;
    failure: string;
    children: ReactNode;
};

/** A copy action that names a failed copy instead of failing silently. */
export const CopyButton = ({ copy, failure, children }: CopyButtonProps) => {
    const [failed, setFailed] = useState(false);

    return (
        <>
            <Button
                emphasis="default"
                onPress={async () => {
                    setFailed(!(await copy()));
                }}
            >
                {children}
            </Button>
            {failed && <p role="status">{failure}</p>}
        </>
    );
};

CopyButton.displayName = 'CopyButton';
