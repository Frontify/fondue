/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, useState } from 'react';

import { Checkbox } from '#/components/Checkbox/Checkbox';
import { Flex } from '#/components/Flex/Flex';
import { Label } from '#/components/Label/Label';
import { TextInput } from '#/components/TextInput/TextInput';

const TokenPreview = createContext<{
    tailwindPrefix: string;
    textContent: string;
}>({
    tailwindPrefix: 'tw-',
    textContent: '',
});

export const PreviewWrapper = ({ children, header }: { children: React.ReactNode; header: string }) => {
    const [tailwindPrefix, setTailwindPrefix] = useState('tw-');
    const [textContent, setTextContent] = useState('Hello World!');
    const toggleTailwindPrefix = () => setTailwindPrefix((prev) => (prev === 'tw-' ? '' : 'tw-'));
    return (
        <TokenPreview.Provider value={{ tailwindPrefix, textContent }}>
            <Flex direction="column" gap={4}>
                <Flex direction="row" gap={4} justify="space-between">
                    <h1 className="tw-heading-xx-large tw-text-surface-on-surface">{header}</h1>
                    <Flex direction="column" gap={4} minWidth={64}>
                        <Flex direction="column" gap={2}>
                            <Label htmlFor="text-value">Display Text</Label>
                            <TextInput
                                id="text-value"
                                value={textContent}
                                onChange={(e) => setTextContent(e.target.value)}
                            />
                        </Flex>
                        <Flex direction="row" align="center" gap={2}>
                            <Checkbox
                                id="use-tailwind-prefix"
                                value={tailwindPrefix === ''}
                                onChange={toggleTailwindPrefix}
                            />
                            <Label htmlFor="text-value">Remove Frontify Tailwind Prefix (tw-)</Label>
                        </Flex>
                    </Flex>
                </Flex>
                <div className="tw-flex tw-items-center tw-justify-center tw-h-full">{children}</div>
            </Flex>
        </TokenPreview.Provider>
    );
};

export const useTokenPreview = () => {
    return useContext(TokenPreview);
};
