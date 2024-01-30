/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@foundation/Icon/Generated';
import { AssetType } from './AssetInput';

export const EXAMPLE_IMAGES: AssetType[] = [
    {
        name: 'foo1',
        size: 2000,
        type: 'image',
        extension: 'JPG',
        src: 'https://picsum.photos/100/150',
        source: 'upload',
    },
    {
        name: 'foo2',
        size: 2000,
        type: 'image',
        extension: 'JPG',
        src: 'https://picsum.photos/200/200',
        source: 'library',
        sourceName: '',
    },
    {
        name: 'foo3',
        size: 2000,
        type: 'image',
        extension: 'JPG',
        src: 'https://picsum.photos/100/100',
        source: 'library',
        sourceName: '',
    },
    {
        name: 'foo4',
        size: 1000,
        type: 'image',
        extension: 'JPG',
        src: 'https://picsum.photos/400/200',
        source: 'library',
        sourceName: '',
    },
    {
        name: 'foo5',
        size: 1000,
        type: 'image',
        extension: 'JPG',
        src: 'https://picsum.photos/400/200',
        source: 'library',
        sourceName: '',
    },
];

export const MIXED_ASSETS: AssetType[] = [
    ...EXAMPLE_IMAGES.slice(0, 2),
    {
        source: 'library',
        sourceName: 'Foobar',
        name: 'foo',
        type: 'icon',
        icon: <IconIcon />,
    },
    {
        source: 'library',
        sourceName: 'Foobar',
        name: 'foo',
        extension: 'MP3',
        size: 2000,
        type: 'audio',
    },
    {
        source: 'library',
        sourceName: 'Foobar',
        name: 'foo',
        extension: 'MP3',
        size: 2000,
        type: 'audio',
    },
];
