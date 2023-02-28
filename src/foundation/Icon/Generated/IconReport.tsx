import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconReport12 from './IconReport12';
import IconReport16 from './IconReport16';
import IconReport20 from './IconReport20';
import IconReport24 from './IconReport24';
import IconReport32 from './IconReport32';

const IconReport = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconReport12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconReport16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconReport20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconReport24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconReport32 {...props} />}
        </span>
    );
};
IconReport.displayName = 'FondueIconReport';

export default memo(IconReport);
