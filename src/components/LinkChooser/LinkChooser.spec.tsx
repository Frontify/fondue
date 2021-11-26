/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { mount } from "@cypress/react";
import { LinkChooser, QUERIES_STORAGE_KEY } from "./LinkChooser";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { SearchResult } from "./types";
import { data } from "./mock/data";
import { templates } from "./mock/templates";
import { doesContainSubstring } from "./utils/helpers";

const LINK_CHOOSER_ID = "[data-test-id=link-chooser]";
const SEARCH_WRAPPER_ID = "[data-test-id=link-chooser-search-wrapper]";
const EMPTY_RESULTS_ID = "[data-test-id=link-chooser-empty-results]";
const LOADER_ID = "[data-test-id=link-chooser-loader]";
const ERROR_ID = "[data-test-id=link-chooser-error]";
const SEARCH_INPUT_ID = "[data-test-id=link-chooser-search-input]";
const PREVIEW_ICON_ID = "[data-test-id=link-chooser-preview-icon]";
const COPY_ICON_ID = "[data-test-id=link-chooser-copy-icon]";
const CLEAR_ICON_ID = "[data-test-id=link-chooser-clear-icon]";
const SELECT_SECTION_ID = "[data-test-id=link-chooser-select-section]";
const RESULTS_LIST_ID = "[data-test-id=link-chooser-results-list]";
const ACTION_MENU_ID = "[data-test-id=link-chooser-action-menu]";
const BACK_BUTTON_ID = "[data-test-id=link-chooser-back-button]";
const NEW_TAB_ID = "[data-test-id=link-chooser-new-tab]";
const CHECKBOX_LABEL_ID = "[data-test-id=input-label]";
const DROPDOWN_WRAPPER_ID = "[data-test-id=link-chooser-dropdown]";
const DECORATOR_ICON_ID = "[data-test-id=link-chooser-decorator-icon]";

const DEFAULT_TIMEOUT = 100;
const CUSTOM_QUERY = "Custom link";

const PREFILLED_LOCAL_STORAGE = [
    {
        id: "custom-link",
        title: "www.frontify.com",
        link: "www.frontify.com",
        icon: "LINK",
        size: "Large",
        selectionIndicator: "None",
    },
    {
        id: "10",
        title: "Malaya Poster",
        subtitle: "UNICEF Social Campaign",
        link: "",
        icon: "TEMPLATE",
        size: "Large",
        selectionIndicator: "None",
    },
    {
        id: "4",
        title: '"www.website.com"',
        link: "https://www.frontify.com/en/digital-and-print-templates/",
        icon: "EXTERNAL",
        size: "Large",
        selectionIndicator: "None",
    },
    {
        id: "11",
        preview:
            "https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcL2MyXC8xMlwvYTFkYzA0YTJkYmQwZTkxMTRlOGM2ODQzMWVmMjU5OTMtMTYzNDMwMTQ1MS5qcGcifQ:msiric:MLRtZYQCaEyWpPqgpGbA6P20PDgvagyoowNOllXgoCk?width=2400&height={height}",
        title: "Brand Business Card",
        subtitle: "Corporate Library",
        link: "#",
        icon: "TEMPLATE",
        size: "Large",
        selectionIndicator: "None",
    },
    {
        id: "1",
        title: "Brand listening - A Memoir",
        subtitle: "Guideline XYZ",
        link: "https://www.frontify.com",
        icon: "DOCUMENT",
        size: "Large",
        selectionIndicator: "None",
    },
];

const filterItems = (query: string, results: SearchResult[]): SearchResult[] =>
    results.filter((item) => doesContainSubstring(item.title, query));

