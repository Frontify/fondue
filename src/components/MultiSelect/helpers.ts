import { MultiSelectSize } from './MultiSelect';

export const getSizeClasses = (size: MultiSelectSize, hasActiveKeys: boolean) => {
    if (size === MultiSelectSize.Small) {
        if (hasActiveKeys) {
            return 'tw-py-1';
        } else {
            return 'tw-py-2';
        }
    }
    return 'tw-py-[11px]';
};
