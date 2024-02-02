/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MdxContent } from './MdxContent';
import { usePageContext } from '../../renderer/usePageContext';

export { Page };

function Page() {
    const { data } = usePageContext();

    if (!data) {
        return null;
    }

    console.log('CODE');

    console.log(data.component.body);

    return (
        <>
            <h1>{data.component.title}</h1>
            <MdxContent data={data.component.body.code} />
        </>
    );
}
