/* (c) Copyright Frontify Ltd., all rights reserved. */

[
    { type: 'p', children: [{ text: 'This text is bold.', bold: true }] },
    { type: 'p', children: [{ text: 'This text is italic.', italic: true }] },
    { type: 'p', children: [{ text: 'This text has an underline.', underline: true }] },
    { type: 'p', children: [{ text: 'This text has a strikethrough.', strikethrough: true }] },
    { type: 'p', children: [{ text: 'This text is a code line.', code: true }] },
    { type: 'p', children: [{ text: 'This text is followed by a break.' }] },
    {
        type: 'p',
        children: [
            {
                text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            },
        ],
    },
    {
        type: 'ul',
        children: [
            { type: 'li', children: [{ type: 'lic', children: [{ text: 'This is list item number one.' }] }] },
            { type: 'li', children: [{ type: 'lic', children: [{ text: 'This is list item number two.' }] }] },
            {
                type: 'li',
                children: [
                    { type: 'lic', children: [{ text: 'This is list item number three.' }] },
                    {
                        type: 'ul',
                        children: [
                            {
                                type: 'li',
                                children: [{ type: 'lic', children: [{ text: 'This is child item number one.' }] }],
                            },
                            {
                                type: 'li',
                                children: [
                                    {
                                        type: 'lic',
                                        children: [{ text: 'This is child item number two, with more children.' }],
                                    },
                                    {
                                        type: 'ul',
                                        children: [
                                            {
                                                type: 'li',
                                                children: [
                                                    {
                                                        type: 'lic',
                                                        children: [{ text: 'This is child of child item number one.' }],
                                                    },
                                                ],
                                            },
                                            {
                                                type: 'li',
                                                children: [
                                                    {
                                                        type: 'lic',
                                                        children: [{ text: 'This is child of child item number two.' }],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        type: 'ol',
        children: [
            { type: 'li', children: [{ type: 'lic', children: [{ text: 'This comes first.' }] }] },
            { type: 'li', children: [{ type: 'lic', children: [{ text: 'This comes second.' }] }] },
            {
                type: 'li',
                children: [{ type: 'lic', children: [{ text: 'And last but not least, this comes third.' }] }],
            },
        ],
    },
    {
        type: 'p',
        children: [
            { text: '' },
            { type: 'a', url: 'https://frontify.com', target: '_blank', children: [{ text: 'This is a link.' }] },
            { text: '' },
        ],
    },
    { type: 'heading1', children: [{ text: 'Heading 1' }] },
    { type: 'heading2', children: [{ text: 'Heading 2' }] },
    { type: 'heading3', children: [{ text: 'Heading 3' }] },
    { type: 'heading4', children: [{ text: 'Heading 4' }] },
    { type: 'custom1', children: [{ text: 'Custom 1' }] },
    { type: 'custom2', children: [{ text: 'Custom 2' }] },
    { type: 'custom3', children: [{ text: 'Custom 3' }] },
    { type: 'quote', children: [{ text: 'Quote' }] },
    {
        type: 'p',
        children: [
            { text: '' },
            { type: 'button', url: 'https://smartive.ch/', target: '_blank', children: [{ text: 'Test' }] },
            { text: '' },
        ],
    },
];
