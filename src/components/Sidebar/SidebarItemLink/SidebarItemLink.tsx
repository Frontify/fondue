/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import css from "./SidebarItemLink.module.css";

export interface SidebarItemLinkProps {
    label: string;
    link: string;
}

export default function SidebarItemLink({ label, link }: SidebarItemLinkProps): ReactElement<SidebarItemLinkProps> {
    return (
        <NavLink
            activeClassName={css.groupRowSelected}
            className={css.groupRow}
            to={link}
            data-test-id="sidebar-item-link"
        >
            {label}
        </NavLink>
    );
}
