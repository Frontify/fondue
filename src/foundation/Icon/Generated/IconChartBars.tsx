import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconChartBars12 from './IconChartBars12';
import IconChartBars16 from './IconChartBars16';
import IconChartBars20 from './IconChartBars20';
import IconChartBars24 from './IconChartBars24';
import IconChartBars32 from './IconChartBars32';

const IconChartBars = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconChartBars12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconChartBars16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconChartBars20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconChartBars24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconChartBars32 {...props} />}
        </span>
    );
};

const MemoizedIconChartBars = memo(IconChartBars);
MemoizedIconChartBars.displayName = 'FondueIconChartBars';

export default MemoizedIconChartBars;
