/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { LinearGauge } from './LinearGauge';
import { type LinearGaugeLegendPosition, type LinearGaugeTooltipMode } from './types';

const SECTIONS = [
    { name: 'A', label: '210', percentage: 52.5, description: 'What counts towards A.' },
    { name: 'B', label: '48', percentage: 12, description: 'What counts towards B.' },
];

type GaugeOptions = {
    tooltipMode?: LinearGaugeTooltipMode;
    legendPosition?: LinearGaugeLegendPosition;
};

const renderGauge = (options?: GaugeOptions) => render(<LinearGauge sections={SECTIONS} {...options} />);

const focus = (element: HTMLElement) => act(() => element.focus());

// With the legend on top, the bar's section comes after its legend entry.
const getSection = (name: string) => screen.getAllByRole('img', { name }).at(-1) as HTMLElement;

// Descriptions are also rendered hidden for screen readers, with an id; the tooltip's copy has none.
const queryTooltipText = (text: string) => screen.queryAllByText(text).find((element) => !element.id) ?? null;

describe('LinearGauge', () => {
    afterEach(cleanup);

    it('should name each section with its value', () => {
        renderGauge();

        expect(screen.getByRole('img', { name: 'A: 210' }).getAttribute('tabindex')).toBe('0');
        expect(screen.getByRole('img', { name: 'B: 48' }).getAttribute('tabindex')).toBe('0');
    });

    it('should not make an empty section focusable', () => {
        render(<LinearGauge sections={[{ name: 'A', label: '–', percentage: 0 }]} />);

        expect(screen.getByRole('img', { name: 'A: –' }).getAttribute('tabindex')).toBeNull();
    });

    it('should list every section when a section gets focus', () => {
        renderGauge();

        focus(screen.getByRole('img', { name: 'B: 48' }));

        expect(screen.getByText('A:')).not.toBeNull();
        expect(screen.getByText('B:')).not.toBeNull();
        expect(screen.queryByText('What counts towards B.')).toBeNull();
    });

    it('should show only the focused section with its description in hovered mode', () => {
        renderGauge({ tooltipMode: 'hovered' });

        focus(getSection('B: 48'));

        expect(screen.getByText('B:')).not.toBeNull();
        expect(queryTooltipText('What counts towards B.')).not.toBeNull();
        expect(screen.queryByText('A:')).toBeNull();
    });

    it('should describe each section and legend entry with its description in hovered mode', () => {
        renderGauge({ tooltipMode: 'hovered' });

        for (const element of screen.getAllByRole('img', { name: 'B: 48' })) {
            const descriptionId = element.getAttribute('aria-describedby') ?? '';

            expect(document.getElementById(descriptionId)?.textContent).toBe('What counts towards B.');
        }
    });

    it('should show the section tooltip from its legend entry in hovered mode', () => {
        renderGauge({ tooltipMode: 'hovered' });

        const [legendEntry] = screen.getAllByRole('img', { name: 'A: 210' });
        focus(legendEntry as HTMLElement);

        expect(queryTooltipText('What counts towards A.')).not.toBeNull();
    });

    it('should not make the legend focusable when every section is listed', () => {
        renderGauge();

        expect(screen.getAllByRole('img', { name: 'A: 210' })).toHaveLength(1);
    });

    it('should close the tooltip on Escape', () => {
        renderGauge({ tooltipMode: 'hovered' });
        const section = getSection('B: 48');

        focus(section);
        fireEvent.keyDown(section, { key: 'Escape' });

        expect(queryTooltipText('What counts towards B.')).toBeNull();
    });

    it('should show the legend below the bar', () => {
        const { container } = renderGauge({ legendPosition: 'bottom' });

        expect(container.querySelector('[class*="stack"]')?.lastElementChild?.textContent).toContain('A');
    });
});
