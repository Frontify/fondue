import React from 'react';
import { useId } from '@react-aria/utils';
import { NewTreeProps } from './types';

export const NewTree = ({ children }: NewTreeProps) => {
    const treeId = useId();

    return (
        <ul
            id={treeId}
            data-test-id="tree"
            className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
        >
            {children}
        </ul>
    );
};
