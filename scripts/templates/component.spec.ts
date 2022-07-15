import ComponentFileBuilderResponse from './ComponentFileBuilderResponse';
import { toKebabCase } from './transforms';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (componentName: string, componentType: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "cypress/react";
import { ${componentName} } from "./${componentName}";

const ${componentName}_FOO = "bar";

describe("${componentName} Component", () => {
    it("should render foo text correctly", () => {
        mount(<${componentName} foo={${componentName}_FOO} />);

        cy.get("[data-test-id=${toKebabCase(componentName)}]").as("${componentName}");

        cy.get("@${componentName}").contains(${componentName}_FOO);
    });
});
`,
    extension: `.spec.tsx`,
});
