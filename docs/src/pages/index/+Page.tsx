/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tag } from 'components';
import { allComponents } from 'components/content';
export { Page };

function Page() {
    return (
        <>
            <h1>Welcome</h1>
            This page is:
            <ul>
                <li>Rendered to HTML.</li>
                <li>Interactive.</li>
            </ul>
            <ul>
                {allComponents.map((component) => {
                    return (
                        <li key={component._id}>
                            <a href={`component/${component.url}`}>{component.title}</a>
                        </li>
                    );
                })}
            </ul>
            <Tag />
        </>
    );
}
