/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useData } from 'vike-react/useData';

import { CodeSnippet } from '#/components/EditableComponent/CodeSnippet';
import { MdxContent } from '#/components/MdxContent/MdxContent';
import { getImportStatement } from '#/utils/codeUtil';

import { type Data } from './+data';

export const Page = () => {
    const data = useData<Data>();

    if (!data) {
        return <h1 className="tw-text-2xl tw-font-bold tw-mb-8">Components</h1>;
    }

    return (
        <>
            <div className="tw-p-8 tw-w-full tw-flex tw-justify-center">
                <div className="tw-max-w-[856px] tw-w-full">
                    <h1 className="tw-text-3xl tw-font-bold tw-mb-8">{data.component.title}</h1>
                    <h2 className="tw-text-xl tw-font-semibold tw-mb-4">Import</h2>
                    <CodeSnippet language={'ts'} code={getImportStatement(data.component)} disabled={true} />
                    <MdxContent data={data.component.body.code} />
                </div>
            </div>

            <aside className="tw-p-8 2xl:tw-flex tw-hidden tw-flex-col tw-w-72 tw-shrink-0">
                <span className="tw-text-lg tw-font-bold">Table of content</span>
            </aside>
        </>
    );
};
