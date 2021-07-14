/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InputLabelProps } from "@components/InputLabel/InputLabel";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import css from "./FormControl.module.css";

interface FormControlPropsBase extends InputLabelProps {
    extra: ReactNode;
}

export type FormControlProps = PropsWithChildren<FormControlPropsBase>;

export default function FormControl({ children }: FormControlProps): ReactElement<FormControlProps> {
    return (
        <div data-test-id="Foo" className={css.fooBar}>
            {children}
        </div>
    );
}
