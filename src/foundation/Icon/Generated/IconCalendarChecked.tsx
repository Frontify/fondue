import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCalendarChecked12 from './IconCalendarChecked12';
import IconCalendarChecked16 from './IconCalendarChecked16';
import IconCalendarChecked20 from './IconCalendarChecked20';
import IconCalendarChecked24 from './IconCalendarChecked24';
import IconCalendarChecked32 from './IconCalendarChecked32';

const IconCalendarChecked = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCalendarChecked12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCalendarChecked16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCalendarChecked20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCalendarChecked24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCalendarChecked32 {...props} />}
        </span>
    );
};

const MemoizedIconCalendarChecked = memo(IconCalendarChecked);
MemoizedIconCalendarChecked.displayName = 'FondueIconCalendarChecked';

export default MemoizedIconCalendarChecked;
