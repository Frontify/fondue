import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconChartPie12 from './IconChartPie12';
import IconChartPie16 from './IconChartPie16';
import IconChartPie20 from './IconChartPie20';
import IconChartPie24 from './IconChartPie24';
import IconChartPie32 from './IconChartPie32';

const IconChartPie = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconChartPie12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconChartPie16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconChartPie20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconChartPie24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconChartPie32 {...props} />}
        </span>
    );
};
IconChartPie.displayName = 'FondueIconChartPie';

export default memo(IconChartPie);
