/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, Fragment } from "react";
import { Link } from "react-router-dom";
import css from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
    label?: string;
    link?: string;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps): ReactElement<BreadcrumbProps> {
    return (
        <ul className={css.breadcrumb}>
            {items.map((item, index) => (
                <Fragment key={`breadcrumb-${index}`}>
                    <li className={css.item}>
                        {item.label && item.link ? (
                            <Link to={item.link} className={css.link} data-test="breadcrumb-item">
                                {item.label}
                            </Link>
                        ) : (
                            <div className={css.loading}></div>
                        )}
                    </li>
                </Fragment>
            ))}
        </ul>
    );
}
