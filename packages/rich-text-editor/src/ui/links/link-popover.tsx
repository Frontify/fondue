/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Checkbox, Flyout, Label, TextInput } from '@frontify/fondue-components';
import {
    type CompositionEvent,
    type FormEvent,
    type KeyboardEvent,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';

import { SessionContext } from '#/bridge/hooks';
import { useEditorOverlay } from '#/bridge/overlays';
import { hrefPolicyOf } from '#/definition';
import { checkHref, type ContentModel, type HrefPolicy } from '#/model';
import { compiledModel } from '#/model/compile';
import { passesToBrowser } from '#/runtime/keys';
import { linkAt } from '#/runtime/links';
import { type EditorRuntime } from '#/runtime/runtime';
import { suggestionOptionId } from '#/runtime/suggestions/plugin';
import { type ReferenceValue, type SelectionHandle, type SessionToken } from '#/runtime/types';
import { Listbox } from '#/ui/suggestions/listbox';

import { type Destination, destinationsOf, withScheme } from './destination';
import { rangeAnchor } from './range-anchor';
import styles from './styles/links.module.scss';

/** The command the popover runs. */
export const SET_LINK = 'link.set';
// As the mention list waits, so one search runs once the author pauses.
const SEARCH_DELAY_MS = 200;
// Safari sends the Enter that confirms a composition after `compositionend`, as ProseMirror's own guard has it.
const COMPOSITION_ENTER_MS = 500;

/** The link popover's strings, in the UI locale. */
export interface LinkPopoverStrings {
    readonly title: string;
    readonly destination: string;
    readonly text: string;
    readonly newWindow: string;
    readonly style: string;
    readonly noStyle: string;
    readonly invalid: string;
    readonly removed: string;
    readonly insertNew: string;
    readonly results: string;
    readonly apply: string;
}

/** A presentation style the Style select offers. */
export interface LinkStyleOption {
    readonly id: string;
    readonly label: string;
}

/** What searching internal destinations needs: the host's reference service and the resource types the feature names. */
export interface DestinationSearch {
    readonly service: {
        search(
            request: { readonly query: string; readonly resourceTypes: readonly string[]; readonly cursor: null },
            context: { readonly signal: AbortSignal; readonly session: SessionToken },
        ): Promise<{ readonly items: readonly ReferenceValue[] }>;
    };
    readonly resourceTypes: readonly string[];
}

interface Initial {
    readonly href: string;
    readonly text: string;
    readonly openInNewWindow: boolean;
    readonly styleId: string;
    /** The field that takes focus: the text at a caret outside a link, else the destination. */
    readonly focus: 'text' | 'destination';
    /** The whole link the popover edits, which it anchors to. */
    readonly link: { readonly from: number; readonly to: number } | undefined;
}

const textOf = (value: unknown): string => (typeof value === 'string' ? value : '');

/** The options of the `links` feature the model installs: its URL policy and the resource types its popover searches. */
export const linkOptions = (
    model: ContentModel,
): { readonly policy: HrefPolicy | undefined; readonly resourceTypes: readonly string[] } => {
    const feature = compiledModel(model).features.find((item) => item.id === 'links');
    if (feature === undefined) {
        return { policy: undefined, resourceTypes: [] };
    }
    const { resourceTypes } = feature.options;
    return {
        policy: hrefPolicyOf(feature.options),
        resourceTypes: Array.isArray(resourceTypes)
            ? resourceTypes.filter((type): type is string => typeof type === 'string')
            : [],
    };
};

/** The link at the selection, or the selected text of one block for a new link. */
const initialOf = (runtime: EditorRuntime | undefined): Initial => {
    const empty: Initial = { href: '', text: '', openInNewWindow: false, styleId: '', focus: 'text', link: undefined };
    if (runtime === undefined) {
        return empty;
    }
    const { state } = runtime;
    const link = linkAt(state);
    if (link !== undefined) {
        return {
            href: textOf(link.attrs.href),
            text: link.text,
            openInNewWindow: link.attrs.openInNewWindow === true,
            styleId: textOf(link.attrs.styleId),
            focus: 'destination',
            link: { from: link.from, to: link.to },
        };
    }
    const { selection } = state;
    if (selection.empty) {
        return empty;
    }
    let text = '';
    if (selection.$from.sameParent(selection.$to)) {
        text = state.doc.textBetween(selection.from, selection.to);
    }
    return { ...empty, text, focus: 'destination' };
};

const capture = (runtime: EditorRuntime | undefined): SelectionHandle | undefined => {
    const captured = runtime?.handle.captureTarget({ purpose: 'format', onIntersectingEdit: 'invalidate' });
    if (captured === undefined || captured.status !== 'captured') {
        return undefined;
    }
    return captured.target;
};

const wrapped = (index: number, length: number): number => ((index % length) + length) % length;

/**
 * The link popover: a non-modal `Flyout` on the link or the selection with the destination, the visible text, "Open in
 * new window" and, when the presentation has link styles, a Style select, prefilled from the link at the selection.
 * Apply runs `link.set` at the target captured on open; a destination with no scheme that names a host gets `https://`,
 * and one that fails the URL check keeps the popover open with the error on the field. When the linked text was removed
 * meanwhile, Insert as new link inserts the visible text as a linked run at the selection. With `search`, typing in the
 * destination lists matching internal destinations that carry a checked `href`; picking one links to it.
 */
export const LinkPopover = ({
    policy,
    search,
    linkStyles,
    strings,
    testId,
    opener,
    onClose,
}: {
    /** The `links` options that narrow the URL check. */
    readonly policy: HrefPolicy | undefined;
    readonly search: DestinationSearch | undefined;
    readonly linkStyles: readonly LinkStyleOption[];
    readonly strings: LinkPopoverStrings;
    readonly testId: string;
    /** The element that had focus when the popover opened, such as the toolbar button, which a dismissal returns focus to. */
    readonly opener: Element | null;
    readonly onClose: () => void;
}) => {
    const runtime = useContext(SessionContext);
    const [open, setOpen] = useState(true);
    const [initial] = useState(() => initialOf(runtime));
    const [target] = useState(() => capture(runtime));
    const [href, setHref] = useState(initial.href);
    const [text, setText] = useState(initial.text);
    const [newWindow, setNewWindow] = useState(initial.openInNewWindow);
    const [styleId, setStyleId] = useState(initial.styleId);
    const [problem, setProblem] = useState<'invalid' | 'removed' | undefined>(undefined);
    // Each rejected Apply, after whose error renders focus moves to the field that holds it.
    const [rejections, setRejections] = useState(0);
    const [typed, setTyped] = useState(false);
    // The results of the last finished search, with the query they answer, so a changed query shows none of them.
    const [found, setFound] = useState<{ readonly query: string; readonly items: readonly Destination[] }>({
        query: '',
        items: [],
    });
    const [index, setIndex] = useState(0);
    const destinationRef = useRef<HTMLInputElement | null>(null);
    const textRef = useRef<HTMLInputElement | null>(null);
    const composedAtRef = useRef(Number.NEGATIVE_INFINITY);
    const destinationId = useId();
    const textId = useId();
    const newWindowId = useId();
    const styleFieldId = useId();
    const errorId = useId();
    const listId = useId();
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };
    const overlay = useEditorOverlay(open, close);
    const dismiss = (next: boolean) => {
        if (!next) {
            overlay.returnFocusTo(opener);
        }
        overlay.onOpenChange(next);
    };
    const [anchor] = useState(() => {
        if (initial.link === undefined) {
            return overlay.anchor;
        }
        return rangeAnchor(() => runtime?.view, initial.link);
    });
    useEffect(
        () => () => {
            if (target !== undefined) {
                runtime?.handle.releaseTarget(target);
            }
        },
        [runtime, target],
    );
    useEffect(() => {
        if (rejections > 0) {
            destinationRef.current?.focus();
        }
    }, [rejections]);
    const query = href.trim();
    const results = typed && found.query === query ? found.items : [];
    useEffect(() => {
        if (search === undefined || runtime === undefined || !typed || query === '') {
            return undefined;
        }
        const controller = new AbortController();
        const lookUp = async () => {
            const context = { signal: controller.signal, session: runtime.handle.getSummary().session };
            let items: readonly Destination[] = [];
            try {
                const page = await search.service.search(
                    { query, resourceTypes: search.resourceTypes, cursor: null },
                    context,
                );
                items = destinationsOf(page.items, policy);
            } catch {
                items = [];
            }
            if (!controller.signal.aborted) {
                setFound({ query, items });
                setIndex(0);
            }
        };
        const timer = setTimeout(() => {
            lookUp().catch(() => undefined);
        }, SEARCH_DELAY_MS);
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [search, runtime, typed, query, policy]);
    const reject = (next: 'invalid' | 'removed') => {
        setProblem(next);
        setRejections((count) => count + 1);
    };
    /** Runs `link.set`, at the captured target unless `here`, with `fallback` as the text when none is typed. */
    const run = (destination: string, here: boolean, fallback = '') => {
        if (runtime === undefined) {
            return;
        }
        const value = {
            href: destination,
            text: text === '' ? fallback : text,
            openInNewWindow: newWindow,
            styleId: styleId === '' ? null : styleId,
        };
        let options: { readonly target: SelectionHandle } | undefined;
        if (!here && target !== undefined) {
            options = { target };
        }
        const result = runtime.handle.execute(SET_LINK, value, options);
        if (result.status === 'rejected') {
            reject(result.code === 'target-invalid' ? 'removed' : 'invalid');
            return;
        }
        overlay.returnFocusTo(null);
        close(false);
    };
    const checked = () => {
        const result = checkHref(withScheme(href), policy);
        // An empty destination parses as the page itself, which is no link.
        if (!result.ok || result.href === '') {
            reject('invalid');
            return undefined;
        }
        return result.href;
    };
    const apply = (event: FormEvent) => {
        event.preventDefault();
        const destination = checked();
        if (destination !== undefined) {
            run(destination, false);
        }
    };
    const insertNew = () => {
        const destination = checked();
        if (destination !== undefined) {
            run(destination, true);
        }
    };
    const pick = (position: number) => {
        const result = results[position];
        if (result !== undefined) {
            run(result.href, false, result.label);
        }
    };
    const shown = results.length > 0;
    const onDestinationKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (passesToBrowser(event.nativeEvent) || !shown) {
            return;
        }
        if (event.key === 'Enter' && event.timeStamp - composedAtRef.current < COMPOSITION_ENTER_MS) {
            composedAtRef.current = Number.NEGATIVE_INFINITY;
            return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setIndex(wrapped(index + (event.key === 'ArrowDown' ? 1 : -1), results.length));
            return;
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            pick(index);
        }
    };
    // Fondue's `TextInput` passes props it does not declare on to its `input`, and declares no `role` or composition events.
    let combobox = {};
    if (search !== undefined) {
        const active = results[index];
        combobox = {
            role: 'combobox',
            'aria-autocomplete': 'list',
            'aria-expanded': shown,
            'aria-controls': shown ? listId : undefined,
            'aria-activedescendant': active === undefined ? undefined : suggestionOptionId(listId, active.key),
            onCompositionEnd: (event: CompositionEvent<HTMLInputElement>) => {
                composedAtRef.current = event.timeStamp;
            },
        };
    }
    let described: { readonly 'aria-describedby'?: string } = {};
    if (problem === 'invalid') {
        described = { 'aria-describedby': errorId };
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
                    <form className={styles.form} onSubmit={apply} noValidate>
                        <Label htmlFor={destinationId}>{strings.destination}</Label>
                        <TextInput
                            {...combobox}
                            {...described}
                            ref={destinationRef}
                            id={destinationId}
                            type="text"
                            value={href}
                            status={problem === 'invalid' ? 'error' : 'neutral'}
                            aria-errormessage={errorId}
                            autoComplete="off"
                            spellCheck={false}
                            onChange={(event) => {
                                setHref(event.target.value);
                                setTyped(true);
                                if (problem === 'invalid') {
                                    setProblem(undefined);
                                }
                            }}
                            onKeyDown={onDestinationKey}
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
                        {problem === 'invalid' && (
                            <p id={errorId} role="alert" className={styles.error}>
                                {strings.invalid}
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
                            <>
                                <Label htmlFor={styleFieldId}>{strings.style}</Label>
                                <select
                                    id={styleFieldId}
                                    value={styleId}
                                    onChange={(event) => setStyleId(event.target.value)}
                                >
                                    <option value="">{strings.noStyle}</option>
                                    {linkStyles.map((style) => (
                                        <option key={style.id} value={style.id}>
                                            {style.label}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                        {problem === 'removed' && (
                            <div role="alert" className={styles.removed}>
                                <p className={styles.error}>{strings.removed}</p>
                                <Button emphasis="default" onPress={insertNew}>
                                    {strings.insertNew}
                                </Button>
                            </div>
                        )}
                        <div className={styles.actions}>
                            <Button type="submit" emphasis="strong">
                                {strings.apply}
                            </Button>
                        </div>
                    </form>
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>
    );
};
