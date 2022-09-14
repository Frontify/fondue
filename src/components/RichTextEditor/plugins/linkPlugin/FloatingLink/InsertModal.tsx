/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonSize, ButtonStyle } from '@components/Button/Button';
import { Checkbox, CheckboxState } from '@components/Checkbox';
import { FormControl } from '@components/FormControl';
import { LegacyLink } from '@components/RichTextEditor/components';
import { TextInput } from '@components/TextInput';
import { IconCheckMark } from '@foundation/Icon';
import {
    ELEMENT_LINK,
    LinkPlugin,
    PlateEditor,
    floatingLinkActions,
    floatingLinkSelectors,
    getAboveNode,
    getPluginOptions,
    submitFloatingLink,
    useEditorRef,
    useHotkeys,
} from '@udecode/plate';
import React, { useEffect, useState } from 'react';

const getLegacyUrl = (editor: PlateEditor) => {
    const legacyUrl = '';

    const linkNode = getAboveNode(editor, {
        match: { type: ELEMENT_LINK },
    });

    if (!Array.isArray(linkNode)) {
        return legacyUrl;
    }

    const link = linkNode[0] as LegacyLink;
    return link.chosenLink?.searchResult?.link || '';
};

const useInsertModal = () => {
    const [, setValue] = useState<string>();

    const editor = useEditorRef();

    useEffect(() => {
        const legacyUrl = getLegacyUrl(editor);
        if (legacyUrl !== '') {
            floatingLinkActions.url(legacyUrl);
            setValue(legacyUrl);
        }
    }, []);

    const isValidUrlOrEmpty = () => {
        const { isUrl } = getPluginOptions<LinkPlugin>(editor, ELEMENT_LINK);
        return !!!floatingLinkSelectors.url() || (isUrl && isUrl(floatingLinkSelectors.url()));
    };

    const hasValues = () => floatingLinkSelectors.url() !== '' && floatingLinkSelectors.text() !== '';

    const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent | undefined) => {
        if (!isValidUrlOrEmpty() || !hasValues()) {
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

    return {
        isValidUrlOrEmpty,
        setValue,
        hasValues,
        submit,
    };
};

export const InsertModal = () => {
    const { isValidUrlOrEmpty, setValue, hasValues, submit } = useInsertModal();

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
                    value={floatingLinkSelectors.text()}
                    placeholder="Link Text"
                    onChange={(val) => {
                        setValue(val);
                        floatingLinkActions.text(val);
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
                        value={floatingLinkSelectors.url()}
                        placeholder="https://example.com"
                        onChange={(val) => {
                            setValue(val);
                            floatingLinkActions.url(val);
                        }}
                    />
                </FormControl>
                {!isValidUrlOrEmpty() && <div className="tw-text-red-65 tw-mt-3">Please enter a valid URL.</div>}
            </div>
            <div className="tw-pt-5">
                <Checkbox
                    value="new-tab"
                    label="Open in new tab"
                    state={floatingLinkSelectors.newTab() ? CheckboxState.Checked : CheckboxState.Unchecked}
                    onChange={(val) => {
                        setValue(val as unknown as string);
                        floatingLinkActions.newTab(val);
                    }}
                />
            </div>
            <div className="tw-mt-3">
                <div className={'tw-pt-5 tw-flex tw-gap-x-3 tw-justify-end tw-border-t tw-border-t-black-10'}>
                    <Button
                        onClick={() => {
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
                        disabled={!isValidUrlOrEmpty() || !hasValues()}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};
