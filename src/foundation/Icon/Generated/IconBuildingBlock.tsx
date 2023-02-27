import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconBuildingBlock12 from './IconBuildingBlock12';
import IconBuildingBlock16 from './IconBuildingBlock16';
import IconBuildingBlock20 from './IconBuildingBlock20';
import IconBuildingBlock24 from './IconBuildingBlock24';
import IconBuildingBlock32 from './IconBuildingBlock32';

const IconBuildingBlock = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconBuildingBlock12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconBuildingBlock16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconBuildingBlock20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconBuildingBlock24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconBuildingBlock32 {...props} />}
        </span>
    );
};
IconBuildingBlock.displayName = 'FondueIconBuildingBlock';

export default memo(IconBuildingBlock);
