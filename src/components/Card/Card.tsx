/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@elements/Icon/Icon";
import { ReactComponent as IconActions } from "@elements/Icon/Svg/Actions.svg";
import useClickOutside from "@hooks/useClickOutside";
import { PropsWithChildren, ReactElement, useState } from "react";
import { usePopper } from "react-popper";
import { Link } from "react-router-dom";
import css from "./Card.module.css";

export type CardProps = PropsWithChildren<{
    icon: string;
    link: string;
    cover?: string;
    dropdown?: ReactElement | string;
}>;

const DROPDOWN_DISTANCE = 9;
const DROPDOWN_SKIDDING = 0;

export default function Card({ children, icon, link, dropdown, cover }: CardProps): ReactElement<CardProps> {
    const [dropdownTriggerElement, setDropdownTriggerElement] = useState<HTMLDivElement | null>(null);
    const [dropdownElement, setDropdownElement] = useState<HTMLDivElement | null>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const { styles, attributes } = usePopper(dropdownTriggerElement, dropdownElement, {
        placement: "bottom-end",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [DROPDOWN_SKIDDING, DROPDOWN_DISTANCE],
                },
            },
        ],
    });

    useClickOutside(dropdownElement, () => {
        setShowDropdown(false);
    });

    const toggleDropdown = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    const dropdownIconClasses = [css.dropdownIcon, ...(showDropdown ? [css.selected] : [])].join(" ");

    return (
        <>
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
                            ref={setDropdownTriggerElement}
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
        </>
    );
}
