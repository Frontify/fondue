/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { CSSProperties, ReactElement, ReactNode, useState } from 'react';

import { FormControl } from '@components/FormControl';
import { useInsertModal } from './useInsertModal';
import { InsertModal } from '@components/RichTextEditor/Plugins/LinkPlugin/FloatingLink/InsertLinkModal';
import { useRichTextEditorContext } from '@components/RichTextEditor/context';

export const InsertButtonModal = () => {
    const modalProps = useInsertModal();
    const { state, onButtonStyleChange } = modalProps;
    const { styles } = useRichTextEditorContext();
    return (
        <InsertModal {...modalProps} testId="floating-button-insert">
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
                        styles={styles.buttonPrimary}
                        isActive={state.buttonStyle === 'primary'}
                        onClick={() => onButtonStyleChange('primary')}
                    >
                        {state.text || 'Primary Button'}
                    </HoverableButton>

                    <HoverableButton
                        id="secondary"
                        styles={styles.buttonSecondary}
                        isActive={state.buttonStyle === 'secondary'}
                        onClick={() => onButtonStyleChange('secondary')}
                    >
                        {state.text || 'Secondary Button'}
                    </HoverableButton>

                    <HoverableButton
                        id="tertiary"
                        styles={styles.buttonTertiary}
                        isActive={state.buttonStyle === 'tertiary'}
                        onClick={() => onButtonStyleChange('tertiary')}
                    >
                        {state.text || 'Tertiary Button'}
                    </HoverableButton>
                </FormControl>
            </div>
        </InsertModal>
    );
};

type Props = {
    id: string;
    styles?: CSSProperties & { hover?: CSSProperties };
    isActive: boolean;
    onClick: () => void;
    children: ReactNode;
};

const HoverableButton = ({ id, styles, isActive, onClick, children }: Props): ReactElement => {
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
