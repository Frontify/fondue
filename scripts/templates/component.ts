import ComponentFileBuilderResponse from "./ComponentFileBuilderResponse";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (componentName: string, componentType: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";

export interface ${componentName}Props {
    foo: string;
}

export default function ${componentName}({ foo }: ${componentName}Props): ReactElement<${componentName}Props> {
    return <div data-test-id="foobar">{foo}</div>;
}
`,
    extension: `.tsx`,
});
