/* (c) Copyright Frontify Ltd., all rights reserved. */

export const imageMD = 'This is ![image](https://github.githubassets.com/images/modules/logos_page/Octocat.png).\n';

export const imageTree = [
    {
        type: 'p',
        children: [
            {
                text: 'This is ',
            },
            {
                type: 'img',
                children: [
                    {
                        text: '',
                    },
                ],
                link: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png',
                caption: 'image',
            },
            {
                text: '.',
            },
        ],
    },
];
