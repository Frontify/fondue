/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CollapsibleWrap } from '@components/CollapsibleWrap';
import { useAccordion, useAccordionItem } from '@react-aria/accordion';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { Item as StatelyItem } from '@react-stately/collections';
import { useTreeState } from '@react-stately/tree';
import { FOCUS_STYLE_INSET } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, { Children, Key, KeyboardEvent, ReactElement, ReactNode, isValidElement, useEffect, useRef } from 'react';
import { AccordionHeader } from './AccordionHeader';
import { AccordionItemProps, AccordionProps, AriaAccordionItemProps } from './types';

const ACCORDION_ID = 'fondue-accordion';
const ACCORDION_ITEM_ID = 'fondue-accordion-item';

const AriaAccordionItem = ({
    item,
    state,
    header,
    padding = true,
    divider = false,
    headerComponent: HeaderComponent = AccordionHeader,
    'data-test-id': dataTestId = ACCORDION_ITEM_ID,
}: AriaAccordionItemProps): ReactElement => {
    const { active, ...headerProps } = header;
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const { buttonProps, regionProps } = useAccordionItem({ item }, state, triggerRef);
    const isOpen = state.expandedKeys.has(item.key);
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <div
            key={item.key}
            className={merge([isFocusVisible ? FOCUS_STYLE_INSET : '', divider && 'tw-divide-y tw-divide-black-10'])}
        >
            <button
                {...mergeProps(buttonProps, focusProps)}
                data-test-id={dataTestId}
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
                    if (header.onClick && event.key === 'Enter') {
                        header.onClick();
                    }

                    if (buttonProps.onKeyUp) {
                        buttonProps.onKeyUp(event);
                    }
                }}
                className="tw-w-full focus-visible:tw-outline-none"
            >
                <HeaderComponent isOpen={isOpen} {...headerProps} />
            </button>
            <CollapsibleWrap isOpen={isOpen} preventInitialAnimation={active}>
                <div {...regionProps} className={merge([padding && 'tw-px-8 tw-pb-6'])}>
                    {item.props.children?.()}
                </div>
            </CollapsibleWrap>
        </div>
    );
};

const mapToAriaProps = (children: ReactElement<AccordionItemProps>[]) => {
    const ariaChildren = Children.map(children, (child, index) => {
        const { header, children } = child.props;

        return (
            <StatelyItem key={index} textValue={header.children}>
                {children ? ((() => children) as unknown as ReactNode) : null}
            </StatelyItem>
        );
    });

    const defaultExpandedKeys = (ariaChildren
        .map((item) => item.key)
        .filter((key, index) => key && !!children[index]?.props.header?.active) || []) as Key[];

    return { children: ariaChildren, defaultExpandedKeys };
};

const filterValidChildren = ({ children }: AccordionProps): ReactElement<AccordionItemProps>[] =>
    Children.toArray(children).reduce<ReactElement<AccordionItemProps>[]>((validChildren, child) => {
        if (isValidElement(child) && !child.props.header) {
            console.warn('Use `AccordionItem` as children of `Accordion` and set the `header` prop accordingly.');
            return validChildren;
        }

        if (isValidElement(child)) {
            validChildren.push(child as ReactElement<AccordionItemProps>);
        }

        return validChildren;
    }, []);

export const AccordionItem = ({ children }: AccordionItemProps): ReactElement => <>{children}</>;
AccordionItem.displayName = 'FondueAccordionItem';

const lastChildrenActive = (children: React.ReactNode | undefined): boolean | undefined => {
    const childrenArray = Children.toArray(children) as { key: string; props?: { header?: { active?: boolean } } }[];
    return childrenArray[childrenArray.length - 1]?.props?.header?.active === true;
};

export const Accordion = (props: AccordionProps): ReactElement => {
    const { divider = true, border = true, 'data-test-id': dataTestId = ACCORDION_ID } = props;
    const children = filterValidChildren(props);
    const ariaProps = mapToAriaProps(children);

    const ref = useRef<HTMLDivElement | null>(null);
    const state = useTreeState<AccordionItemProps>(ariaProps);

    // We need to detect the firstRender and childrenLength to not toggle any panel
    const accordionChildren = useRef({ firstRender: true, childLength: Children.toArray(props.children).length });
    const childrenLength = Children.toArray(props.children).length;
    useEffect(() => {
        /**
         * Checks if the last child in the Array is active
         * Only works when adding Children to end of Accordion
         */
        const childrenIsActive = lastChildrenActive(props.children);
        if (
            !!childrenIsActive &&
            !accordionChildren.current.firstRender &&
            Children.toArray(props.children).length > accordionChildren.current.childLength
        ) {
            state.toggleKey(ariaProps.defaultExpandedKeys[ariaProps.defaultExpandedKeys.length - 1]);
        }
        accordionChildren.current = { firstRender: false, childLength: Children.toArray(props.children).length };
    }, [ariaProps.defaultExpandedKeys, childrenLength, props.children, state]);

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
            data-test-id={dataTestId}
            className={merge([
                divider && 'tw-divide-y tw-divide-black-10',
                border && 'tw-border-t tw-border-b tw-border-black-10',
            ])}
        >
            {[...state.collection].map((item, index) => {
                const {
                    header,
                    padding,
                    headerComponent,
                    divider,
                    'data-test-id': itemDataTestId = ACCORDION_ITEM_ID,
                } = children[index].props;
                return (
                    <AriaAccordionItem
                        key={item.key}
                        item={item}
                        state={state}
                        divider={divider}
                        header={header}
                        padding={padding}
                        headerComponent={headerComponent}
                        data-test-id={itemDataTestId}
                    />
                );
            })}
        </div>
    );
};
Accordion.displayName = 'FondueAccordion';
