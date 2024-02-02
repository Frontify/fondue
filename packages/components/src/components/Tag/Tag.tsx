/* (c) Copyright Frontify Ltd., all rights reserved. */

type TagProps = {
    children: any;
};
export const Tag = ({ children }: TagProps) => {
    return <div className="bg-dark-red tw-bg-black-5 tw-bg-box-disabled">{children}</div>;
};
