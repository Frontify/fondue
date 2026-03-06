/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from '../Card';

const CARD_TEST_ID = 'test-card';
const CARD_TITLE_TEXT = 'Card Title';
const CARD_META_TEXT = 'Card Meta';

describe('Card Component', () => {
    it('should render the card root', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID)).toBeInTheDocument();
    });

    it('should render title text correctly', () => {
        render(
            <Card.Root>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByText(CARD_TITLE_TEXT)).toBeInTheDocument();
    });

    it('should render meta text correctly', () => {
        render(
            <Card.Root>
                <Card.Meta>{CARD_META_TEXT}</Card.Meta>
            </Card.Root>,
        );
        expect(screen.getByText(CARD_META_TEXT)).toBeInTheDocument();
    });

    it('should have selected state when selected is true', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID} selected={true}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID)).toHaveAttribute('data-selected', 'true');
    });

    it('should render banner with image', () => {
        render(
            <Card.Root>
                <Card.Banner size="large" fit="cover">
                    <Card.BannerImage src="https://example.com/image.jpg" alt="Test image" />
                </Card.Banner>
            </Card.Root>,
        );
        expect(screen.getByAltText('Test image')).toBeInTheDocument();
    });
});
