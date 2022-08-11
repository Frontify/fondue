import { merge } from '@utilities/merge';
import { MultiSelectSize } from './MultiSelect';

export const getPaddingClasses = (size: MultiSelectSize, hasActiveKeys: boolean) =>
    merge([
        'tw-pr-9',
        size === MultiSelectSize.Small
            ? `tw-pl-3 ${hasActiveKeys ? 'tw-py-1' : 'tw-py-2'}`
            : 'tw-pl-[19px] tw-py-[11px]',
    ]);
