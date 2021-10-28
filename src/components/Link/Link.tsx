/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";

export type LinkProps = {
    foo: string;
    href: string;
};

export const Link: FC<LinkProps> = ({ foo, href }) => {
    return (
        <a href={href} data-test-id="link" className="tw-bg-violet-50 tw-text-white tw-p-8">
            {foo}
        </a>
    );
};
