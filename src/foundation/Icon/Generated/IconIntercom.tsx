import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconIntercom12 from './IconIntercom12';
import IconIntercom16 from './IconIntercom16';
import IconIntercom20 from './IconIntercom20';
import IconIntercom24 from './IconIntercom24';
import IconIntercom32 from './IconIntercom32';

const IconIntercom = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconIntercom12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconIntercom16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconIntercom20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconIntercom24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconIntercom32 {...props} />}
        </span>
    );
};
IconIntercom.displayName = 'FondueIconIntercom';

export default memo(IconIntercom);
