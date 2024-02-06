/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { cn, withRef } from '@udecode/cn';
import {
    ComboboxContentItemProps,
    ComboboxContentProps,
    ComboboxProps,
    comboboxActions,
    createVirtualRef,
    useActiveComboboxStore,
    useComboboxContent,
    useComboboxContentState,
    useComboboxControls,
    useComboboxItem,
    useComboboxSelectors,
    useEditorRef,
    useEditorSelector,
    useEventEditorSelectors,
    usePlateSelectors,
} from '@udecode/plate';

export const ComboboxItem = withRef<'div', ComboboxContentItemProps>(
    ({ combobox, index, item, onRenderItem, className, ...rest }, ref) => {
        const { props } = useComboboxItem({ item, index, combobox, onRenderItem });
        return (
            <div
                ref={ref}
                className={cn(
                    'tw-relative tw-flex tw-h-9 tw-cursor-pointer tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors',
                    'tw-text-text-weak tw-text-body-medium tw-px-5 hover:tw-bg-box-neutral hover:tw-text-box-neutral-inverse-hover data-[highlighted=true]:tw-text-box-neutral-inverse-hover data-[highlighted=true]:tw-bg-box-neutral data-[highlighted=true]:hover:tw-bg-box-neutral-hover',
                    className,
                )}
                {...props}
                {...rest}
            />
        );
    },
);

export function ComboboxContent(props: ComboboxContentProps) {
    const { component: Component, items, portalElement, combobox, onRenderItem } = props;

    const editor = useEditorRef();

    const filteredItems = useComboboxSelectors.filteredItems();
    const activeComboboxStore = useActiveComboboxStore()!;
    const state = useComboboxContentState({ items, combobox });
    const { menuProps, targetRange } = useComboboxContent(state);
    return (
        <Popover.Root open>
            <Popover.PopoverAnchor virtualRef={createVirtualRef(editor, targetRange ?? undefined)} />

            <Popover.Portal container={portalElement}>
                <Popover.Content
                    {...menuProps}
                    sideOffset={5}
                    side="bottom"
                    align="start"
                    className={cn(
                        'tw-z-[500] tw-m-0 tw-max-h-[288px] tw-w-[270px] tw-overflow-scroll tw-rounded-md tw-bg-base tw-py-2 tw-shadow-md tw-border tw-border-line-strong',
                    )}
                    onOpenAutoFocus={(event) => event.preventDefault()}
                >
                    {Component ? Component({ store: activeComboboxStore }) : null}

                    {filteredItems.map((item, index) => (
                        <ComboboxItem
                            key={item.key}
                            item={item}
                            combobox={combobox}
                            index={index}
                            onRenderItem={onRenderItem}
                        />
                    ))}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}

export function Combobox({
    id,
    trigger,
    searchPattern,
    onSelectItem,
    controlled,
    maxSuggestions,
    filter,
    sort,
    disabled: _disabled,
    ...props
}: ComboboxProps) {
    const storeItems = useComboboxSelectors.items();
    const disabled = _disabled ?? (storeItems.length === 0 && !props.items?.length);
    const focusedEditorId = useEventEditorSelectors.focus?.();
    const combobox = useComboboxControls();
    const activeId = useComboboxSelectors.activeId();
    const selectionDefined = useEditorSelector((editor) => !!editor.selection, []);
    const editorId = usePlateSelectors().id();

    useEffect(() => {
        comboboxActions.setComboboxById({
            id,
            trigger,
            searchPattern,
            controlled,
            onSelectItem,
            maxSuggestions,
            filter,
            sort,
        });
    }, [id, trigger, searchPattern, controlled, onSelectItem, maxSuggestions, filter, sort]);

    if (!combobox || !selectionDefined || focusedEditorId !== editorId || activeId !== id || disabled) {
        return null;
    }
    return <ComboboxContent combobox={combobox} {...props} />;
}
