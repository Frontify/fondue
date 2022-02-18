/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { Heading } from "./Heading";
import { HeadingProps } from ".";

const classRecord = {
    color: ["warning", "tw-text-text-warning"],
    overflow: ["truncate", "tw-truncate"],
    whitespace: ["pre", "tw-whitespace-pre"],
    display: ["inline-block", "tw-inline-block"],
    wordBreak: ["break-all", "tw-break-all"],
    decoration: ["underline", "tw-underline"],
    size: ["large", "tw-text-heading-large"],
    weight: ["strong", "tw-font-bold"],
};

const headingProps = Object.entries(classRecord).reduce((acc, [key, [value]]) => {
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    acc[key] = value;
    return acc as HeadingProps;
}, {} as HeadingProps);

describe("Heading", () => {
    it("should render headings as span by default", () => {
        mount(<Heading>The fox jumps over the lazy dog</Heading>);

        cy.get("[data-test-id=heading]").should((el) => el.attr("tagName") === "SPAN");
    });

    it("should render headings as h1 if provided", () => {
        mount(<Heading as="h1">The fox jumps over the lazy dog</Heading>);

        cy.get("[data-test-id=heading]").should((el) => el.attr("tagName") === "H1");
    });

    it("should add correct classes to element", () => {
        mount(<Heading {...headingProps}>The fox jumps over the lazy dog</Heading>);

        cy.get("[data-test-id=heading]").should((el) => {
            Object.values(classRecord).forEach((value) => {
                expect(el).to.have.class(value[1]);
            });
        });
    });
});
