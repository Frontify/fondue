/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconCross, IconExclamationMarkTriangle } from '@frontify/fondue-icons';
import {
    forwardRef,
    useEffect,
    useRef,
    useState,
    type ChangeEventHandler,
    type CSSProperties,
    type FocusEventHandler,
    type ForwardedRef,
    type KeyboardEventHandler,
    type ReactElement,
    type ReactNode,
    type SyntheticEvent,
} from 'react';

import { useSyncRefs } from '#/hooks/useSyncRefs';

import styles from './styles/textarea.module.scss';

/**
 * @deprecated Use Textarea.Slot instead for custom actions
 */
export type ExtraAction = {
    icon: ReactElement;
    title: string;
    callback: () => void;
};

type Status = 'default' | 'loading' | 'success' | 'error';

type TextareaProps = {
    id?: string;
    /**
     * Slot content placed alongside the textarea. Use `Textarea.Slot` for left/right decorators or actions.
     */
    children?: ReactNode;
    /**
     * Enables browser autocomplete suggestions for the textarea.
     */
    autocomplete?: boolean;
    /**
     * When `true`, the textarea grows automatically as the user types, eliminating the need for manual resizing.
     */
    autosize?: boolean;
    /**
     * Shows a clear button that empties the textarea on click.
     */
    clearable?: boolean;
    /**
     * A React element rendered at the start of the textarea — typically an icon or label prefix.
     */
    decorator?: ReactElement;
    /**
     * The initial value for uncontrolled usage.
     */
    defaultValue?: string;
    /**
     * Prevents interaction and dims the textarea visually.
     * @default false
     */
    disabled?: boolean;
    /**
     * Collection of extra actions the input can preform
     * @deprecated Use Textarea.Slot instead for custom actions
     */
    extraActions?: ExtraAction[];
    /**
     * When `true`, the textarea receives focus automatically when the component mounts.
     */
    focusOnMount?: boolean;
    /**
     * The minimum number of visible text rows. Only applies when `autosize` is `false`.
     * @default 1
     */
    minRows?: number;
    /**
     * The maximum number of visible text rows before scrolling activates. Only applies when `autosize` is `true`.
     */
    maxRows?: number;
    /**
     * Callback fired when the textarea value changes.
     */
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    /**
     * Callback fired when the textarea loses focus.
     */
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
    /**
     * Callback fired when the textarea gains focus.
     */
    onFocus?: FocusEventHandler<HTMLTextAreaElement>;
    /**
     * Callback fired when a key is pressed inside the textarea.
     */
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
    /**
     * Callback fired specifically when the Enter key is pressed. Useful for submit-on-enter behavior.
     */
    onEnterPressed?: KeyboardEventHandler<HTMLTextAreaElement>;
    /**
     * Callback fired when a key is released inside the textarea.
     */
    onKeyUp?: KeyboardEventHandler<HTMLTextAreaElement>;
    /**
     * Callback fired when the user selects text inside the textarea.
     */
    onSelect?: (event: SyntheticEvent<HTMLTextAreaElement>) => void;
    /**
     * Marks the textarea as required for form validation.
     */
    required?: boolean;
    'data-test-id'?: string;
    /**
     * Text shown when the textarea is empty. Use it to hint at the expected input.
     */
    placeholder?: string;
    /**
     * Makes the textarea read-only — the value is visible but cannot be edited.
     */
    readOnly?: boolean;
    /**
     * When `true`, shows a drag handle for manual resizing.
     */
    resizable?: boolean;
    /**
     * When `false`, prevents the user from selecting text inside the textarea.
     * @default true
     */
    selectable?: boolean;
    /**
     * Conveys the validation state visually. `'success'` shows a checkmark, `'error'` shows a warning icon, `'loading'` shows a progress indicator.
     * @default 'default'
     */
    status?: Status;
    /**
     * The controlled value. Use together with `onChange` for controlled usage.
     */
    value?: string;
};

