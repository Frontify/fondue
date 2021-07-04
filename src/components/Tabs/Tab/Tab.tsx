/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";

export interface TabProps {
    children: ReactElement | ReactElement[] | string;
    title: string;
}

export default function Tab({ children }: TabProps): ReactElement<TabProps> {
    return <>{children}</>;
}
