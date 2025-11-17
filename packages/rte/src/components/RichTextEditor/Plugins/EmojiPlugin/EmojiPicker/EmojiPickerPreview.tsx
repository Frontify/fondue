/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type UseEmojiPickerType } from '@udecode/plate-emoji';

export type EmojiPickerPreviewProps = Pick<UseEmojiPickerType, 'emoji' | 'hasFound' | 'isSearching' | 'i18n'>;

export type EmojiPreviewProps = Pick<UseEmojiPickerType, 'emoji'>;

export type NoEmojiPreviewProps = Pick<UseEmojiPickerType, 'i18n'>;
export type PickAnEmojiPreviewProps = NoEmojiPreviewProps;

function EmojiPreview({ emoji }: EmojiPreviewProps) {
    return (
        <div className="tw-flex tw-items-center tw-border-t tw-border-t-[rgb(243,244,246)] tw-p-2">
            <div className="tw-flex tw-items-center tw-justify-center tw-text-3xl">{emoji?.skins[0].native}</div>
            <div className="tw-overflow-hidden tw-pl-2">
                <div className="tw-truncate tw-text-sm tw-text-[rgb(75,85,99)]">{emoji?.name}</div>
                <div className="tw-truncate tw-text-xs tw-text-[rgb(156,163,175)]">{`:${emoji?.id}:`}</div>
            </div>
        </div>
    );
}

function NoEmoji({ i18n }: NoEmojiPreviewProps) {
    return (
        <div className="tw-flex tw-items-center tw-border-t tw-border-t-[rgb(243,244,246)] tw-p-2">
            <div className="tw-flex tw-items-center tw-justify-center tw-text-3xl">😢</div>
            <div className="tw-overflow-hidden tw-pl-2">
                <div className="tw-truncate tw-text-sm tw-text-[rgb(75,85,99)]">{i18n.searchNoResultsTitle}</div>
                <div className="tw-truncate tw-text-xs tw-text-[rgb(156,163,175)]">{i18n.searchNoResultsSubtitle}</div>
            </div>
        </div>
    );
}

function PickAnEmoji({ i18n }: PickAnEmojiPreviewProps) {
    return (
        <div className="tw-flex tw-items-center tw-border-t tw-border-t-[rgb(243,244,246)] tw-p-2">
            <div className="tw-flex tw-items-center tw-justify-center tw-text-3xl">☝️</div>
            <div className="tw-overflow-hidden tw-pl-2">
                <div className="tw-truncate tw-text-lg tw-text-[rgb(156,163,175)]">{i18n.pick}</div>
            </div>
        </div>
    );
}

export function EmojiPickerPreview({
    emoji,
    hasFound = true,
    isSearching = false,
    i18n,
    ...props
}: EmojiPickerPreviewProps) {
    const showPickEmoji = !emoji && !(isSearching && !hasFound);
    const showNoEmoji = isSearching && !hasFound;
    const showPreview = emoji;

    return (
        <>
            {showPreview && <EmojiPreview emoji={emoji} {...props} />}
            {showPickEmoji && <PickAnEmoji i18n={i18n} {...props} />}
            {showNoEmoji && <NoEmoji i18n={i18n} {...props} />}
        </>
    );
}
