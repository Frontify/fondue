/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemContentSize, SelectionIndicatorIcon } from '@components/MenuItem';
import { Validation, validationClassMap } from '@utilities/validation';
import React from 'react';
import { LinkChooser, QUERIES_STORAGE_KEY } from './LinkChooser';
import { data } from './mock/data';
import { GUIDELINE_ITEMS, guidelineSection } from './mock/guidelines';
import { TEMPLATE_ITEMS, templateSection } from './mock/templates';
import { LinkChooserProps, SearchResult } from './types';
import { filterItems } from './utils/helpers';

const LINK_CHOOSER_ID = '[data-test-id=link-chooser]';
const SEARCH_WRAPPER_ID = '[data-test-id=link-chooser-search-wrapper]';
const EMPTY_RESULTS_ID = '[data-test-id=link-chooser-empty-results]';
const LOADER_ID = '[data-test-id=link-chooser-loader]';
const ERROR_ID = '[data-test-id=link-chooser-error]';
const SEARCH_INPUT_ID = '[data-test-id=link-chooser-search-input]';
const PREVIEW_ICON_ID = '[data-test-id=link-chooser-preview-icon]';
const COPY_ICON_ID = '[data-test-id=link-chooser-copy-icon]';
const CLEAR_ICON_ID = '[data-test-id=link-chooser-clear-icon]';
const SELECT_SECTION_ID = '[data-test-id=link-chooser-select-section]';
const RESULTS_LIST_ID = '[data-test-id=link-chooser-results-list]';
const ACTION_MENU_ID = '[data-test-id=link-chooser-action-menu]';
const BACK_BUTTON_ID = '[data-test-id=link-chooser-back-button]';
const NEW_TAB_ID = '[data-test-id=link-chooser-new-tab]';
const CHECKBOX_LABEL_ID = '[data-test-id=input-label]';
const DROPDOWN_WRAPPER_ID = '[data-test-id=link-chooser-dropdown]';
const DECORATOR_ICON_ID = '[data-test-id=link-chooser-decorator-icon]';
const LABEL_ID = "[data-test-id='link-chooser-label']";
const REQUIRED_ID = "[data-test-id='link-chooser-label-required']";
const MENU_ITEM = "[data-test-id='link-chooser-navigation-menu-item']";

const CUSTOM_QUERY = 'Custom link';
const SELECTED_CLASS = 'tw-text-violet-60';
const FOCUSED_OPTION_CLASS = 'tw-bg-black-10';
const TEMPLATE_TITLE = templateSection.title;
const GUIDELINE_TITLE = guidelineSection.title;
const FIRST_TEMPLATE_TITLE = TEMPLATE_ITEMS[0].title;
const FIRST_GUIDELINE_TITLE = GUIDELINE_ITEMS[0].title;

const PREFILLED_LOCAL_STORAGE = [
    {
        id: '10',
        title: 'Malaya Poster',
        subtitle: 'UNICEF Social Campaign',
        link: '',
        icon: 'TEMPLATE',
        size: 'Large',
        selectionIndicator: 'None',
    },
    {
        id: 'custom-link',
        title: 'www.frontify.com',
        link: 'www.frontify.com',
        icon: 'LINK',
        size: 'Large',
        selectionIndicator: 'None',
    },
    {
        id: '4',
        title: '"www.website.com"',
        link: 'https://www.frontify.com/en/digital-and-print-templates/',
        icon: 'EXTERNAL',
        size: 'Large',
        selectionIndicator: 'None',
    },
    {
        id: '11',
        preview:
            'https://images.frontify.test/s3/frontify-dev-files/eyJwYXRoIjoibXNpcmljXC9hY2NvdW50c1wvYzRcLzFcL3Byb2plY3RzXC8yXC9hc3NldHNcL2MyXC8xMlwvYTFkYzA0YTJkYmQwZTkxMTRlOGM2ODQzMWVmMjU5OTMtMTYzNDMwMTQ1MS5qcGcifQ:msiric:MLRtZYQCaEyWpPqgpGbA6P20PDgvagyoowNOllXgoCk?width=2400&height={height}',
        title: 'Brand Business Card',
        subtitle: 'Corporate Library',
        link: '#',
        icon: 'TEMPLATE',
        size: 'Large',
        selectionIndicator: 'None',
    },
    {
        id: '1',
        title: 'Brand listening - A Memoir',
        subtitle: 'Guideline XYZ',
        link: 'https://www.frontify.com',
        icon: 'DOCUMENT',
        size: 'Large',
        selectionIndicator: 'None',
    },
];

