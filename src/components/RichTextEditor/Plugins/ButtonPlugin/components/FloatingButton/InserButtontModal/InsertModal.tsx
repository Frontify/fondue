/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { CSSProperties, FC, ReactNode, useState } from 'react';
import { IconCheckMark } from '@foundation/Icon';
import { Button } from '@components/Button/Button';
import { Checkbox } from '@components/Checkbox';
import { FormControl } from '@components/FormControl';
import { TextInput } from '@components/TextInput';
import { useInsertModal } from './useInsertModal';
import { ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';

export const InsertModal = () => {
    const {
        state,
        onTextChange,
        onButtonStyleChange,
        onUrlChange,
        onToggleTab,
        onCancel,
        onSave,
        isValidUrlOrEmpty,
        hasValues,
    } = useInsertModal();

    const { designTokens } = useRichTextEditorContext();

    return (
        <div data-test-id="floating-button-insert" className="tw-bg-white tw-rounded tw-shadow tw-p-7 tw-min-w-[400px]">
            <FormControl
                label={{
                    children: 'Button Text',
                    htmlFor: 'linkText',
                    required: true,
                }}
            >
                <TextInput id="linkText" value={state.text} placeholder="Link Text" onChange={onTextChange} />
            </FormControl>
            <div className="tw-pt-5">
                <FormControl
                    label={{
                        children: 'Button Style',
                        htmlFor: 'buttonStyle',
                        required: true,
                    }}
                >
                    <HoverableButton
                        id="primary"
                        styles={designTokens.button_primary}
                        isActive={state.buttonStyle === 'primary'}
                        onClick={() => onButtonStyleChange('primary')}
                    >
                        {state.text || 'Primary Button'}
                    </HoverableButton>

                    <HoverableButton
                        id="secondary"
                        styles={designTokens.button_secondary}
                        isActive={state.buttonStyle === 'secondary'}
                        onClick={() => onButtonStyleChange('secondary')}
                    >
                        {state.text || 'Secondary Button'}
                    </HoverableButton>

                    <HoverableButton
                        id="tertiary"
                        styles={designTokens.button_tertiary}
                        isActive={state.buttonStyle === 'tertiary'}
                        onClick={() => onButtonStyleChange('tertiary')}
                    >
                        {state.text || 'Tertiary Button'}
                    </HoverableButton>
                </FormControl>
            </div>
            <div className="tw-pt-5">
                <FormControl
                    label={{
                        children: 'URL',
                        htmlFor: 'url',
                        required: true,
                    }}
                >
                    <TextInput id="url" value={state.url} placeholder="https://example.com" onChange={onUrlChange} />
                </FormControl>
                {!isValidUrlOrEmpty() && <div className="tw-text-red-65 tw-mt-3">Please enter a valid URL.</div>}
            </div>
            <div className="tw-pt-5">
                <Checkbox value="new-tab" label="Open in new tab" state={state.newTab} onChange={onToggleTab} />
            </div>
            <div className="tw-mt-3">
                <div className={'tw-pt-5 tw-flex tw-gap-x-3 tw-justify-end tw-border-t tw-border-t-black-10'}>
                    <Button
                        onClick={onCancel}
                        size={ButtonSize.Medium}
                        style={ButtonStyle.Default}
                        emphasis={ButtonEmphasis.Default}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSave}
                        size={ButtonSize.Medium}
                        icon={<IconCheckMark />}
                        disabled={!isValidUrlOrEmpty() || !hasValues}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

type Props = {
    id: string;
    styles?: CSSProperties & { hover?: CSSProperties };
    isActive: boolean;
    onClick: () => void;
    children: ReactNode;
};

const HoverableButton: FC<Props> = ({ id, styles, isActive, onClick, children }) => {
    const [hovered, setHovered] = useState(false);
    const getStyles = () => (styles && styles.hover && hovered ? { ...styles, ...styles.hover } : styles);

    return (
        <button
            data-test-id={`floating-button-insert-${id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            style={getStyles()}
            className={
                isActive ? 'tw-outline tw-outline-1 tw-outline-violet-60 tw-outline-offset-2 tw-w-fit' : 'tw-w-fit'
            }
        >
            {children}
        </button>
    );
};
