import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconVimeo12 from './IconVimeo12';
import IconVimeo16 from './IconVimeo16';
import IconVimeo20 from './IconVimeo20';
import IconVimeo24 from './IconVimeo24';
import IconVimeo32 from './IconVimeo32';

const IconVimeo = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconVimeo12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconVimeo16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconVimeo20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconVimeo24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconVimeo32 {...props} />}
        </span>
    );
};
IconVimeo.displayName = 'FondueIconVimeo';

export default memo(IconVimeo);
