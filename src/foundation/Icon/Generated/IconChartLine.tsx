import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconChartLine12 from './IconChartLine12';
import IconChartLine16 from './IconChartLine16';
import IconChartLine20 from './IconChartLine20';
import IconChartLine24 from './IconChartLine24';
import IconChartLine32 from './IconChartLine32'

function IconChartLine(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconChartLine12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconChartLine16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconChartLine20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconChartLine24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconChartLine32 {...props}/>}
        </span>
    );
}

export default memo(IconChartLine);