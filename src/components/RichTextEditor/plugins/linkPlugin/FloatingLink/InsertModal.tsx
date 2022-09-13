/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonSize, ButtonStyle } from '@components/Button/Button';
import { Checkbox, CheckboxState } from '@components/Checkbox';
import { FormControl } from '@components/FormControl';
import { TextInput } from '@components/TextInput';
import { IconCheckMark } from '@foundation/Icon';
import {
    floatingLinkActions,
    submitFloatingLink,
    useEditorRef,
    useFloatingLinkNewTabInput,
    useFloatingLinkTextInput,
    useFloatingLinkUrlInput,
    useHotkeys,
} from '@udecode/plate';
import React, { useState } from 'react';

export const InsertModal = () => {
    const editor = useEditorRef();
    const urlHtmlProps = useFloatingLinkUrlInput({});
    const textHtmlProps = useFloatingLinkTextInput({});
    const newTabHtmlProps = useFloatingLinkNewTabInput({});

    const [, setUrlValue] = useState<string>((urlHtmlProps.defaultValue as string) || '');
    const [, setTextValue] = useState<string>((textHtmlProps.defaultValue as string) || '');
    const [, setNewTabValue] = useState<boolean>((newTabHtmlProps.checked as boolean) || false);

    const hasValues = () => urlHtmlProps.defaultValue !== '' && textHtmlProps.defaultValue !== '';

    const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent | undefined) => {
        if (!hasValues()) {
            return;
        }
        if (submitFloatingLink(editor)) {
            e?.preventDefault();
        }
    };

    useHotkeys(
        'enter',
        (e) => {
            submit(e);
        },
        {
            enableOnTags: ['INPUT'],
        },
        [],
    );

    return (
        <div data-test-id="floating-link-insert" className="tw-bg-white tw-rounded tw-shadow tw-p-7 tw-min-w-[400px]">
            <FormControl
                label={{
                    children: 'Text',
                    htmlFor: 'linkText',
                    required: true,
                }}
            >
                <TextInput
                    id="linkText"
                    value={textHtmlProps.defaultValue as string}
                    placeholder="Link Text"
                    onChange={(val) => {
                        setTextValue(val);
                        textHtmlProps.onChange?.({
                            target: {
                                value: val,
                            },
                        } as any);
                    }}
                />
            </FormControl>
            <div className="tw-pt-5">
                <FormControl
                    label={{
                        children: 'URL',
                        htmlFor: 'url',
                        required: true,
                    }}
                >
                    <TextInput
                        id="url"
                        value={urlHtmlProps.defaultValue as string}
                        placeholder="https://example.com"
                        onChange={(val) => {
                            setUrlValue(val);
                            urlHtmlProps.onChange?.({
                                target: {
                                    value: val,
                                },
                            } as any);
                        }}
                    />
                </FormControl>
            </div>
            <div className="tw-pt-5">
                <Checkbox
                    value="new-tab"
                    label="Open in new tab"
                    state={newTabHtmlProps.checked ? CheckboxState.Checked : CheckboxState.Unchecked}
                    onChange={(val) => {
                        setNewTabValue(val);
                        newTabHtmlProps.onChange?.({
                            target: {
                                checked: val,
                            },
                        } as any);
                    }}
                />
            </div>
            <div className="tw-mt-3">
                <div className={'tw-pt-5 tw-flex tw-gap-x-3 tw-justify-end tw-border-t tw-border-t-black-10'}>
                    <Button
                        onClick={(e) => {
                            floatingLinkActions.hide();
                        }}
                        size={ButtonSize.Medium}
                        style={ButtonStyle.Secondary}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={(e) => submit(e)}
                        size={ButtonSize.Medium}
                        style={ButtonStyle.Primary}
                        icon={<IconCheckMark />}
                        disabled={!hasValues()}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};
