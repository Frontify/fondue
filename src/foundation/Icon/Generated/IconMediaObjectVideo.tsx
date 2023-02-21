import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMediaObjectVideo12 from './IconMediaObjectVideo12';
import IconMediaObjectVideo16 from './IconMediaObjectVideo16';
import IconMediaObjectVideo20 from './IconMediaObjectVideo20';
import IconMediaObjectVideo24 from './IconMediaObjectVideo24';
import IconMediaObjectVideo32 from './IconMediaObjectVideo32';

const IconMediaObjectVideo = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMediaObjectVideo12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMediaObjectVideo16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMediaObjectVideo20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMediaObjectVideo24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectVideo32 {...props} />}
        </span>
    );
};

const MemoizedIconMediaObjectVideo = memo(IconMediaObjectVideo);
MemoizedIconMediaObjectVideo.displayName = 'FondueIconMediaObjectVideo';

export default MemoizedIconMediaObjectVideo;
