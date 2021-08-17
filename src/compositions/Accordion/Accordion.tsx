/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FieldsetHeader, FieldsetHeaderProps } from "@compositions/FieldsetHeader/FieldsetHeader";
import { useAccordion, useAccordionItem } from "@react-aria/accordion";
import { useFocusRing } from "@react-aria/focus";
import { Item as StatelyItem } from "@react-stately/collections";
import { TreeState, useTreeState } from "@react-stately/tree";
import { Node } from "@react-types/shared";
import { getFocusStyle } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import { AnimatePresence, motion } from "framer-motion";
import React, { Children, FC, isValidElement, PropsWithChildren, ReactElement, useRef } from "react";

export type AccordionItemProps = PropsWithChildren<{ header: FieldsetHeaderProps }>;

type AriaAccordionItemProps = {
    item: Node<AccordionItemProps>;
    state: TreeState<AccordionItemProps>;
    header: FieldsetHeaderProps;
};

const AriaAccordionItem: FC<AriaAccordionItemProps> = ({ item, state, header }) => {
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const { buttonProps, regionProps } = useAccordionItem({ item }, state, triggerRef);
    const isOpen = state.expandedKeys.has(item.key) && item.props.children;
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <div key={item.key}>
            <button
                {...buttonProps}
                {...focusProps}
                data-test-id="accordion-item"
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
                className={merge(["tw-w-full tw-px-8 tw-py-7", isFocusVisible && getFocusStyle()])}
            >
                <FieldsetHeader {...header} active={isOpen} onClick={undefined} />
            </button>

            <AnimatePresence>
                {item.props.children && isOpen && (
                    <motion.div
                        key={item.key}
                        layout
                        initial={"collapsed"}
                        animate={"open"}
                        exit={"collapsed"}
                        variants={{
                            open: { height: "auto" },
                            collapsed: { height: 0 },
                        }}
                        transition={{ type: "tween" }}
                        data-test-id="accordion-item-content"
                    >
                        <div {...regionProps} className="tw-px-8 tw-pb-7">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {item.props.children()}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export type AccordionProps = {
    children: ReactElement<AccordionItemProps> | ReactElement<AccordionItemProps>[];
};

const mapToAriaProps = ({ children }: AccordionProps) => ({
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
    Children.map(children, (child) => {
        if (!isValidElement(child)) {
            return null;
        }

        if (!child.props.header) {
            console.warn("Use `AccordionItem` as children of `Accordion` and set the `header` prop accordingly.");
            return null;
        }

        return child;
    }).filter(Boolean);

export const AccordionItem = ({ children }: AccordionItemProps): ReactElement => <>{children}</>;

export const Accordion: FC<AccordionProps> = (props) => {
    const children = filterValidChildren(props);
    const ariaProps = mapToAriaProps({ children });
    const ref = useRef<HTMLDivElement | null>(null);
    const state = useTreeState<AccordionItemProps>(ariaProps);
    const { accordionProps } = useAccordion(ariaProps, state, ref);

    return (
        <div
            {...accordionProps}
            ref={ref}
            data-test-id="accordion"
            className="tw-divide-y tw-divide-black-10 tw-border-t tw-border-b tw-border-black-10"
        >
            {[...state.collection].map((item, index) => {
                const { header } = children[index].props;

                return <AriaAccordionItem key={item.key} item={item} state={state} header={header} />;
            })}
        </div>
    );
};
