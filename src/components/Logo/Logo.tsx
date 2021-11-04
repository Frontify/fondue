/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import logo from "../../assets/nook-animated.png";

export type LogoProps = {
    foo: string;
};

export const Logo: FC<LogoProps> = ({ foo }) => {
    // TODO
    return <div data-test-id="logo">{logo}</div>;
};
