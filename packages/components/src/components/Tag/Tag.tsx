/* (c) Copyright Frontify Ltd., all rights reserved. */

type TagProps = {
    children: React.ReactNode;
};
export const Tag = ({ children }: TagProps) => {
    return <div className="bg-dark-red tw-bg-black-5 tw-bg-box-disabled">{children}</div>;
};
