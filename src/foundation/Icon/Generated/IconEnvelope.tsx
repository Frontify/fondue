import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconEnvelope12 from './IconEnvelope12';
import IconEnvelope16 from './IconEnvelope16';
import IconEnvelope20 from './IconEnvelope20';
import IconEnvelope24 from './IconEnvelope24';
import IconEnvelope32 from './IconEnvelope32';

const IconEnvelope = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconEnvelope12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconEnvelope16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconEnvelope20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconEnvelope24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconEnvelope32 {...props} />}
        </span>
    );
};
IconEnvelope.displayName = 'FondueIconEnvelope';

export default memo(IconEnvelope);
