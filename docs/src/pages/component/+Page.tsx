/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MdxContent } from '../../components/MdxContent';
import { usePageContext } from 'vike-react/usePageContext';

export { Page };

function Page() {
    const { data } = usePageContext();

    if (!data) {
        return null;
    }

    return (
        <>
            <h1 className="tw-text-3xl tw-font-bold tw-mb-8">{data.component.title}</h1>
            <MdxContent data={data.component.body.code} />
        </>
    );
}
