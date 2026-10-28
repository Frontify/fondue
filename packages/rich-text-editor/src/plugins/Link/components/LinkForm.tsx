/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Label, TextInput } from '@frontify/fondue-components';

import { Listbox } from '#/bridge/pluginApi/define';

import { type LinkPopoverState } from '../hooks/useLinkPopoverState';
import styles from '../styles/links.module.scss';

import { NewWindowOption } from './NewWindowOption';
import { RemovedNotice } from './RemovedNotice';
import { StyleSelect } from './StyleSelect';

export type LinkFormProps = {
    state: LinkPopoverState;
    destinationId: string;
    textId: string;
    newWindowId: string;
    errorId: string;
    removedId: string;
    formId: string;
};

/** The destination, the visible text, the window option and the style of the link being edited. */
export const LinkForm = ({ state, destinationId, textId, newWindowId, errorId, removedId, formId }: LinkFormProps) => {
    const {
        strings,
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
        destinationRef,
        textRef,
        onChange,
        listId,
        testId,
        overlay,
    } = state;
    let described: { 'aria-describedby'?: string } = {};
    if (invalid) {
        described = { 'aria-describedby': errorId };
    } else if (problem === 'removed') {
        described = { 'aria-describedby': removedId };
    }

    return (
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
            <NewWindowOption
                id={newWindowId}
                label={strings.newWindow}
                value={newWindow}
                onToggle={() => setNewWindow((previous) => !previous)}
            />
            {linkStyles.length > 0 && (
                <StyleSelect
                    strings={strings}
                    styles={linkStyles}
                    value={styleId}
                    onChange={setStyleId}
                    container={overlay.container}
                />
            )}
            {problem === 'removed' && <RemovedNotice id={removedId} strings={strings} onInsert={insertNew} />}
            {problem === 'failed' && <p className={styles.error}>{strings.failed}</p>}
        </form>
    );
};

LinkForm.displayName = 'LinkForm';
