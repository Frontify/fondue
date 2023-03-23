/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MAX_DEFAULT_VALUE, MIN_DEFAULT_VALUE, Slider, SliderError, SliderProps, SliderValue } from './Slider';

const SLIDER_ID = '[data-test-id=fondue-slider]';
const SLIDER_LABEL_ID = '[data-test-id=fondue-slider-label]';
const SLIDER_INTERACTIVE_ID = '[data-test-id=fondue-slider-interactive]';
const SLIDER_TRACK_ID = '[data-test-id=fondue-slider-track]';
const SLIDER_INPUT_ID = '[data-test-id=text-input]';
const ID = 'slider-test';
const LABEL = 'Slider label';

const renderSlider = (props: SliderProps) => {
    cy.mount(<Slider {...props} />);
};

describe('Slider Component', () => {
    let onChangeStub: (value: SliderValue) => void;
    let onErrorStub: (error: SliderError) => void;
    beforeEach(() => {
        onChangeStub = cy.stub().as('onChangeStub');
        onErrorStub = cy.stub().as('onErrorStub');
    });

    it('renders with default values', () => {
        renderSlider({
            onChange: onChangeStub,
        });

        cy.get(SLIDER_ID).should('be.visible');
        cy.get(SLIDER_LABEL_ID).should('not.be.visible');
        cy.get(SLIDER_TRACK_ID).should('have.attr', 'aria-valuemin', MIN_DEFAULT_VALUE);
        cy.get(SLIDER_TRACK_ID).should('have.attr', 'aria-valuemax', MAX_DEFAULT_VALUE);
        cy.get(SLIDER_ID).contains(`${MIN_DEFAULT_VALUE}`).should('not.exist');
        cy.get(SLIDER_ID).contains(`${MAX_DEFAULT_VALUE}`).should('not.exist');
    });

    it('renders and call the on change with value 0 if no value provided', () => {
        renderSlider({
            onChange: onChangeStub,
        });

        cy.get('@onChangeStub').should('be.calledWith', {
            raw: 0,
            withSuffix: '0',
        });
    });

    it('renders and call the on change with the provided value', () => {
        renderSlider({
            value: 30,
            onChange: onChangeStub,
        });

        cy.get(SLIDER_ID).should('be.visible');
        cy.get('@onChangeStub').should('be.calledWith', {
            raw: 30,
            withSuffix: '30',
        });
    });

    it('renders with a provided id', () => {
        renderSlider({
            onChange: onChangeStub,
            id: ID,
        });

        cy.get(SLIDER_ID).should('have.attr', 'id', ID);
    });

    it('renders with a provided label', () => {
        renderSlider({
            onChange: onChangeStub,
            label: LABEL,
        });

        cy.get(SLIDER_ID).contains(LABEL);
    });

    it('renders with provided min and max values', () => {
        renderSlider({
            onChange: onChangeStub,
            min: 100,
            max: 200,
        });

        cy.get(SLIDER_TRACK_ID).should('have.attr', 'aria-valuemin', 100);
        cy.get(SLIDER_TRACK_ID).should('have.attr', 'aria-valuemax', 200);
    });

    it('renders and show min and max values', () => {
        renderSlider({
            onChange: onChangeStub,
            showMinMax: true,
        });

        cy.get(SLIDER_ID).contains(`${MIN_DEFAULT_VALUE}`);
        cy.get(SLIDER_ID).contains(`${MAX_DEFAULT_VALUE}`);
    });

    it('renders and show min and max values with suffix', () => {
        renderSlider({
            onChange: onChangeStub,
            showMinMax: true,
            valueSuffix: 'px',
        });

        cy.get(SLIDER_ID).contains(`${MIN_DEFAULT_VALUE}px`);
        cy.get(SLIDER_ID).contains(`${MAX_DEFAULT_VALUE}px`);
    });

    it('calls onChange when typing a valid value', () => {
        renderSlider({
            onChange: onChangeStub,
        });

        cy.get(SLIDER_INPUT_ID).clear().type('30');
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 30,
            withSuffix: '30',
        });
    });

    it('calls onChange when typing a valid value and adds the suffix to the returned value object', () => {
        renderSlider({
            onChange: onChangeStub,
            valueSuffix: '%',
        });

        cy.get(SLIDER_INPUT_ID).clear().type('30');
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 30,
            withSuffix: '30%',
        });
    });

    it('calls onChange when clicking on the track', () => {
        renderSlider({
            onChange: onChangeStub,
        });

        cy.get(SLIDER_INTERACTIVE_ID).click('center');
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 50,
            withSuffix: '50',
        });
    });

    it('calls onChange when pressing and moving the mouse over the track', () => {
        renderSlider({
            onChange: onChangeStub,
            value: 30,
        });

        cy.get(SLIDER_INTERACTIVE_ID)
            .trigger('mousedown', 'center', { which: 1 })
            .trigger('mousemove', 'left', { which: 1 })
            .trigger('mousemove', 'right', { which: 1 });
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 0,
            withSuffix: '0',
        });
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 100,
            withSuffix: '100',
        });
    });

    it('calls onError with NaN error', () => {
        renderSlider({
            onChange: onChangeStub,
            onError: onErrorStub,
        });

        cy.get(SLIDER_INPUT_ID).type('test');
        cy.get('@onErrorStub').should('have.been.calledWith', SliderError.ValueNaN);
    });

    it('calls onError with Out of Range error', () => {
        renderSlider({
            onChange: onChangeStub,
            onError: onErrorStub,
        });

        cy.get(SLIDER_INPUT_ID).type('120');
        cy.get('@onErrorStub').should('have.been.calledWith', SliderError.ValueOutOfRange);
    });

    it('calls onError if provided min is greater than max', () => {
        renderSlider({
            onChange: onChangeStub,
            onError: onErrorStub,
            min: 100,
            max: 0,
        });

        cy.get(SLIDER_INPUT_ID).type('120');
        cy.get('@onErrorStub').should('have.been.calledWith', SliderError.MinMax);
    });

    it('renders the disabled state', () => {
        renderSlider({
            onChange: onChangeStub,
            disabled: true,
        });

        cy.get(SLIDER_INTERACTIVE_ID).should('be.disabled');
        cy.get(SLIDER_INPUT_ID).should('be.disabled');
    });

    it.only('changes the value using keyboard arrows', () => {
        renderSlider({
            onChange: onChangeStub,
        });

        cy.get(SLIDER_INTERACTIVE_ID).focus();
        cy.realPress('ArrowRight');
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 1,
            withSuffix: '1',
        });

        cy.realPress('ArrowUp');
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 2,
            withSuffix: '2',
        });

        cy.realPress('ArrowDown');
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 1,
            withSuffix: '1',
        });

        cy.realPress('ArrowLeft');
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 0,
            withSuffix: '0',
        });

        cy.get(SLIDER_INTERACTIVE_ID).trigger('keydown', { key: 'End' });
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 100,
            withSuffix: '100',
        });

        cy.realPress('Home');
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 0,
            withSuffix: '0',
        });
    });

    it('changes the value using keyboard arrows and multiplying the step when shift is pressed', () => {
        renderSlider({
            onChange: onChangeStub,
            step: 2,
            stepMultiplier: 10,
        });

        cy.get(SLIDER_INTERACTIVE_ID).focus();
        cy.get(SLIDER_INTERACTIVE_ID).trigger('keydown', { key: 'ArrowRight', shiftKey: true });
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 20,
            withSuffix: '20',
        });
        cy.get(SLIDER_INTERACTIVE_ID).trigger('keydown', { key: 'ArrowUp', shiftKey: true });
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 40,
            withSuffix: '40',
        });
        cy.get(SLIDER_INTERACTIVE_ID).trigger('keydown', { key: 'ArrowDown', shiftKey: true });
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 20,
            withSuffix: '20',
        });
        cy.get(SLIDER_INTERACTIVE_ID).trigger('keydown', { key: 'ArrowLeft', shiftKey: true });
        cy.get('@onChangeStub').should('have.been.calledWith', {
            raw: 0,
            withSuffix: '0',
        });
    });
});
