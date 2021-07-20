import ComponentFileBuilderResponse from "./ComponentFileBuilderResponse";
import { toKebabCase } from "./transforms";

export default (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";
import css from "./${componentName}.module.css";

export interface ${componentName}Props {
    foo: string;
}

export default function ${componentName}({ foo }: ${componentName}Props): ReactElement<${componentName}Props> {
    return (
        <div data-test-id="${toKebabCase(componentName)}" className={css.fooBar}>
            {foo}
        </div>
    );
}
`,
    extension: `.tsx`,
});
