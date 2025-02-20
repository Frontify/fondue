/* (c) Copyright Frontify Ltd., all rights reserved. */

import { nodesToSerialize } from '../helpers/exampleValues';

import { serializeNodesToHtml } from './serializeToHtml';

describe('serializeNodesToHtml()', () => {
    it('should serialize nodes to html string', () => {
        const serialized = serializeNodesToHtml(nodesToSerialize);
        expect(serialized).to.be.a('string');
    });

    it('should render columns if there is more than one given', () => {
        const serialized = serializeNodesToHtml(nodesToSerialize, { columns: 2 });
        expect(serialized).to.contain('columns:2;');
    });

    it('should not render columns if there is only one given', () => {
        const serialized = serializeNodesToHtml(nodesToSerialize, { columns: 1 });
        expect(serialized).not.to.contain('columns:1;');
    });

    it('should render the custom class if provided', () => {
        const serialized = serializeNodesToHtml(nodesToSerialize, {
            customClass: 'tw-columns-3',
            columnGap: '20px',
            columns: 2,
        });
        expect(serialized).to.contain('class="tw-columns-3"');
        expect(serialized).to.contain('column-gap:20px');
        expect(serialized).not.to.contain('columns:2');
    });

    it('should have a default column count of 1', () => {
        const serialized = serializeNodesToHtml(nodesToSerialize);
        expect(serialized).not.to.contain('columns:1;');
    });

    it('should render column gap if there is more than one column', () => {
        const serialized = serializeNodesToHtml(nodesToSerialize, { columns: 2, columnGap: '10px' });
        expect(serialized).to.contain('column-gap:10px;');
    });

    it('should have a default column gap of normal', () => {
        const serialized = serializeNodesToHtml(nodesToSerialize, { columns: 2 });
        expect(serialized).to.contain('column-gap:normal');
    });

    it('should serialize the html text', () => {
        const node = [
            {
                type: 'p',
                children: [
                    {
                        text: "<img src=x onerror='alert(123)'/>\\n",
                    },
                ],
            },
        ];
        const serialized = serializeNodesToHtml(node);
        expect(serialized).to.contain('&lt;img src=x onerror=&#39;alert(123)&#39;/&gt;\\n');
    });

    describe('paragraph', () => {
        it('serializes an empty p node to a paragraph with an zero width space', () => {
            const node = [
                {
                    type: 'p',
                    children: [{ text: '' }],
                },
            ];

            const result = serializeNodesToHtml(node);
            expect(result).to.equal(
                '<p dir="auto" class="tw-break-words" style="font-size: 14px; font-style: normal; font-weight: normal;">&#xFEFF;</p>',
            );
        });

        it('serializes an empty p node to a paragraph e', () => {
            const node = [
                {
                    type: 'p',
                    children: [{ text: 'First paragraph' }],
                },
                {
                    type: 'p',
                    children: [{ text: '' }],
                },
                {
                    type: 'p',
                    children: [{ text: 'Third paragraph' }],
                },
            ];

            const result = serializeNodesToHtml(node);
            expect(result).to.equal(
                '<p dir="auto" class="tw-break-words" style="font-size: 14px; font-style: normal; font-weight: normal;">First paragraph</p><p dir="auto" class="tw-break-words" style="font-size: 14px; font-style: normal; font-weight: normal;">&#xFEFF;</p><p dir="auto" class="tw-break-words" style="font-size: 14px; font-style: normal; font-weight: normal;">Third paragraph</p>',
            );
        });
    });
});
