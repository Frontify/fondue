/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ComponentFileBuilderResponse } from '../types';
import { toKebabCase } from '../transforms';

export const setup = (componentName: string): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { ${componentName} } from "./${componentName}";

const ${componentName}_FOO = "bar";

describe("${componentName} Component", () => {
    it("should render foo text correctly", () => {
        cy.mount(<${componentName} foo={${componentName}_FOO} />);

        cy.get("[data-test-id=${toKebabCase(componentName)}]").as("${componentName}");

        cy.get("@${componentName}").contains(${componentName}_FOO);
    });
});
`,
    extension: '.cy.tsx',
});
