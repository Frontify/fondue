/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import animatedNook from "../../assets/nook-animated.png";

export const Loading: FC = () => {
    return <div data-test-id="loading">{animatedNook}</div>;
};
