/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconActions } from "@components/Icon/Svg/Actions.svg";
import useClickOutside from "@hooks/useClickOutside";
import { ReactElement, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { Link } from "react-router-dom";
import css from "./Card.module.css";

export interface CardProps {
    children: ReactElement | ReactElement[] | string;
    icon: string;
    link: string;
    cover?: string;
    dropdown?: ReactElement | string;
}

export default function Card({ children, icon, link, dropdown, cover }: CardProps): ReactElement<CardProps> {
    const containerElement = useRef<HTMLDivElement | null>(null);
    const [buttonElement, setButtonElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setDropdownElement] = useState<HTMLDivElement | null>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const { styles, attributes } = usePopper(buttonElement, popperElement, {
        placement: "bottom-end",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 9],
                },
            },
        ],
    });

    useClickOutside(containerElement.current, () => {
        setShowDropdown(false);
    });

    const toggleDropdown = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    const dropdownIconClasses = [css.dropdownIcon, ...(showDropdown ? [css.selected] : [])].join(" ");

    return (
        <div ref={containerElement}>
            <Link className={css.card} to={link}>
                {cover && <img src={cover} className={css.header} alt="Cover card" data-test-id="card-cover" />}
                <div className={css.body}>
                    <img src={icon} className={css.icon} alt="App Icon" data-test-id="card-icon" />
                    <div className={css.content} data-test-id="card-content">
                        {children}
                    </div>
                    {dropdown && (
                        <div
                            className={dropdownIconClasses}
                            onClick={toggleDropdown}
                            ref={setButtonElement}
                            tabIndex={0}
                            data-test-id="card-dropdown-button"
                        >
                            <IconActions size={IconSize.Size24} />
                        </div>
                    )}
                </div>
            </Link>
            {showDropdown && (
                <div
                    className={css.dropdown}
                    ref={setDropdownElement}
                    style={styles.popper}
                    {...attributes.popper}
                    data-test-id="card-dropdown"
                >
                    {dropdown}
                </div>
            )}
        </div>
    );
}
