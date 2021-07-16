/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactPortal } from "react";
import ReactDOM from "react-dom";
import Modal, { ModalProps } from "./Modal";

export default function ModalPortal(props: ModalProps): ReactPortal {
    return ReactDOM.createPortal(<Modal {...props} />, document.querySelector("#react-modal") as Element);
}