const getLinkChooserComponent = (openInNewTab = false, returnError = false) => {
    const getGlobalByQuery = (query: string): Promise<SearchResult[]> => {
        return new Promise((resolve, reject) =>
            setTimeout(() => {
                returnError
                    ? reject()
                    : resolve(
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
        return new Promise((resolve, reject) =>
            setTimeout(() => {
                returnError
                    ? reject()
                    : resolve(
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
    const clipboardOptions = { writeText: cy.stub().as("clipboardOptions") };
    const openPreview = cy.stub().as("openPreview");

    return (
        <LinkChooser
            getGlobalByQuery={getGlobalByQuery}
            getTemplatesByQuery={getTemplatesByQueryMock}
            clipboardOptions={clipboardOptions}
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

        it("displays empty results on click", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SELECT_SECTION_ID).should("not.exist");
            cy.get(PREVIEW_ICON_ID).should("not.exist");
            cy.get(COPY_ICON_ID).should("not.exist");
            cy.get(CLEAR_ICON_ID).should("not.exist");
            cy.get(EMPTY_RESULTS_ID).should("exist");
        });

        it("shows loading animation and loads results", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(LOADER_ID).should("exist");
            cy.get(SELECT_SECTION_ID)
                .children()
                .should("have.length", filterItems(data[0].title, data).length + 1);
        });

        it("selects first item", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(SEARCH_INPUT_ID).should("have.value", data[0].title);

            cy.get("@onLinkChange").should("be.calledOnce");
        });

        it("opens in new tab", () => {
            mount(getLinkChooserComponent());

            cy.get(`${NEW_TAB_ID} ${CHECKBOX_LABEL_ID}`).click();
            cy.get("@onOpenInNewTabChange").should("be.calledOnce");
        });

        it("opens preview", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(PREVIEW_ICON_ID).click();
            cy.get("@openPreview").should("be.calledOnce");
        });

        it("copies to clipboard", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(COPY_ICON_ID).click();
            cy.get("@clipboardOptions").should("be.calledOnce");
        });

        it("clears the search input", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(CLEAR_ICON_ID).click();
            cy.get("@onLinkChange").should("be.called");
            cy.get(SEARCH_INPUT_ID).should("be.empty");
        });

        it("displays a custom link", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get("@onLinkChange").should("be.called");
            cy.get(SEARCH_INPUT_ID).should("have.value", CUSTOM_QUERY);
        });

        it("hides dropdown on blur", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(DROPDOWN_WRAPPER_ID).should("exist");
            cy.get("body").click();
            cy.get(DROPDOWN_WRAPPER_ID).should("not.exist");
        });

        it("adds selected item to local storage", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(CLEAR_ICON_ID).click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SELECT_SECTION_ID).children().should("have.length", 1);
        });

        it("interrupts the fetching phase and selects the query as custom link", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get("body").click();
            cy.get(SEARCH_INPUT_ID).should("have.value", CUSTOM_QUERY);
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li > div`)
                .eq(0)
                .should(($container) => {
                    expect($container).to.have.css("font-weight", "500");
                });
        });

        it("resumes fetching when dropdown opens if the fetching phase was previously interrupted", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get("body").click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(LOADER_ID).should("exist");
            cy.get(SELECT_SECTION_ID)
                .children()
                .should("have.length", filterItems(data[0].title, data).length + 1);
        });

        it("does not resume fetching when dropdown opens if the fetching phase was previously resolved", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get("body").click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(LOADER_ID).should("not.exist");
        });

        it("selects existing document and reselects it on interrupt if the titles match", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).clear();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get("body").click();
            cy.get(SEARCH_INPUT_ID).should("have.value", data[0].title);
            cy.get(`${DECORATOR_ICON_ID} > svg`).invoke("attr", "name").should("eq", "IconDocument");
        });

        it("selects existing document and does not reselect it on interrupt if the titles do not match", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).clear();
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get("body").click();
            cy.get(SEARCH_INPUT_ID).should("have.value", CUSTOM_QUERY);
            cy.get(`${DECORATOR_ICON_ID} > svg`).invoke("attr", "name").should("eq", "IconLink");
        });

        it("displays error message when fetching fails", () => {
            mount(getLinkChooserComponent(false, true));

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(SELECT_SECTION_ID).should("not.exist");
            cy.get(ERROR_ID).should("exist");
        });
    });

    describe("Filled localStorage", () => {
        beforeEach(() => {
            localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(PREFILLED_LOCAL_STORAGE));
        });

        it("displays recent queries on click", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(PREVIEW_ICON_ID).should("not.exist");
            cy.get(COPY_ICON_ID).should("not.exist");
            cy.get(CLEAR_ICON_ID).should("not.exist");
            cy.get(EMPTY_RESULTS_ID).should("not.exist");
            cy.get(SELECT_SECTION_ID)
                .children()
                .should("have.length", JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || "null").length);
        });

        it("replaces first item with the most recent selection", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").should(
                "contain",
                JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || "null")[0].title,
            );
            cy.get(`${SELECT_SECTION_ID} > li`).eq(3).as("thirdSelectItem");
            cy.get("@thirdSelectItem").click();
            cy.get(CLEAR_ICON_ID).click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("newFirstSelectItem");
            cy.get("@newFirstSelectItem").should(
                "contain",
                JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || "null")[3].title,
            );
        });

        it("replaces local storage results with search results on search input change", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(LOADER_ID).should("exist");
            cy.get(SELECT_SECTION_ID)
                .children()
                .should("have.length", filterItems(data[0].title, data).length + 1);
        });
    });

    describe("Templates section", () => {
        it("displays all templates when query is empty", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(BACK_BUTTON_ID).should("not.exist");
            cy.wait(500);
            cy.get(ACTION_MENU_ID).contains("Templates").click({ waitForAnimations: true });
            cy.get(BACK_BUTTON_ID).should("exist");
            cy.get(SELECT_SECTION_ID).children().should("have.length", templates.length);
        });

        it("shows loading animation and loads results", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.wait(500);
            cy.get(ACTION_MENU_ID).contains("Templates").click({ waitForAnimations: true });
            cy.get(SEARCH_INPUT_ID).type(templates[0].title);
            cy.get(LOADER_ID).should("exist");
            cy.get(RESULTS_LIST_ID).children().should("have.length", filterItems(templates[0].title, data).length);
        });

        it("searches the same query when switching from default view to templates view", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(templates[0].title);
            cy.wait(500);
            cy.get(ACTION_MENU_ID).contains("Templates").click({ waitForAnimations: true });
            cy.get(LOADER_ID).should("exist");
            cy.get(RESULTS_LIST_ID).children().should("have.length", filterItems(templates[0].title, data).length);
        });

        it("searches the same query when switching from templates view to default view", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.wait(500);
            cy.get(ACTION_MENU_ID).contains("Templates").click({ waitForAnimations: true });
            cy.get(LOADER_ID).should("exist");
            cy.get(SEARCH_INPUT_ID).type(templates[0].title);
            cy.get(BACK_BUTTON_ID).click();
            cy.get(LOADER_ID).should("exist");
            cy.get(RESULTS_LIST_ID).children().should("have.length", filterItems(templates[0].title, data).length);
        });

        it("selects first item", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.wait(500);
            cy.get(ACTION_MENU_ID).contains("Templates").click({ waitForAnimations: true });
            cy.get(SEARCH_INPUT_ID).type(templates[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as("firstSelectItem");
            cy.get("@firstSelectItem").click();
            cy.get(SEARCH_INPUT_ID).should("have.value", templates[0].title);

            cy.get("@onLinkChange").should("be.calledOnce");
        });

        it("does not display a custom link", () => {
            mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.wait(500);
            cy.get(ACTION_MENU_ID).contains("Templates").click({ waitForAnimations: true });
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get(EMPTY_RESULTS_ID).should("exist");
        });
    });

    // TODO - test that the proper item is selected when the fetching phase is interrupted (to be decided)
});
