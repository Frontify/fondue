import { ButtonStyle } from '@components/Button';
import { Checkbox, CheckboxState } from '@components/Checkbox';
import { Flyout, FlyoutFooter } from '@components/Flyout';
import { FormControl } from '@components/FormControl';
import { TextInput } from '@components/TextInput';
import { IconCheck } from '@foundation/Icon';
import React, { HTMLAttributes, MutableRefObject, ReactNode } from 'react';
import { ChosenLink } from '../types';

type LinkChooserFlyoutProps = {
    isFlyoutOpen: boolean;
    setIsFlyoutOpen: (open: boolean) => void;
    chosenLink: ChosenLink;
    setChosenLink: (chosenLink: ChosenLink) => void;
    trigger:
        | ReactNode
        | ((
              triggerProps: HTMLAttributes<HTMLElement>,
              ref: MutableRefObject<HTMLElement | null>,
              triggerState: { isFocusVisible: boolean; isPressed: boolean },
          ) => JSX.Element);
};

export const LinkChooserFlyout = ({
    isFlyoutOpen,
    setIsFlyoutOpen,
    chosenLink,
    setChosenLink,
    trigger,
}: LinkChooserFlyoutProps) => {
    const onConfirm = () => {
        document.dispatchEvent(new CustomEvent('linkChangeConfirmed', { detail: { chosenLink } }));
        setIsFlyoutOpen(false);
    };

    return (
        <Flyout
            isOpen={isFlyoutOpen}
            onOpenChange={setIsFlyoutOpen}
            onCancel={() => setIsFlyoutOpen(false)}
            onConfirm={onConfirm}
            trigger={trigger}
            legacyFooter={false}
            contentMinHeight={152}
            fixedFooter={
                <FlyoutFooter
                    buttons={[
                        {
                            children: 'Cancel',
                            style: ButtonStyle.Secondary,
                            onClick: () => setIsFlyoutOpen(false),
                        },
                        {
                            children: 'Save',
                            onClick: onConfirm,
                            style: ButtonStyle.Primary,
                            icon: <IconCheck />,
                            disabled: !chosenLink.searchResult,
                        },
                    ]}
                />
            }
        >
            <div
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        onConfirm();
                    }
                }}
                className="tw-flex tw-flex-col tw-gap-y-5 tw-p-7"
                data-test-id={'link-chooser-flyout'}
            >
                {/* Todo: Until we have moved the search logic, a 'simple link chooser' is rendered instead of the real link chooser */}
                <FormControl
                    label={{
                        children: 'URL',
                        htmlFor: 'url',
                        required: true,
                    }}
                >
                    <TextInput
                        required={true}
                        id={'url'}
                        placeholder="https://example.com"
                        value={chosenLink.searchResult?.link}
                        onChange={(value) => {
                            setChosenLink({
                                searchResult: value
                                    ? {
                                          id: value,
                                          title: value,
                                          link: value,
                                          icon: 'LINK',
                                      }
                                    : null,
                                openInNewTab: chosenLink.openInNewTab,
                            });
                        }}
                    />
                </FormControl>
                <Checkbox
                    value="new-tab"
                    label="Open in New Tab"
                    state={chosenLink.openInNewTab ? CheckboxState.Checked : CheckboxState.Unchecked}
                    onChange={() => {
                        setChosenLink({
                            searchResult: chosenLink.searchResult,
                            openInNewTab: !chosenLink.openInNewTab,
                        });
                    }}
                />
            </div>
        </Flyout>
    );
};
