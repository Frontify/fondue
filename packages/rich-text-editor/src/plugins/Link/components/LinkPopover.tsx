/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Checkbox, Dropdown, Flyout, Label, TextInput } from '@frontify/fondue-components';
import { useId } from 'react';

import { CheckedSlot, Listbox } from '#/bridge/pluginApi/define';
import { type OverlayProps, type useEditorOverlay } from '#/bridge/pluginApi/plugin';

import { type LinkInitial, type LinkPopoverStrings, type LinkStyleOption } from '../helpers/linkPopoverModel';
import { useLinkPopoverState } from '../hooks/useLinkPopoverState';
import styles from '../styles/links.module.scss';

export {
    type LinkInitial,
    linkInitialOf,
    type LinkPopoverStrings,
    linkPopoverStrings,
    type LinkStyleOption,
    linkStylesOf,
    SET_LINK,
} from '../helpers/linkPopoverModel';

/** The Style select, with "No style" first. */
const StyleSelect = ({
    strings,
    styles: options,
    value,
    onChange,
    container,
}: {
    strings: LinkPopoverStrings;
    styles: readonly LinkStyleOption[];
    value: string;
    onChange: (styleId: string) => void;
    container: ReturnType<typeof useEditorOverlay>['container'];
}) => {
    const fieldId = useId();
    const labelId = useId();
    const valueId = useId();
    const chosen = options.find((style) => style.id === value);
    let label = strings.noStyle;
    if (chosen !== undefined) {
        label = chosen.label;
    }

    return (
        <>
            <Label id={labelId} htmlFor={fieldId}>
                {strings.style}
            </Label>
            <Dropdown.Root>
                <Dropdown.Trigger asChild>
                    <Button
                        // Fondue's `Button` passes props it does not declare on to its `button`.
                        {...{
                            id: fieldId,
                            'aria-labelledby': `${labelId} ${valueId}`,
                        }}
                        emphasis="default"
                    >
                        <span id={valueId}>{label}</span>
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Content container={container}>
                    {[{ id: '', label: strings.noStyle }, ...options].map((style) => (
                        <Dropdown.Item
                            key={style.id}
                            // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
                            {...{ role: 'menuitemradio', 'aria-checked': style.id === value }}
                            onSelect={() => onChange(style.id)}
                        >
                            {style.label}
                            {style.id === value && <CheckedSlot />}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Content>
            </Dropdown.Root>
        </>
    );
};

/**
 * The link popover: a non-modal `Flyout` on the link or the selection with the destination, the visible text, "Open in
 * new window" and, when the presentation has link styles, a Style select, prefilled from the link at the selection.
 * Apply runs `link.set` at the target captured on open; a destination with no scheme that names a host gets `https://`,
 * and one that fails the URL check keeps the popover open with the error on the field. When the linked text was removed
 * meanwhile, Insert as new link inserts the visible text as a linked run at the selection. With `search`, typing in the
 * destination lists matching internal destinations that carry a checked `href`; picking one links to it.
 */
export const LinkPopover = (props: OverlayProps & { initial: LinkInitial }) => {
    const {
        initial,
        strings,
        testId,
        listId,
        overlay,
        open,
        dismiss,
        anchor,
        destinationRef,
        textRef,
        href,
        text,
        setText,
        newWindow,
        setNewWindow,
        styleId,
        setStyleId,
        linkStyles,
        problem,
        invalid,
        messageOf,
        apply,
        insertNew,
        results,
        index,
        setIndex,
        pick,
        shown,
        onKeyDown,
        combobox,
        onChange,
    } = useLinkPopoverState(props);
    const destinationId = useId();
    const textId = useId();
    const newWindowId = useId();
    const errorId = useId();
    const removedId = useId();
    const formId = useId();
    let described: { 'aria-describedby'?: string } = {};
    if (invalid) {
        described = { 'aria-describedby': errorId };
    } else if (problem === 'removed') {
        described = { 'aria-describedby': removedId };
    }

    return (
        <Flyout.Root open={open} onOpenChange={dismiss} virtualAnchor={anchor}>
            <Flyout.Content
                ref={overlay.contentRef}
                // Radix gives the content `role="dialog"`, which `Flyout` passes this name to.
                aria-label={strings.title}
                container={overlay.container}
                side="bottom"
                align="start"
                width="320px"
                data-test-id={`${testId}-link-popover`}
                onOpenAutoFocus={(event) => {
                    event.preventDefault();
                    (initial.focus === 'text' ? textRef : destinationRef).current?.focus();
                }}
            >
                <Flyout.Body>
                    <form id={formId} className={styles.form} onSubmit={apply} noValidate>
                        <Label htmlFor={destinationId}>{strings.destination}</Label>
                        <TextInput
                            {...combobox}
                            {...described}
                            ref={destinationRef}
                            id={destinationId}
                            type="text"
                            value={href}
                            status={invalid ? 'error' : 'neutral'}
                            aria-errormessage={errorId}
                            autoComplete="off"
                            spellCheck={false}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                        />
                        {shown && (
                            <Listbox
                                id={listId}
                                label={strings.results}
                                options={results.map(({ key, label }) => ({ key, label, glyph: null }))}
                                index={index}
                                onPick={pick}
                                onActivate={setIndex}
                                testId={`${testId}-link-results`}
                            />
                        )}
                        {invalid && (
                            <p id={errorId} className={styles.error}>
                                {messageOf(problem)}
                            </p>
                        )}
                        <Label htmlFor={textId}>{strings.text}</Label>
                        <TextInput
                            ref={textRef}
                            id={textId}
                            type="text"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                        />
                        <div className={styles.option}>
                            <Checkbox
                                id={newWindowId}
                                value={newWindow}
                                onChange={() => setNewWindow((previous) => !previous)}
                            />
                            <Label htmlFor={newWindowId}>{strings.newWindow}</Label>
                        </div>
                        {linkStyles.length > 0 && (
                            <StyleSelect
                                strings={strings}
                                styles={linkStyles}
                                value={styleId}
                                onChange={setStyleId}
                                container={overlay.container}
                            />
                        )}
                        {problem === 'removed' && (
                            <div className={styles.removed}>
                                <p id={removedId} className={styles.error}>
                                    {strings.removed}
                                </p>
                                <Button emphasis="default" onPress={insertNew}>
                                    {strings.insertNew}
                                </Button>
                            </div>
                        )}
                        {problem === 'failed' && <p className={styles.error}>{strings.failed}</p>}
                    </form>
                </Flyout.Body>
                <Flyout.Footer>
                    <Button type="submit" form={formId} emphasis="strong">
                        {strings.apply}
                    </Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>
    );
};
