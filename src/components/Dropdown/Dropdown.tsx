/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@elements/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@elements/Icon/Svg/CaretDown.svg";
import { ReactComponent as IconCaretUp } from "@elements/Icon/Svg/CaretUp.svg";
import { ReactComponent as IconReject } from "@elements/Icon/Svg/Reject.svg";
import useClickOutside from "@hooks/useClickOutside";
import { Size } from "@utilities/enum";
import { ReactElement, useRef, useState } from "react";
import css from "./Dropdown.module.css";
import DropdownMenu, { MenuBlock } from "./DropdownMenu/DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem/DropdownMenuItem";

export type DropdownProps = {
    menuBlocks: MenuBlock[];
    onChange: (id?: string) => void;
    activeItemId?: string;
    placeholder?: string;
    size?: Size.Small | Size.Large;
    disabled?: boolean;
    clearable?: boolean;
};

const getActiveItem = (menuBlocks: MenuBlock[], id: string) =>
    menuBlocks
        .map((block) => block.menuItems)
        .flat()
        .find((item) => item.id === id) || null;

export default function Dropdown({
    menuBlocks,
    onChange,
    activeItemId = "",
    placeholder = "Select item",
    size = Size.Small,
    disabled = false,
    clearable = false,
}: DropdownProps): ReactElement<DropdownProps> {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const dropdownElement = useRef<HTMLDivElement | null>(null);
    const activeItem = getActiveItem(menuBlocks, activeItemId);
    const wrapperClassNames = [
        css["triggerWrapper"],
        size === Size.Large ? css.large : "",
        disabled ? css.disabled : "",
    ].join(" ");
    const triggerClassNames = [css.trigger, !activeItem ? css.placeholder : "", disabled ? css.disabled : ""].join(" ");
    const clearButtonClassNames = [css.clear, disabled ? css.disabled : ""].join(" ");

    useClickOutside(dropdownElement.current, () => {
        setMenuIsOpen(false);
    });

    return (
        <div className={css.dropdown} ref={dropdownElement}>
            <div data-test-id="dropdown" className={wrapperClassNames}>
                <button
                    data-test-id="dropdown-trigger"
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
                    className={triggerClassNames}
                    disabled={disabled}
                >
                    {activeItem ? (
                        <DropdownMenuItem
                            title={activeItem.title}
                            icon={activeItem.icon}
                            subtitle={activeItem.subtitle}
                            size={activeItem.size}
                            style={activeItem.style}
                            disabled={disabled}
                            active
                        />
                    ) : (
                        <DropdownMenuItem title={placeholder} size={size} disabled={disabled} />
                    )}
                </button>
                {clearable && activeItem && (
                    <button
                        data-test-id="dropdown-clear-button"
                        className={clearButtonClassNames}
                        onClick={() => onChange("")}
                        disabled={disabled}
                    >
                        <IconReject size={IconSize.Size12} />
                    </button>
                )}
                <button
                    className={disabled ? css.disabled : ""}
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
                    disabled={disabled}
                >
                    {menuIsOpen ? <IconCaretUp size={IconSize.Size16} /> : <IconCaretDown size={IconSize.Size16} />}
                </button>
            </div>
            {menuIsOpen && (
                <DropdownMenu
                    menuBlocks={menuBlocks}
                    activeItemId={activeItemId}
                    size={size}
                    onChange={(id) => {
                        onChange(id);
                        setMenuIsOpen(!menuIsOpen);
                    }}
                />
            )}
        </div>
    );
}
