/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Checkbox, Dropdown, Flyout, Label, TextInput } from '@frontify/fondue-components';
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

import { useAnnounce } from '#/bridge/announcer';
import { SessionContext } from '#/bridge/hooks';
import { useEditorOverlay } from '#/bridge/overlays';
import { checkHref, type ContentModel, type HrefPolicy } from '#/model';
import { compiledModel } from '#/model/compile';
import { hrefPolicyOf } from '#/model/href';
import { passesToBrowser } from '#/runtime/keys';
import { linkAt } from '#/runtime/links';
import { type EditorRuntime } from '#/runtime/runtime';
import { suggestionOptionId } from '#/runtime/suggestions/plugin';
import { type ReferenceValue, type SelectionHandle, type SessionToken } from '#/runtime/types';
import { Listbox } from '#/ui/suggestions/listbox';
import { CheckedSlot } from '#/ui/toolbar/item';

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
    /** The schemes `allowedSchemes` lists, joined in the UI locale, which a link must start with. */
    readonly schemesAllowed: (schemes: string) => string;
    /** The hosts `allowedHosts` lists, joined in the UI locale, which a link must go to. */
    readonly hostsAllowed: (hosts: string) => string;
    /** Apply could not run for another reason, such as a read-only editor. */
    readonly failed: string;
    readonly removed: string;
    readonly insertNew: string;
    readonly results: string;
    /** What the live region says for the active destination, such as `Brand colors, 1 of 3`. */
    readonly result: (label: string, position: number, total: number) => string;
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

/**
 * The target Apply runs at: the whole link the popover edits, which maps through edits inside it and is invalid once
 * its text is removed, else the selection.
 */
const capture = (runtime: EditorRuntime | undefined, link: Initial['link']): SelectionHandle | undefined => {
    let captured: ReturnType<NonNullable<EditorRuntime>['captureRange']> | undefined;
    if (link === undefined) {
        captured = runtime?.handle.captureTarget({ purpose: 'format', onIntersectingEdit: 'invalidate' });
    } else {
        captured = runtime?.captureRange(link, { purpose: 'format', onIntersectingEdit: 'map' });
    }
    if (captured === undefined || captured.status !== 'captured') {
        return undefined;
    }
    return captured.target;
};

const wrapped = (index: number, length: number): number => ((index % length) + length) % length;

/** Why Apply did not link: a destination the check or the policy refuses, linked text removed meanwhile, or another refusal. */
type Problem = 'invalid' | 'scheme' | 'host' | 'removed' | 'failed';
// The problems of the destination itself, which mark the field invalid.
const FIELD_PROBLEMS: ReadonlySet<Problem | undefined> = new Set(['invalid', 'scheme', 'host']);

