import ComponentFileBuilderResponse from "./ComponentFileBuilderResponse";

export default (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import css from "./${componentName}.module.css";

export interface ${componentName}Props {
    foo: string;
}

export default function ${componentName}({ foo }: ${componentName}Props): ReactElement<${componentName}Props> {
    return (
        <div data-test-id="Foo" className={css.fooBar}>
            {foo}
        </div>
    );
}
`,
    extension: `.tsx`,
});