export const TextareaRoot = (
    {
        'data-test-id': dataTestId = 'fondue-textarea',
        autocomplete,
        autosize,
        children,
        clearable,
        decorator,
        defaultValue,
        disabled,
        extraActions,
        focusOnMount,
        minRows: rows = 1,
        maxRows,
        onEnterPressed,
        readOnly,
        resizable,
        selectable = true,
        status = 'default',
        value: inputValue,
        ...props
    }: TextareaProps,
    forwardedRef: ForwardedRef<HTMLTextAreaElement>,
) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const wasClicked = useRef(false);

    useSyncRefs<HTMLTextAreaElement>(ref, forwardedRef);

    const [value, setValue] = useState(inputValue ?? defaultValue ?? '');

    const hasTools = extraActions?.length !== undefined || clearable || ['success', 'error'].includes(status);

    const clear = () => {
        setValue('');
    };

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.key === 'Enter') {
            onEnterPressed?.(event);
        }
        props.onKeyDown?.(event);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(inputValue ?? defaultValue ?? '');
    }, [defaultValue, inputValue]);

    useEffect(() => {
        if (focusOnMount) {
            ref.current?.focus();
        }
    }, [focusOnMount]);

    return (
        <div
            className={styles.root}
            data-autosize={autosize}
            data-clearable={clearable}
            data-disabled={disabled || readOnly}
            data-has-decorator={decorator ? true : false}
            data-has-tools={hasTools}
            data-resizable={resizable}
            data-status={status}
            data-max-rows={!!maxRows}
            data-test-id={dataTestId}
            style={{ '--max-rows': `${maxRows}` } as CSSProperties}
        >
            {decorator ? <div className={styles.decorator}>{decorator}</div> : null}
            <div className={styles.textareaWrapper} data-replicated-value={value}>
                <textarea
                    {...props}
                    onMouseDown={(mouseEvent) => {
                        wasClicked.current = true;
                        mouseEvent.currentTarget.dataset.showFocusRing = 'false';
                    }}
                    onFocus={(focusEvent) => {
                        if (!wasClicked.current) {
                            focusEvent.target.dataset.showFocusRing = 'true';
                        }
                        props.onFocus?.(focusEvent);
                    }}
                    onBlur={(blurEvent) => {
                        blurEvent.target.dataset.showFocusRing = 'false';
                        wasClicked.current = false;
                        props.onBlur?.(blurEvent);
                    }}
                    autoComplete={autocomplete ? 'on' : 'off'}
                    className={styles.textarea}
                    disabled={disabled}
                    onKeyDown={handleKeyDown}
                    onInput={(event) => setValue(event.currentTarget.value)}
                    onSelect={(event) => {
                        if (!selectable) {
                            event.currentTarget.selectionStart = event.currentTarget.selectionEnd;
                        }
                    }}
                    readOnly={readOnly}
                    ref={ref}
                    rows={rows}
                    value={value}
                ></textarea>
            </div>
            {status === 'loading' && <div className={styles.loadingStatus} data-test-id={`${dataTestId}-loader`} />}
            {hasTools && (
                <div className={styles.tools}>
                    {status === 'success' && (
                        <div className={styles.success}>
                            <IconCheckMark size={20} />
                        </div>
                    )}
                    {status === 'error' && (
                        <div className={styles[status]}>
                            <IconExclamationMarkTriangle size={20} />
                        </div>
                    )}
                    {extraActions?.map(({ icon, title, callback }) => (
                        <button
                            className={styles.toolsButton}
                            disabled={disabled || readOnly}
                            key={title}
                            onClick={callback}
                            title={title}
                        >
                            {icon}
                        </button>
                    ))}
                    {clearable && (
                        <button className={styles.toolsButton} onClick={clear} disabled={disabled || readOnly}>
                            <IconCross size={20} fill="currentColor" />
                        </button>
                    )}
                </div>
            )}
            {children}
        </div>
    );
};
TextareaRoot.displayName = 'Textarea.Root';

export type TextareaSlotProps = {
    /**
     * The slot content — typically an icon, button, or other action.
     */
    children: ReactNode;
    /**
     * Controls where the slot appears. `'left'` places content at the start, `'right'` at the end of the textarea.
     */
    name?: 'left' | 'right';
    className?: string;
};

export const TextareaSlot = (
    { name, className, ...slotProps }: TextareaSlotProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div
            data-slot
            data-name={name}
            {...slotProps}
            ref={forwardedRef}
            className={[styles.slot, className].filter(Boolean).join(' ')}
        />
    );
};

TextareaSlot.displayName = 'Textarea.Slot';

const ForwardedRefTextareaRoot = forwardRef<HTMLTextAreaElement, TextareaProps>(TextareaRoot);
const ForwardedRefTextareaSlot = forwardRef<HTMLDivElement, TextareaSlotProps>(TextareaSlot);

// @ts-expect-error We support both single component (without slots) and compound components (with slots)
export const Textarea: typeof TextareaRoot & {
    Root: typeof ForwardedRefTextareaRoot;
    Slot: typeof ForwardedRefTextareaSlot;
} = ForwardedRefTextareaRoot;
Textarea.Root = ForwardedRefTextareaRoot;
Textarea.Slot = ForwardedRefTextareaSlot;
