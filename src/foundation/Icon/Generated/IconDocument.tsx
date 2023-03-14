import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDocument12 from './IconDocument12';
import IconDocument16 from './IconDocument16';
import IconDocument20 from './IconDocument20';
import IconDocument24 from './IconDocument24';
import IconDocument32 from './IconDocument32';

const IconDocument = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDocument12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDocument16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDocument20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDocument24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDocument32 {...props} />}
        </span>
    );
};
IconDocument.displayName = 'FondueIconDocument';

export default memo(IconDocument);
