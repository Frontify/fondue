/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as fondueComponents from '@frontify/fondue-components';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

type EditableContentProps = {
    code: string;
    language?: string;
};

const LANGUAGES_WITH_PREVIEW = ['tsx', 'ts'];

export const EditableComponent = ({ code, language }: EditableContentProps) => {
    return (
        <LiveProvider code={code} scope={{ ...fondueComponents }} language={language}>
            <div className="tw-border-black-60 tw-border-2 tw-rounded-lg tw-overflow-hidden tw-my-8">
                {language && LANGUAGES_WITH_PREVIEW.includes(language) ? <LivePreview className="tw-p-4" /> : null}
                <LiveError className="tw-p-2 tw-text-red-90 tw-bg-red-40" />
                <LiveEditor />
            </div>
        </LiveProvider>
    );
};
