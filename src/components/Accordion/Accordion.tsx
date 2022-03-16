/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CollapsibleWrap } from "@components/CollapsibleWrap";
import { useAccordion, useAccordionItem } from "@react-aria/accordion";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { Item as StatelyItem } from "@react-stately/collections";
import { useTreeState } from "@react-stately/tree";
import { FOCUS_STYLE_INSET } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import { motion } from "framer-motion";
import React, { Children, FC, isValidElement, KeyboardEvent, ReactElement, useEffect, useRef, useState } from "react";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionItemProps, AccordionProps, AriaAccordionItemProps } from "./types";

const ACCORDION_ID = "accordion";
const ACCORDION_ITEM_ID = "accordion-item";

const AriaAccordionItem: FC<AriaAccordionItemProps> = ({
    item,
    state,
    header,
    padding = true,
    divider = false,
    headerComponent: HeaderComponent = AccordionHeader,
}) => {
    const { active, size, ...headerProps } = header;
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const { buttonProps, regionProps } = useAccordionItem({ item }, state, triggerRef);
    const isOpen = state.expandedKeys.has(item.key) && item.props.children;
    const { isFocusVisible, focusProps } = useFocusRing();
    const [isActive, setIsActive] = useState(active);
    useEffect(() => {
        if (isActive) {
            state.toggleKey(item.key);
        }
        // We add a timeout to avoid isActive being set to false before
        // the first re-render, so that the animations won't play on load
        setTimeout(() => setIsActive(false), 50);
    }, []);

    return (
        <div
            key={item.key}
            className={merge([isFocusVisible ? FOCUS_STYLE_INSET : "", divider && "tw-divide-y tw-divide-black-10"])}
        >
            <button
                {...mergeProps(buttonProps, focusProps)}
                data-test-id={ACCORDION_ITEM_ID}
                ref={triggerRef}
                onClick={(event) => {
                    if (header.onClick) {
                        header.onClick();
                    }

                    if (buttonProps.onClick) {
                        buttonProps.onClick(event);
                    }
                }}
                onKeyUp={(event) => {
                    if (header.onClick && event.key === "Enter") {
                        header.onClick();
                    }

                    if (buttonProps.onKeyUp) {
                        buttonProps.onKeyUp(event);
                    }
                }}
                className="tw-w-full focus-visible:tw-outline-none"
            >
                <HeaderComponent isOpen={isOpen} size={size} {...headerProps} />
            </button>
            <CollapsibleWrap isOpen={item.props.children && isOpen} preventInitialAnimation={isActive}>
                <div {...regionProps} className={merge([padding && "tw-px-8 tw-pb-6"])}>
                    <motion.div
                        initial={isActive ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {item.props.children?.()}
                    </motion.div>
                </div>
            </CollapsibleWrap>
        </div>
    );
};

const mapToAriaProps = (children: ReactElement<AccordionItemProps>[]) => ({
    children: Children.map(children, (child, index) => {
        const { header, children } = child.props;

        return (
            <StatelyItem key={index} textValue={header.children}>
                {children ? () => children : null}
            </StatelyItem>
        );
    }),
});

const filterValidChildren = ({ children }: AccordionProps) =>
    Children.toArray(children).reduce<ReactElement<AccordionItemProps>[]>((validChildren, child) => {
        if (isValidElement(child) && !child.props.header) {
            console.warn("Use `AccordionItem` as children of `Accordion` and set the `header` prop accordingly.");
            return validChildren;
        }

        if (isValidElement(child)) {
            validChildren.push(child);
        }

        return validChildren;
    }, []);

export const AccordionItem = ({ children }: AccordionItemProps): ReactElement => <>{children}</>;

export const Accordion: FC<AccordionProps> = (props) => {
    const { divider = true, border = true } = props;
    const children = filterValidChildren(props);
    const ariaProps = mapToAriaProps(children);
    const ref = useRef<HTMLDivElement | null>(null);
    const state = useTreeState<AccordionItemProps>(ariaProps);
    const {
        // @react-aria prevents default action for onMouseDown as implemented here: https://github.com/adobe/react-spectrum/blob/e14523fedd93ac1a4ede355aed70988af572ae74/packages/%40react-aria/selection/src/useSelectableCollection.ts#L370
        // This makes it impossible to edit or select text in input fields inside the accordion
        // onKeydown automatically navigates away from child elements, including dropdown menus etc.
        // Focus should only be passed if the accordion item itself is focused
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        accordionProps: { onMouseDown, onKeyDown, ...accordionProps },
        // @react-aria enable by default typeahead which result in an event fired up on keypress and select the section
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
    } = useAccordion({ ...ariaProps, disallowTypeAhead: true }, state, ref);

    const accordionKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const key = (event.target as HTMLButtonElement).dataset.key;
        const isFocused = state.selectionManager.focusedKey === key;
        if (key && isFocused) {
            onKeyDown && onKeyDown(event);
        }
    };

    const propsWithModifiedKeyDown = { ...accordionProps, onKeyDown: accordionKeyDown };

    return (
        <div
            {...propsWithModifiedKeyDown}
            ref={ref}
            data-test-id={ACCORDION_ID}
            className={merge([
                divider && "tw-divide-y tw-divide-black-10",
                border && "tw-border-t tw-border-b tw-border-black-10",
            ])}
        >
            {[...state.collection].map((item, index) => {
                const { header, padding, headerComponent, divider } = children[index].props;
                return (
                    <AriaAccordionItem
                        key={item.key}
                        item={item}
                        state={state}
                        divider={divider}
                        header={header}
                        padding={padding}
                        headerComponent={headerComponent}
                    />
                );
            })}
        </div>
    );
};
