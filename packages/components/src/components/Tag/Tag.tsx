/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

type TagProps = {
    children: ReactNode;
};

export const Tag = ({ children }: TagProps) => {
    return <div className="bg-dark-red tw-bg-black-5 tw-bg-box-disabled">{children}</div>;
};