/** The policy's list in the UI locale, such as `https: or mailto:`. */
const listed = (items: readonly string[], lang: string | undefined): string =>
    new Intl.ListFormat(lang, { type: 'disjunction' }).format(items);

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
    lang,
    opener,
    onClose,
}: {
    /** The `links` options that narrow the URL check. */
    readonly policy: HrefPolicy | undefined;
    readonly search: DestinationSearch | undefined;
    readonly linkStyles: readonly LinkStyleOption[];
    readonly strings: LinkPopoverStrings;
    readonly testId: string;
    /** The UI locale, which lists the allowed schemes and hosts. */
    readonly lang: string | undefined;
    /** The element that had focus when the popover opened, such as the toolbar button, which a dismissal returns focus to. */
    readonly opener: Element | null;
    readonly onClose: () => void;
}) => {
    const runtime = useContext(SessionContext);
    const [open, setOpen] = useState(true);
    const [initial] = useState(() => initialOf(runtime));
    const [target] = useState(() => capture(runtime, initial.link));
    const [href, setHref] = useState(initial.href);
    const [text, setText] = useState(initial.text);
    const [newWindow, setNewWindow] = useState(initial.openInNewWindow);
    const [styleId, setStyleId] = useState(initial.styleId);
    const [problem, setProblem] = useState<Problem | undefined>(undefined);
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
    const styleLabelId = useId();
    const styleValueId = useId();
    const errorId = useId();
    const removedId = useId();
    const listId = useId();
    const formId = useId();
    const announce = useAnnounce();
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
    const reject = (next: Problem) => {
        setProblem(next);
        if (next !== 'failed') {
            setRejections((count) => count + 1);
        }
    };
    /** Runs `link.set`, at the captured target unless `here`, with `fallback` as the text when none is typed. */
    const run = (destination: string, here: boolean, fallback = '') => {
        if (runtime === undefined) {
            return;
        }
        const visible = text === '' ? fallback : text;
        // Text the author left as it opened sends none, so what was typed in the link meanwhile stays; a new link inserts it.
        const unchanged = !here && initial.text !== '' && visible === initial.text;
        const value = {
            href: destination,
            ...(unchanged ? {} : { text: visible }),
            openInNewWindow: newWindow,
            styleId: styleId === '' ? null : styleId,
        };
        let options: { readonly target: SelectionHandle } | undefined;
        if (!here && target !== undefined) {
            options = { target };
        }
        const result = runtime.handle.execute(SET_LINK, value, options);
        if (result.status === 'rejected') {
            if (result.code === 'target-invalid') {
                reject('removed');
            } else if (result.code === 'invalid-payload') {
                reject('invalid');
            } else {
                reject('failed');
            }
            return;
        }
        overlay.returnFocusTo(null);
        close(false);
    };
    const checked = () => {
        const destination = withScheme(href);
        const result = checkHref(destination, policy);
        // An empty destination parses as the page itself, which is no link.
        if (result.ok && result.href !== '') {
            return result.href;
        }
        const unchecked = checkHref(destination);
        if (result.ok || !unchecked.ok || unchecked.href === '') {
            reject('invalid');
        } else if (result.code === 'host-not-allowed') {
            reject('host');
        } else {
            reject('scheme');
        }
        return undefined;
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
    // The field names the active destination with `aria-activedescendant`, which a screen reader does not follow to a
    // list outside the field, so the editor's live region says it too.
    let spoken = '';
    const activeResult = results[index];
    if (activeResult !== undefined) {
        spoken = strings.result(activeResult.label, index + 1, results.length);
    }
    useEffect(() => {
        if (spoken !== '') {
            announce(spoken);
        }
    }, [announce, spoken]);
    const onDestinationKey = (event: KeyboardEvent<HTMLInputElement>) => {
        // Chromium confirms a composition with an Enter of its own, so only Safari's later Enter is left to swallow.
        if (event.key === 'Enter' && event.nativeEvent.isComposing) {
            composedAtRef.current = Number.NEGATIVE_INFINITY;
        }
        if (passesToBrowser(event.nativeEvent)) {
            return;
        }
        // The Enter that confirms a composition keeps its candidate in the field and submits nothing.
        if (event.key === 'Enter' && event.timeStamp - composedAtRef.current < COMPOSITION_ENTER_MS) {
            composedAtRef.current = Number.NEGATIVE_INFINITY;
            event.preventDefault();
            return;
        }
        if (!shown) {
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
    let combobox: Readonly<Record<string, unknown>> = {
        onCompositionEnd: (event: CompositionEvent<HTMLInputElement>) => {
            composedAtRef.current = event.timeStamp;
        },
    };
    if (search !== undefined) {
        combobox = {
            ...combobox,
            role: 'combobox',
            'aria-autocomplete': 'list',
            'aria-expanded': shown,
            'aria-controls': shown ? listId : undefined,
            'aria-activedescendant':
                activeResult === undefined ? undefined : suggestionOptionId(listId, activeResult.key),
        };
    }
    const invalid = FIELD_PROBLEMS.has(problem);
    let described: { readonly 'aria-describedby'?: string } = {};
    if (invalid) {
        described = { 'aria-describedby': errorId };
    } else if (problem === 'removed') {
        described = { 'aria-describedby': removedId };
    }
    let message = strings.invalid;
    if (problem === 'scheme') {
        message = strings.schemesAllowed(
            listed(
                (policy?.allowedSchemes ?? []).map((scheme) => `${scheme}:`),
                lang,
            ),
        );
    } else if (problem === 'host') {
        message = strings.hostsAllowed(listed(policy?.allowedHosts ?? [], lang));
    }
    const chosenStyle = linkStyles.find((style) => style.id === styleId);
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
                            onChange={(event) => {
                                setHref(event.target.value);
                                setTyped(true);
                                if (invalid) {
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
                        {invalid && (
                            <p id={errorId} role="alert" className={styles.error}>
                                {message}
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
                                <Label id={styleLabelId} htmlFor={styleFieldId}>
                                    {strings.style}
                                </Label>
                                <Dropdown.Root>
                                    <Dropdown.Trigger asChild>
                                        <Button
                                            // Fondue's `Button` passes props it does not declare on to its `button`.
                                            {...{
                                                id: styleFieldId,
                                                'aria-labelledby': `${styleLabelId} ${styleValueId}`,
                                            }}
                                            emphasis="default"
                                        >
                                            <span id={styleValueId}>{chosenStyle?.label ?? strings.noStyle}</span>
                                        </Button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content container={overlay.container}>
                                        {[{ id: '', label: strings.noStyle }, ...linkStyles].map((style) => (
                                            <Dropdown.Item
                                                key={style.id}
                                                // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
                                                {...{ role: 'menuitemradio', 'aria-checked': style.id === styleId }}
                                                onSelect={() => setStyleId(style.id)}
                                            >
                                                {style.label}
                                                {style.id === styleId && <CheckedSlot />}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Content>
                                </Dropdown.Root>
                            </>
                        )}
                        {problem === 'removed' && (
                            <div className={styles.removed}>
                                <p id={removedId} role="alert" className={styles.error}>
                                    {strings.removed}
                                </p>
                                <Button emphasis="default" onPress={insertNew}>
                                    {strings.insertNew}
                                </Button>
                            </div>
                        )}
                        {problem === 'failed' && (
                            <p role="alert" className={styles.error}>
                                {strings.failed}
                            </p>
                        )}
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