const getLinkChooserComponent = (overwriteProps?: Partial<LinkChooserProps>, returnError = false) => {
    const getGlobalByQuery = (query: string): Promise<SearchResult[]> => {
        return returnError
            ? Promise.reject()
            : Promise.resolve(
                  filterItems(query, data).map((item) => ({
                      ...item,
                      size: MenuItemContentSize.Large,
                      selectionIndicator: SelectionIndicatorIcon.None,
                  })),
              );
    };

    const getTemplatesByQueryMock = (query: string): Promise<SearchResult[]> =>
        returnError ? Promise.reject() : Promise.resolve(filterItems(query, TEMPLATE_ITEMS));

    const getGuidelinesByQueryMock = (query: string): Promise<SearchResult[]> =>
        returnError ? Promise.reject() : Promise.resolve(filterItems(query, GUIDELINE_ITEMS));

    const extraSections = [
        { ...guidelineSection, getResults: getGuidelinesByQueryMock },
        { ...templateSection, getResults: getTemplatesByQueryMock },
    ];

    const onLinkChange = cy.stub().as('onLinkChange');
    const onOpenInNewTabChange = cy.stub().as('onOpenInNewTabChange');
    const clipboardOptions = { writeText: cy.stub().as('clipboardOptions') };
    const openPreview = cy.stub().as('openPreview');

    return (
        <LinkChooser
            getGlobalByQuery={getGlobalByQuery}
            clipboardOptions={clipboardOptions}
            openPreview={openPreview}
            onLinkChange={onLinkChange}
            onOpenInNewTabChange={onOpenInNewTabChange}
            openInNewTab={false}
            extraSections={extraSections}
            {...overwriteProps}
        />
    );
};

