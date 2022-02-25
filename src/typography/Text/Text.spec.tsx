/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Text } from "./Text";

const classRecord = {
    color: ["weak", "tw-text-text-weak"],
    overflow: ["ellipsis", "tw-text-ellipsis"],
    whitespace: ["nowrap", "tw-whitespace-nowrap"],
    display: ["block", "tw-block"],
    wordBreak: ["break-all", "tw-break-all"],
    decoration: ["underline", "tw-underline"],
    size: ["small", "tw-text-body-small"],
    weight: ["strong", "tw-font-medium"],
};

const textProps = Object.entries(classRecord).reduce((acc, [key, [value]]) => {
    acc[key] = value;
    return acc;
}, {} as Record<string, string>);

describe("Text", () => {
    it("should render text as span by default", () => {
        mount(<Text>The fox jumps over the lazy dog</Text>);

        cy.get("[data-test-id=text]").should((el) => el.attr("tagName") === "SPAN");
    });

    it("should render text as h1 p provided", () => {
        mount(<Text as="p">The fox jumps over the lazy dog</Text>);

        cy.get("[data-test-id=text]").should((el) => el.attr("tagName") === "P");
    });

    it("should add correct classes to element", () => {
        mount(
            <Text as="p" {...textProps}>
                The fox jumps over the lazy dog
            </Text>,
        );

        cy.get("[data-test-id=text]").should((el) => {
            Object.values(classRecord).forEach((value) => {
                expect(el).to.have.class(value[1]);
            });
        });
    });
});
