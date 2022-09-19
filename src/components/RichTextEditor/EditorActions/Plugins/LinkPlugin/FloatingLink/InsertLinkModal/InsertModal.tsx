/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { IconCheckMark } from '@foundation/Icon';
import { Button } from '@components/Button/Button';
import { Checkbox } from '@components/Checkbox';
import { FormControl } from '@components/FormControl';
import { TextInput } from '@components/TextInput';
import { useInsertModal } from './useInsertModal';
import { ButtonPreset, ButtonSize } from '@components/Button';

export const InsertModal = () => {
    const { state, onTextChange, onUrlChange, onToggleTab, onCancel, onSave, isValidUrlOrEmpty, hasValues } =
        useInsertModal();

    return (
        <div data-test-id="floating-link-insert" className="tw-bg-white tw-rounded tw-shadow tw-p-7 tw-min-w-[400px]">
            <FormControl
                label={{
                    children: 'Text',
                    htmlFor: 'linkText',
                    required: true,
                }}
            >
                <TextInput id="linkText" value={state.text} placeholder="Link Text" onChange={onTextChange} />
            </FormControl>
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
                    <Button onClick={onCancel} size={ButtonSize.Medium} {...ButtonPreset.Secondary}>
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
