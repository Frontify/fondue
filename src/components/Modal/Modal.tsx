/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";

export type ModalProps = {
    foo: string;
};

export const Modal: FC<ModalProps> = ({ foo }) => {
    return <div data-test-id="modal">{foo}</div>;
};