describe('LinkChooser Component', () => {
    it('renders correctly', () => {
        cy.mount(getLinkChooserComponent());

        cy.get(LINK_CHOOSER_ID).should('be.visible');
    });

    describe('Input', () => {
        it('renders input props Label', () => {
            const label = 'LABEL';
            const placeholder = 'PLACEHOLDER';
            cy.mount(getLinkChooserComponent({ label, placeholder, required: true, validation: Validation.Error }));

            cy.get(LABEL_ID).should('contain', label);
            cy.get(REQUIRED_ID).should('have.text', '*');
            cy.get(SEARCH_INPUT_ID).invoke('attr', 'placeholder').should('equal', placeholder);
            cy.get(SEARCH_WRAPPER_ID).should('have.class', validationClassMap[Validation.Error]);
        });

        it('disables input and checkbox', () => {
            cy.mount(getLinkChooserComponent({ disabled: true }));

            cy.get(SEARCH_INPUT_ID).should('be.disabled');
            cy.get("input[type='checkbox']").should('be.disabled');
        });
    });

    describe('Empty localStorage', () => {
        beforeEach(() => {
            localStorage.removeItem(QUERIES_STORAGE_KEY);
        });

        it('displays empty results on click', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SELECT_SECTION_ID).should('not.exist');
            cy.get(PREVIEW_ICON_ID).should('not.exist');
            cy.get(COPY_ICON_ID).should('not.exist');
            cy.get(CLEAR_ICON_ID).should('not.exist');
            cy.get(EMPTY_RESULTS_ID).should('exist');
        });

        it('opens dropdown on focus and/or typing, closes on escape', () => {
            cy.mount(getLinkChooserComponent());
            cy.window().focus();
            cy.get('body').realPress('Tab');
            cy.get(SEARCH_INPUT_ID).should('be.focused');
            cy.get(DROPDOWN_WRAPPER_ID).should('be.visible');
            cy.get(SEARCH_INPUT_ID).realPress('Escape');
            cy.get(DROPDOWN_WRAPPER_ID).should('not.exist');
            cy.get(SEARCH_INPUT_ID).type(' ');
            cy.get(DROPDOWN_WRAPPER_ID).should('be.visible');
        });

        it('shows loading animation and loads results and replaces local storage results with search results on search input change', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(LOADER_ID).should('exist');
            cy.get(SELECT_SECTION_ID)
                .children()
                .should('have.length', filterItems(data[0].title, data).length + 1);
        });

        it('selects first item', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(SEARCH_INPUT_ID).should('have.value', data[0].title);
            cy.get(DECORATOR_ICON_ID).should('have.class', SELECTED_CLASS);
            cy.get('@onLinkChange').should('be.calledOnce');
        });

        it('opens in new tab', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(`${NEW_TAB_ID} ${CHECKBOX_LABEL_ID}`).click();
            cy.get('@onOpenInNewTabChange').should('be.calledOnce');
        });

        it('opens preview', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(PREVIEW_ICON_ID).click();
            cy.get('@openPreview').should('be.calledOnce');
        });

        it('copies to clipboard', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(COPY_ICON_ID).click();
            cy.get('@clipboardOptions').should('be.calledOnce');
        });

        it('clears the search input', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(CLEAR_ICON_ID).click();
            cy.get('@onLinkChange').should('be.called');
            cy.get(SEARCH_INPUT_ID).should('be.empty');
        });

        it('displays a custom link', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get('@onLinkChange').should('be.called');
            cy.get(SEARCH_INPUT_ID).should('have.value', CUSTOM_QUERY);
        });

        it('hides dropdown on blur', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(DROPDOWN_WRAPPER_ID).should('exist');
            cy.get(SEARCH_INPUT_ID).blur();
            cy.get(DROPDOWN_WRAPPER_ID).should('not.exist');
        });

        it('hides dropdown on escape', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(DROPDOWN_WRAPPER_ID).should('exist');
            cy.get(SEARCH_INPUT_ID).realPress('Escape');
            cy.get(DROPDOWN_WRAPPER_ID).should('not.exist');
        });

        it('adds selected item to local storage', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(CLEAR_ICON_ID).click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SELECT_SECTION_ID).children().should('have.length', 1);
        });

        it('interrupts the fetching phase and selects the query as custom link', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get(SEARCH_INPUT_ID).blur();
            cy.get(SEARCH_INPUT_ID).should('have.value', CUSTOM_QUERY);
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li > div`)
                .eq(0)
                .should(($container) => {
                    expect($container).to.have.css('font-weight', '500');
                });
        });

        it('adds a new custom link to local storage each time, unless matching text', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(DROPDOWN_WRAPPER_ID).should('not.exist');
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type('1');
            cy.get('@firstSelectItem').click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li`).should('have.length', 2);
            cy.get('@firstSelectItem').should('contain.text', `${CUSTOM_QUERY}1`);
            cy.get(SEARCH_INPUT_ID).clear();
            cy.get(SEARCH_INPUT_ID).type(`${CUSTOM_QUERY}2`);
            cy.get('@firstSelectItem').click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li`).should('have.length', 3);
            cy.get('@firstSelectItem').should('contain.text', `${CUSTOM_QUERY}2`);
            cy.get(SEARCH_INPUT_ID).clear();
            cy.get(SEARCH_INPUT_ID).type(`${CUSTOM_QUERY}1`);
            cy.get('@firstSelectItem').click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li`).should('have.length', 3);
            cy.get('@firstSelectItem').should('contain.text', `${CUSTOM_QUERY}1`);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(1).should('contain.text', `${CUSTOM_QUERY}2`);
        });

        it('resumes fetching when dropdown opens if the fetching phase was previously interrupted', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get('body').click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(LOADER_ID).should('exist');
            cy.get(SELECT_SECTION_ID)
                .children()
                .should('have.length', filterItems(data[0].title, data).length + 1);
        });

        it('does not resume fetching when dropdown opens if the fetching phase was previously resolved', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get('body').click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(LOADER_ID).should('not.exist');
        });

        it('selects existing document and reselects it on interrupt if the titles match', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type('{backspace}');
            cy.get(SEARCH_INPUT_ID).type(data[0].title[data[0].title.length - 1]);
            cy.get('body').click();
            cy.get(SEARCH_INPUT_ID).should('have.value', data[0].title);
            cy.get(`${DECORATOR_ICON_ID} > span > svg`).invoke('attr', 'name').should('eq', 'IconDocument16');
        });

        it('selects existing document and does not reselect it on interrupt if the titles do not match', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).clear();
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get('body').click();
            cy.get(SEARCH_INPUT_ID).should('have.value', CUSTOM_QUERY);
            cy.get(`${DECORATOR_ICON_ID} > span > svg`).invoke('attr', 'name').should('eq', 'IconLink16');
        });

        it('Creates and selects a custom link if enter pressed and no item is focused, even when loading', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get(DROPDOWN_WRAPPER_ID).should('exist');
            cy.get(LOADER_ID).should('be.visible');
            cy.get(DECORATOR_ICON_ID).should('not.have.class', SELECTED_CLASS);
            cy.get(SEARCH_INPUT_ID).realPress('Enter');
            cy.get(SEARCH_INPUT_ID).should('have.value', CUSTOM_QUERY);
            cy.get(DECORATOR_ICON_ID).should('have.class', SELECTED_CLASS);
            cy.get(DROPDOWN_WRAPPER_ID).should('not.exist');
            cy.get(SEARCH_INPUT_ID).realPress('ArrowDown');
            cy.get(DROPDOWN_WRAPPER_ID).should('exist');
            cy.get(`${SELECT_SECTION_ID} > li > div`)
                .eq(0)
                .should(($container) => {
                    expect($container).to.have.css('font-weight', '500');
                });
        });

        it('resets selection if input is empty', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(`${DECORATOR_ICON_ID} > span > svg`).invoke('attr', 'name').should('eq', 'IconDocument16');
            cy.get(DECORATOR_ICON_ID).should('have.class', SELECTED_CLASS);
            cy.get('@onLinkChange').should('be.calledOnce');
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).clear();
            cy.get('@onLinkChange').should('be.calledTwice');
            cy.get(DECORATOR_ICON_ID).should('not.have.class', SELECTED_CLASS);
        });

        it('displays error message when fetching fails', () => {
            cy.mount(getLinkChooserComponent({}, true));

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get(SELECT_SECTION_ID).should('not.exist');
            cy.get(ERROR_ID).should('exist');
        });
    });

    describe('Filled localStorage', () => {
        beforeEach(() => {
            localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(PREFILLED_LOCAL_STORAGE));
        });

        it('displays recent queries on click', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(PREVIEW_ICON_ID).should('not.exist');
            cy.get(COPY_ICON_ID).should('not.exist');
            cy.get(CLEAR_ICON_ID).should('not.exist');
            cy.get(EMPTY_RESULTS_ID).should('not.exist');
            cy.get(SELECT_SECTION_ID)
                .children()
                .should('have.length', JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || 'null').length);
        });

        it('replaces first item with the most recent selection', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').should(
                'contain',
                JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || 'null')[0].title,
            );
            cy.get(`${SELECT_SECTION_ID} > li`).eq(3).as('thirdSelectItem');
            cy.get('@thirdSelectItem').click();
            cy.get(CLEAR_ICON_ID).click();
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('newFirstSelectItem');
            cy.get('@newFirstSelectItem').should(
                'contain',
                JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || 'null')[3].title,
            );
        });
    });

    describe('Templates section', () => {
        it('displays all templates when query is empty', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(BACK_BUTTON_ID).should('not.exist');
            cy.get(ACTION_MENU_ID).contains(TEMPLATE_TITLE).click();
            cy.get(MENU_ITEM).should('have.length', 1).and('have.text', TEMPLATE_TITLE);
            cy.get(SELECT_SECTION_ID).children().should('have.length', TEMPLATE_ITEMS.length);
        });

        it('shows loading animation and loads results', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(ACTION_MENU_ID).contains(TEMPLATE_TITLE).click({ waitForAnimations: true });
            cy.get(SEARCH_INPUT_ID).type(FIRST_TEMPLATE_TITLE);
            cy.get(LOADER_ID).should('exist');
            cy.get(RESULTS_LIST_ID).children().should('have.length', filterItems(FIRST_TEMPLATE_TITLE, data).length);
        });

        it('searches the same query when switching from default view to templates view', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(FIRST_TEMPLATE_TITLE);
            cy.get(ACTION_MENU_ID).contains(TEMPLATE_TITLE).click({ waitForAnimations: true });
            cy.get(LOADER_ID).should('exist');
            cy.get(RESULTS_LIST_ID).children().should('have.length', filterItems(FIRST_TEMPLATE_TITLE, data).length);
        });

        it('searches the same query when switching from templates view to default view', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(ACTION_MENU_ID).contains(TEMPLATE_TITLE).click({ waitForAnimations: true });
            cy.get(LOADER_ID).should('exist');
            cy.get(SEARCH_INPUT_ID).type(FIRST_TEMPLATE_TITLE);
            cy.get(MENU_ITEM).click();
            cy.get(LOADER_ID).should('exist');
            cy.get(RESULTS_LIST_ID).children().should('have.length', filterItems(FIRST_TEMPLATE_TITLE, data).length);
        });

        it('selects first item', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(ACTION_MENU_ID).contains(TEMPLATE_TITLE).click({ waitForAnimations: true });
            cy.get(SEARCH_INPUT_ID).type(FIRST_TEMPLATE_TITLE);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(SEARCH_INPUT_ID).should('have.value', FIRST_TEMPLATE_TITLE);

            cy.get('@onLinkChange').should('be.calledOnce');
        });

        it('does not display a custom link', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(ACTION_MENU_ID).contains(TEMPLATE_TITLE).click({ waitForAnimations: true });
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get(EMPTY_RESULTS_ID).should('exist');
        });

        it('repopulates default view with recent queries when selected', () => {
            localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(PREFILLED_LOCAL_STORAGE));
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SELECT_SECTION_ID)
                .first()
                .should('contain', JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || 'null')[0].title);
            cy.get(ACTION_MENU_ID).contains(TEMPLATE_TITLE).click({ waitForAnimations: true });
            cy.get(SEARCH_INPUT_ID).type(FIRST_TEMPLATE_TITLE);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(SEARCH_INPUT_ID).should('have.value', FIRST_TEMPLATE_TITLE);
            cy.get(SELECT_SECTION_ID).should('not.exist');
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li`).first().should('contain', FIRST_TEMPLATE_TITLE);
            cy.get(`${SELECT_SECTION_ID} > li`)
                .eq(1)
                .should('contain', JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || 'null')[0].title);
        });

        it('can be navigated to by keyboard', () => {
            cy.mount(getLinkChooserComponent());
            cy.window().focus();
            cy.get('body').realPress('Tab');
            cy.get(DROPDOWN_WRAPPER_ID).should('be.visible');
            cy.get(MENU_ITEM).first().should('have.class', FOCUSED_OPTION_CLASS);
            cy.get(SEARCH_INPUT_ID).realPress('ArrowDown');
            cy.get(MENU_ITEM).first().should('not.have.class', FOCUSED_OPTION_CLASS);
            cy.get(MENU_ITEM).eq(1).should('have.class', FOCUSED_OPTION_CLASS).and('have.text', TEMPLATE_TITLE);
            cy.get(SEARCH_INPUT_ID).realPress('Enter');
            cy.get(DROPDOWN_WRAPPER_ID).should('be.visible');
            cy.get(MENU_ITEM).first().should('have.class', FOCUSED_OPTION_CLASS);
            cy.get(SEARCH_INPUT_ID).realPress('ArrowDown');
            cy.get(`${SELECT_SECTION_ID} > li`).first().as('firstSelectItem');
            cy.get('@firstSelectItem')
                .should('contain.text', FIRST_TEMPLATE_TITLE)
                .and('have.class', FOCUSED_OPTION_CLASS);
            cy.get(SEARCH_INPUT_ID).realPress('ArrowUp');
            cy.get(MENU_ITEM).first().should('have.class', FOCUSED_OPTION_CLASS).and('have.text', TEMPLATE_TITLE);
            cy.get(SEARCH_INPUT_ID).realPress('Enter');
            cy.get(EMPTY_RESULTS_ID).should('be.visible');
            cy.get(MENU_ITEM).eq(1).should('have.text', TEMPLATE_TITLE).and('have.class', FOCUSED_OPTION_CLASS);
            cy.get(SEARCH_INPUT_ID).type(data[0].title);
            cy.get('@firstSelectItem')
                .should('not.have.class', FOCUSED_OPTION_CLASS)
                .and('contain.text', data[0].title);
            cy.get(SEARCH_INPUT_ID).realPress('ArrowDown');
            cy.get('@firstSelectItem').should('have.class', FOCUSED_OPTION_CLASS);
            cy.get(DECORATOR_ICON_ID).should('not.have.class', SELECTED_CLASS);
            cy.get(SEARCH_INPUT_ID).realPress('Enter');
            cy.get(SEARCH_INPUT_ID).should('have.value', data[0].title);
            cy.get(DECORATOR_ICON_ID).should('have.class', SELECTED_CLASS);
            cy.get(DROPDOWN_WRAPPER_ID).should('not.exist');
        });
    });

    describe('Guidelines Section', () => {
        it('displays all guidelines when query is empty', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(BACK_BUTTON_ID).should('not.exist');
            cy.get(ACTION_MENU_ID).contains(GUIDELINE_TITLE).click();
            cy.get(MENU_ITEM).should('have.length', 1).and('have.text', GUIDELINE_TITLE);
            cy.get(SELECT_SECTION_ID).children().should('have.length', GUIDELINE_ITEMS.length);
        });

        it('shows loading animation and loads results', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(ACTION_MENU_ID).contains(GUIDELINE_TITLE).click({ waitForAnimations: true });
            cy.get(SEARCH_INPUT_ID).type(FIRST_GUIDELINE_TITLE);
            cy.get(LOADER_ID).should('exist');
            cy.get(RESULTS_LIST_ID)
                .children()
                .should('have.length', filterItems(FIRST_GUIDELINE_TITLE, GUIDELINE_ITEMS).length);
        });

        it('searches the same query when switching from default view to guidelines view', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SEARCH_INPUT_ID).type(FIRST_GUIDELINE_TITLE);
            cy.get(ACTION_MENU_ID).contains(GUIDELINE_TITLE).click({ waitForAnimations: true });
            cy.get(LOADER_ID).should('exist');
            cy.get(RESULTS_LIST_ID)
                .children()
                .should('have.length', filterItems(FIRST_GUIDELINE_TITLE, GUIDELINE_ITEMS).length);
        });

        it('searches the same query when switching from guidelines view to default view', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(ACTION_MENU_ID).contains(GUIDELINE_TITLE).click({ waitForAnimations: true });
            cy.get(LOADER_ID).should('exist');
            cy.get(SEARCH_INPUT_ID).type(FIRST_GUIDELINE_TITLE);
            cy.get(MENU_ITEM).click();
            cy.get(LOADER_ID).should('exist');
            cy.get(RESULTS_LIST_ID)
                .children()
                .should('have.length', filterItems(FIRST_GUIDELINE_TITLE, GUIDELINE_ITEMS).length);
        });

        it('selects first item', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(ACTION_MENU_ID).contains(GUIDELINE_TITLE).click({ waitForAnimations: true });
            cy.get(SEARCH_INPUT_ID).type(FIRST_GUIDELINE_TITLE);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(SEARCH_INPUT_ID).should('have.value', FIRST_GUIDELINE_TITLE);
            cy.get(DECORATOR_ICON_ID).should('have.class', SELECTED_CLASS);

            cy.get('@onLinkChange').should('be.calledOnce');
        });

        it('does not display a custom link', () => {
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(ACTION_MENU_ID).contains(GUIDELINE_TITLE).click({ waitForAnimations: true });
            cy.get(SEARCH_INPUT_ID).type(CUSTOM_QUERY);
            cy.get(EMPTY_RESULTS_ID).should('exist');
        });

        it('repopulates default view with recent queries when selected', () => {
            localStorage.setItem(QUERIES_STORAGE_KEY, JSON.stringify(PREFILLED_LOCAL_STORAGE));
            cy.mount(getLinkChooserComponent());

            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(SELECT_SECTION_ID)
                .first()
                .should('contain', JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || 'null')[0].title);
            cy.get(ACTION_MENU_ID).contains(GUIDELINE_TITLE).click({ waitForAnimations: true });
            cy.get(SEARCH_INPUT_ID).type(FIRST_GUIDELINE_TITLE);
            cy.get(`${SELECT_SECTION_ID} > li`).eq(0).as('firstSelectItem');
            cy.get('@firstSelectItem').click();
            cy.get(SEARCH_INPUT_ID).should('have.value', FIRST_GUIDELINE_TITLE);
            cy.get(SELECT_SECTION_ID).should('not.exist');
            cy.get(SEARCH_WRAPPER_ID).click();
            cy.get(`${SELECT_SECTION_ID} > li`).first().should('contain', FIRST_GUIDELINE_TITLE);
            cy.get(`${SELECT_SECTION_ID} > li`)
                .eq(1)
                .should('contain', JSON.parse(localStorage.getItem(QUERIES_STORAGE_KEY) || 'null')[0].title);
        });

        it('can be navigated to by keyboard', () => {
            cy.mount(getLinkChooserComponent());
            cy.window().focus();
            cy.get('body').realPress('Tab');
            cy.get(DROPDOWN_WRAPPER_ID).should('be.visible');
            cy.get(MENU_ITEM).first().should('have.class', FOCUSED_OPTION_CLASS).and('have.text', GUIDELINE_TITLE);
            cy.get(SEARCH_INPUT_ID).realPress('Enter');
            cy.get(DROPDOWN_WRAPPER_ID).should('be.visible');
            cy.get(`${SELECT_SECTION_ID} > li`).first().as('firstSelectItem');
            cy.get('@firstSelectItem').should('contain.text', FIRST_GUIDELINE_TITLE);
            cy.get(SEARCH_INPUT_ID).realPress('ArrowDown');
            cy.get('@firstSelectItem').should('have.class', FOCUSED_OPTION_CLASS);
            cy.get(SEARCH_INPUT_ID).realPress('Enter');
            cy.get(SEARCH_INPUT_ID).should('have.value', FIRST_GUIDELINE_TITLE);
            cy.get(DECORATOR_ICON_ID).should('have.class', SELECTED_CLASS);
            cy.get(DROPDOWN_WRAPPER_ID).should('not.exist');
        });
    });
});
