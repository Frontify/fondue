/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tag } from 'components';
import { allComponents } from 'components/content';
export { Page };

function Page() {
    return (
        <>
            <h1 className="tw-font-bold">Welcome</h1>

            <h2>All Components:</h2>

            <ul>
                {allComponents.map((component) => {
                    return (
                        <li className="tw-list-disc" key={component._id}>
                            <a href={`component/${component.url}`}>{component.title}</a>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
