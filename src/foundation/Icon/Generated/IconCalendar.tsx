import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCalendar12 from './IconCalendar12';
import IconCalendar16 from './IconCalendar16';
import IconCalendar20 from './IconCalendar20';
import IconCalendar24 from './IconCalendar24';
import IconCalendar32 from './IconCalendar32'

function IconCalendar(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCalendar12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconCalendar16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconCalendar20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconCalendar24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconCalendar32 {...props}/>}
        </span>
    );
}

export default memo(IconCalendar);