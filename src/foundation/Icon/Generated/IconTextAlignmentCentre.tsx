import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextAlignmentCentre12 from './IconTextAlignmentCentre12';
import IconTextAlignmentCentre16 from './IconTextAlignmentCentre16';
import IconTextAlignmentCentre20 from './IconTextAlignmentCentre20';
import IconTextAlignmentCentre24 from './IconTextAlignmentCentre24';
import IconTextAlignmentCentre32 from './IconTextAlignmentCentre32'

function IconTextAlignmentCentre(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextAlignmentCentre12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconTextAlignmentCentre16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconTextAlignmentCentre20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconTextAlignmentCentre24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconTextAlignmentCentre32 {...props}/>}
        </span>
    );
}

export default memo(IconTextAlignmentCentre);