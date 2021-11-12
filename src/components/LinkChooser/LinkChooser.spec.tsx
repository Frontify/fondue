/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { LinkChooser, QUERIES_STORAGE_KEY } from "./LinkChooser";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { SearchResult } from "./types";
import { data } from "./mock/data";
import { templates } from "./mock/templates";

const LINK_CHOOSER_ID = "[data-test-id=link-chooser]";
const SEARCH_WRAPPER_ID = "[data-test-id=link-chooser-search-wrapper]";
const EMPTY_RESULTS_ID = "[data-test-id=link-chooser-empty-results]";
const LOADER_ID = "[data-test-id=link-chooser-loader]";
// const ERROR_ID = "[data-test-id=link-chooser-error]";
const SEARCH_INPUT_ID = "[data-test-id=link-chooser-search-input]";
const PREVIEW_ICON_ID = "[data-test-id=link-chooser-preview-icon]";
const COPY_ICON_ID = "[data-test-id=link-chooser-copy-icon]";
const CLEAR_ICON_ID = "[data-test-id=link-chooser-clear-icon]";
const SELECT_SECTION_ID = "[data-test-id=link-chooser-select-section]";
const RESULTS_LIST_ID = "[data-test-id=link-chooser-results-list]";
const NEW_TAB_ID = "[data-test-id=link-chooser-new-tab]";
const CHECKBOX_LABEL_ID = "[data-test-id=input-label]";
const LINK_CHOOSER_DROPDOWN_ID = "[data-test-id=link-chooser-dropdown]";

const DEFAULT_TIMEOUT = 100;
const CUSTOM_QUERY = "Custom link";

const doesContainSubstring = (source: string, target: string) => source.toLowerCase().includes(target.toLowerCase());

const filterItems = (query: string, results: SearchResult[]): SearchResult[] =>
    results.filter((item) => doesContainSubstring(item.title, query));

const getLinkChooserComponent = (openInNewTab = false) => {
    const getGlobalByQuery = (query: string): Promise<SearchResult[]> => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve(
                    filterItems(query, data).map((item) => ({
                        ...item,
                        size: MenuItemContentSize.Large,
                        selectionIndicator: SelectionIndicatorIcon.None,
                    })),
                );
            }, DEFAULT_TIMEOUT),
        );
    };

    /* const getGuidelinesByQuery = (query: string): Promise<SearchResult[]> => {}; */

    /* const getProjectsByQuery = (query: string): Promise<SearchResult[]> => {}; */

    const getTemplatesByQueryMock = (query: string): Promise<SearchResult[]> => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve(
                    filterItems(query, templates).map((item) => ({
                        ...item,
                        size: MenuItemContentSize.Large,
                        selectionIndicator: SelectionIndicatorIcon.None,
                    })),
                );
            }, DEFAULT_TIMEOUT),
        );
    };

    const onLinkChange = cy.stub().as("onLinkChange");
    const onOpenInNewTabChange = cy.stub().as("onOpenInNewTabChange");
    const copyToClipboard = cy.stub().as("copyToClipboard");
    const openPreview = cy.stub().as("openPreview");

    return (
        <LinkChooser
            getGlobalByQuery={getGlobalByQuery}
            getTemplatesByQuery={getTemplatesByQueryMock}
            copyToClipboard={copyToClipboard}
            openPreview={openPreview}
            onLinkChange={onLinkChange}
            openInNewTab={openInNewTab}
            onOpenInNewTabChange={onOpenInNewTabChange}
        />
    );
};

describe("LinkChooser Component", () => {
    it("renders correctly", () => {
        mount(getLinkChooserComponent());

        cy.get(LINK_CHOOSER_ID).should("be.visible");
    });

    describe("Empty localStorage", () => {
        beforeEach(() => {
            localStorage.removeItem(QUERIES_STORAGE_KEY);
        });

        it("displays children on click", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SELECT_SECTION_ID).should("not.exist");
            cy.get(PREVIEW_ICON_ID).should("not.exist");
            cy.get(COPY_ICON_ID).should("not.exist");
            cy.get(CLEAR_ICON_ID).should("not.exist");
            cy.get(EMPTY_RESULTS_ID).should("exist");
        });

        it("should show loading animation", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(LOADER_ID).should("exist");
            cy.get(RESULTS_LIST_ID).children().should("have.length", filterItems(data[0].title, data).length);
        });

        it("should select first item", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(SEARCH_INPUT_ID).should("have.value", data[0].title);

            cy.get("@onLinkChange").should("be.calledOnce");
        });

        it("should open in new tab", () => {
            mount(getLinkChooserComponent());

            cy.get(`${NEW_TAB_ID} ${CHECKBOX_LABEL_ID}`).click();
            cy.get("@onOpenInNewTabChange").should("be.calledOnce");
        });

        it("should open preview", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(PREVIEW_ICON_ID).click();
            cy.get("@openPreview").should("be.calledOnce");
        });

        it("should copy to clipboard", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(COPY_ICON_ID).click();
            cy.get("@copyToClipboard").should("be.calledOnce");
        });

        it("should clear the search input", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(CLEAR_ICON_ID).click();
            cy.get("@onLinkChange").should("be.called");
            cy.get(SEARCH_INPUT_ID).should("be.empty");
        });

        it("should display a custom link (default view)", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get("@onLinkChange").should("be.called");
            cy.get(SEARCH_INPUT_ID).should("have.value", CUSTOM_QUERY);
        });

        it("should hide dropdown on blur", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(LINK_CHOOSER_DROPDOWN_ID).should("exist");
            cy.get("body").click();
            cy.get(LINK_CHOOSER_DROPDOWN_ID).should("not.exist");
        });
    });
});
